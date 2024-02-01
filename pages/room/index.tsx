"use client";
import ChannelBox from "@/components/ChannelBox";
import { useMediaStream } from "@/hooks/index";
import "@/styles/globals.css";
import { LoaderError } from "@/common/components";

const Page = () => {
  const { stream, isLoading } = useMediaStream();

  if (isLoading) return <LoaderError msg="Waiting to establish connection" />;

  return (
      <ChannelBox stream={stream!} roomId="3435" />
  );
};

export default Page;
