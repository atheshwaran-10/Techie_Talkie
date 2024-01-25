"use client"
import React from 'react'
import Image from "next/image"
import {useRouter} from "next/navigation"
import image from "@/public/images/iamge4.png";
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CreateRoom = () => {
  const [roomId,setRoomId]=useState('');
  const router=useRouter();

  const generateId=()=>{
    setRoomId(uuidv4());
  }

  const createRoom=()=>{
    router.push(`sampleroom/${roomId}`);
  }

  return (
    <div>
      <div className="flex justify-center">
        <Image height={250} width={250} src={image} alt="" />
      </div>
      <div className="">
        <div className="flex flex-col gap-y-5">
          <div className='flex flex-row gap-x-5'>
            <Button
              className="ml-auto mr-auto w-1/3 bg-sky-400 hover:bg-sky-500"
              onClick={generateId}
            >
              Generate RoomId
            </Button>
            {roomId.length > 0 ? <div>{roomId}</div> : <div>Generate Your Own RoomId</div>}
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