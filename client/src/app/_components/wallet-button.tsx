import { main } from "@/actions/spheron";
import { useEffect, useState } from "react";

// Extend Window type to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletButton = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, []);

  useEffect(() => {
    (async () => {
      // await main();
    })();
  }, []);
  
  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log("Connected:", accounts[0]);
        console.log(accounts)
        // init(accounts);
      } catch (err: any) {
        console.error("Connection Error:", err.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log("Wallet connected:", accounts[0]);
          console.log(accounts)
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err: any) {
        console.error("Error fetching accounts:", err.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = () => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log("Account changed:", accounts[0]);
        } else {
          setWalletAddress("");
          console.log("Disconnected");
        }
      });
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress
          ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default WalletButton;
