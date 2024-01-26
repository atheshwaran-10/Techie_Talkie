"use client";

import * as React from "react";
import placeholder from "@/public/images/placeholder.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { useRouter } from "next/navigation";
import {signOut,signIn} from "next-auth/react"
import {User} from "@prisma/client"
import {toast} from "react-hot-toast"
import Image from "next/image"

 const socialAction = (action: string) => {
  signIn(action, { redirect: false })
    .then((callback) => {
      if (callback?.error) {
        toast.error("Invalid credentials!");
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Login Successfull");
      }
    })
 }; 


const Options= ({user}:{user:User}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`hover:bg-transparent border-0`}>
          <span className="sr-only">Open user menu</span>
          {user?.image ? (
            <Image
              className="rounded-full"
              height={40}
              width={40}
              src={user.image}
              alt=""
            />
          ) : (
            <Image
              className=" rounded-full"
              height={40}
              width={40}
              src={placeholder}
              alt=""
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35">
        <div
          onClick={user?.image ? () => signOut() : () => socialAction("google")}
          className="cursor-pointer p-1 hover:text-gray-400"
        >
          {user?.image ? <>Signout</> : <>Signin</>}
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
