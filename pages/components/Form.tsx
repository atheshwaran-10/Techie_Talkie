"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
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
     router.push(`/room/${roomId}`);
   }

   function joinRoom() {
     router.push(`/room/${roomId}`);
   }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Tabs aria-label="Options">
        <Tab key="music" title="Create Room">
          <Card>
            <CardBody>
              <CreateRoom />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Join Room">
          <Card>
            <CardBody>
              <JoinRoom />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Form