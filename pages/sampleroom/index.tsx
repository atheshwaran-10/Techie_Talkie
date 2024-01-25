"use client";
import { createContext, useState } from "react";
import ChannelBox from "@/app/_components/ChannelBox";
import { Lobby } from "@/components/index";
import { useMediaStream } from "@/hooks/index";
import { NextPage, GetServerSidePropsContext, PreviewData } from "next";
import "@/styles/globals.css";
import { LoaderError } from "@/common/components";
import { FAILURE_MSG, LOADER_STREAM_MSG } from "@/common/constants";
import { io } from "socket.io-client";
export const sc = io("/", { path: "/api/socketio" });
export const RTCcontext = createContext(sc);

const Page = () => {
  const [isLobby, setIsLobby] = useState(true);
  const { stream, isLoading } = useMediaStream();

  if (isLoading) return <LoaderError msg={LOADER_STREAM_MSG} />;
  const socket = io("/", { path: "/api/socketio" });
  const SocketContext = createContext(socket);

  return (
    <SocketContext.Provider value={socket}>
      <ChannelBox stream={stream!} roomId="3435" />
    </SocketContext.Provider>
  );
};

export default Page;
