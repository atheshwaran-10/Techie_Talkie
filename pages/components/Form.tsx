"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom"
import { createRoomId, createHost } from "@/common/utils";

const Form = () => {
   const router = useRouter();
   const [roomId, setRoomId] = useState("");

   function createRoom() {
     const roomId = createRoomId();
     createHost(roomId);
     router.push(`/sampleroom/${roomId}`);
   }

   function joinRoom() {
     router.push(`/sampleroom/${roomId}`);
   }
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Tabs
        defaultValue="join"
        className="border-lg w-[600px] h-[450px] rounded-lg border border-solid p-5 shadow-lg"
      >
        <TabsList className="w-full justify-around">
          <TabsTrigger className="w-full" value="create">
            Create Room
          </TabsTrigger>
          <TabsTrigger className="w-full" value="join">
            Join Room
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <CreateRoom />
        </TabsContent>
        <TabsContent value="join">
          <JoinRoom />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Form