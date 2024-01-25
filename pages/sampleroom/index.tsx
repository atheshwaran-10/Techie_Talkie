"use client";
import { createContext, useState } from "react";
import ChannelBox from "@/components/ChannelBox";
import { Lobby } from "@/components/index";
import { useMediaStream } from "@/hooks/index";
import { NextPage, GetServerSidePropsContext, PreviewData } from "next";
import "@/styles/globals.css";
import { LoaderError } from "@/common/components";
import { FAILURE_MSG, LOADER_STREAM_MSG } from "@/common/constants";
import { RTCContextProvider } from "@/contexts/RTCcontext";

const Page = () => {
  const [isLobby, setIsLobby] = useState(true);
  const { stream, isLoading } = useMediaStream();

  if (isLoading) return <LoaderError msg={LOADER_STREAM_MSG} />;

  

  return (
    <RTCContextProvider>
      <ChannelBox stream={stream!} roomId="3435" />
    </RTCContextProvider>
  );
};

export default Page;
