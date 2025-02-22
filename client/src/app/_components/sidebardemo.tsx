"use client";
import React, { useEffect, useState } from "react";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import { PlaceholdersAndVanishInputDemo } from "./placeholderdemo";
import { BackgroundBeamsDemo } from "./background-beamsdemo";
import { useUser, UserButton } from "@clerk/nextjs";
import { useStateContext } from "@/contexts/ContextProvider";
import History from "./history";
import axios from "axios";
import Image from "next/image";
import WalletButton from "./wallet-button";
import { Feather } from "lucide-react";
export function SidebarDemo() {
  const { user } = useUser();
  const {load, history, setHistory} =  useStateContext();

  const fetchHistory = async () => {
    const payLoad = {userid: user?.id}
    try {
      const current = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/initial`, {headers:payLoad});
      setHistory(current.data.allChats)
    } catch (error) {
      console.log(error)
    }
  }

  const coldStart = async() => {
    try{
      console.log("cold start")
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/init`);
    }catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    coldStart();
  },[])

  useEffect(() => {
    if(user){
      fetchHistory();
    }else{
      setHistory([]);
    }
  },[user, load]);

  const links = [
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Login",
      href: "/sign-in",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const filteredLinks = user
    ? links.filter((link) => link.label !== "Login")
    : links;

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-dvh" // for your use case, use h-screen instead of h-[60vh]
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-4">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              <History />
              
            </div>
          </div>
          {filteredLinks.map((link, idx) => (
            <SidebarLink key={idx} link={link} />
          ))}
          <div className=" bg-neutral-700 rounded-md px-6 py-4 w-fit font-semibold"><WalletButton/></div>
          <div className="flex items-center">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-[37px] w-[37px]",
                },
              }}
            />
            <span className="ml-3">
              {user?.firstName} {user?.lastName} 
            </span>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className=""><Feather size={30} color="white" className="font-bold"/></div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-extrabold text-black dark:text-white whitespace-pre text-3xl"
      >
        Yaml Gen
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1 h-dvh">
      <BackgroundBeamsDemo />
    </div>
  );
};
