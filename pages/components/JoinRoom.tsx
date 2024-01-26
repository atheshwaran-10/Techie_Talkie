import React from "react";
import Image from "next/image";
import image from "@/public/images/iamge3.png";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const joinRoom = () => {
    router.push(`room/${roomId}`);
  };

  return (
    <div>
      <div className="flex justify-center w-[360px]">
        <Image height={250} width={250} src={image} alt="" />
      </div>
      <div className="">
        <div className="flex flex-col gap-y-5">
          <Input
            className="w-[300px] ml-auto mr-auto"
            placeholder="Enter the Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button onClick={joinRoom} className="w-1/3 ml-auto mr-auto bg-sky-400 hover:bg-sky-500" disabled={roomId.length === 0}>Join Room</Button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
