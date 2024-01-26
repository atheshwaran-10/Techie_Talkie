"use client"
import React from 'react'
import Image from "next/image"
import {useEffect} from "react"
import {useRouter} from "next/navigation"
import { Snippet } from "@nextui-org/react";
import image from "@/public/images/iamge4.png";
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CreateRoom = () => {
  const [roomId,setRoomId]=useState('');
  const router=useRouter();

 
  
 useEffect(() => {
   setRoomId(uuidv4());
 }, [setRoomId]);
 

  const createRoom=()=>{
    router.push(`room/${roomId}`);
  }

  return (
    <div>
      <div className="flex justify-center">
        <Image height={250} width={250} src={image} alt="" />
      </div>
      <div className="">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-row gap-x-5">
            {roomId.length > 0 ? (
              <Snippet>{roomId}</Snippet>
            ) : (
              <div>Room cannot be created</div>
            )}
          </div>

          <Button
            className="ml-auto mr-auto w-1/3 bg-sky-400 hover:bg-sky-500"
            disabled={roomId.length === 0}
            onClick={createRoom}
          >
            Create Room
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom