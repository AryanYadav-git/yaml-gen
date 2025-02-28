import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { main } from "@/actions/spheron";

interface Details {
  balance : {};
  walletAddress: string;
}

const WalletConnect = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [walletDetails, setWalletDetails] = useState<Details>();
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };

  const handleSubmit = async () => {
    const wallet = await main(privateKey);
    setPrivateKey("");
    wallet && setWalletDetails(wallet);
    setOpenDialog(false);
  };

  if (walletDetails) {
    const { unlockedBalance, token }: any = walletDetails.balance;
    const formattedBalance = (parseInt(unlockedBalance) / 10 ** token.decimal).toFixed(token.decimal);
  
    return (
      <>
        <p className="p-2 bg-neutral-700 rounded-md">
          Wallet Address :
          <span className="text-pink-300"> {walletDetails.walletAddress} </span>
        </p>
        <p className="p-2 bg-neutral-700 rounded-md">
          Wallet Balance :
          <span className="text-pink-300"> {formattedBalance} {token.symbol} </span>
        </p>
      </>
    );
  }
  

  return (
    <>
      <Button
        variant="outline"
        className="w-fit"
        onClick={() => setOpenDialog(!openDialog)}
      >
        Connect Wallet
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] z-[1000] bg-neutral-950 border-0">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Connect the wallet using Spheron's private key
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Spheron Private Key
              </Label>
              <Input
                id="private-key"
                placeholder="0x*************************"
                className="col-span-3"
                onChange={(e) => handleKeyChange(e)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;
