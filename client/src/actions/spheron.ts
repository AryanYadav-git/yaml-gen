'use server'
import { SpheronSDK } from "@spheron/protocol-sdk";

// Ensure the private key is available
const privateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
if (!privateKey) {
  throw new Error("Private key is not set in environment variables.");
}

// Initialize Spheron SDK
let sdk: SpheronSDK;

export const init = async () => {
  try {
    sdk = new SpheronSDK("testnet", privateKey);
    console.log("Spheron SDK initialized:", sdk);
  } catch (error) {
    console.error("Failed to initialize Spheron SDK:", error);
    throw error;
  }
};

export const main = async () => {
  try {
    await init();
    
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
  } catch (error) {
    console.error("Error:", error);
  }
};
