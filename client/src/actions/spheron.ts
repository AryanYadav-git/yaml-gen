'use server'
import { SpheronSDK } from "@spheron/protocol-sdk";

let sdk: SpheronSDK;
const PROVIDER_PROXY_URL = "http://localhost:3040"

export const init = async (privateKey: string) => {
  try {
    sdk = new SpheronSDK("testnet", privateKey);
    console.log("Spheron SDK initialized:", sdk);
  } catch (error) {
    console.error("Failed to initialize Spheron SDK:", error);
    throw error;
  }
};

export const main = async (privateKey: string) => {
  try {
    await init(privateKey);
    
    // Ensure sdk is initialized before calling methods
    if (!sdk) {
      throw new Error("Spheron SDK is not initialized.");
    }

    const walletAddress = sdk.leases?.wallet?.address;
    if (!walletAddress) {
      throw new Error("Wallet address not found in Spheron SDK.");
    }

    const balance = await sdk.escrow.getUserBalance("CST", walletAddress);
    console.log("User's balance: ", balance);
    return {balance, walletAddress};
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deploy = async (iclYaml: string) => {
  let deploymentTxn: any;
  try {
    console.log("Deploying start in fn", iclYaml);
    deploymentTxn = await sdk.deployment.createDeployment(iclYaml, PROVIDER_PROXY_URL);
    console.log("Deployment created:", deploymentTxn);
  } catch (error) {
    console.error("Deployment creation failed:", error);
  }
        // Fetch deployment logs
        if (deploymentTxn.leaseId) {
            console.log("Fetching deployment details...");
            const deploymentDetails = await sdk.deployment.getDeployment(deploymentTxn.leaseId, PROVIDER_PROXY_URL);
            console.log("Deployment details:", deploymentDetails, deploymentDetails.forwarded_ports);

            console.log("Fetching lease details...");
            const leaseDetails = await sdk.leases.getLeaseDetails(deploymentTxn.leaseId);
            console.log("Lease details:", leaseDetails);

            console.log("Sleeping for 10 seconds...");
            await new Promise(resolve => setTimeout(resolve, 10000));

            console.log("Closing deployment...");
            const closeDeploymentDetails = await sdk.deployment.closeDeployment(deploymentTxn.leaseId);
            console.log("Deployment closed:", closeDeploymentDetails);
        }
}
