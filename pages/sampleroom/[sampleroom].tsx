import { createContext, useState } from "react";
import ChannelBox from "@/components/ChannelBox"
import Lobby from "@/components/lobby"
import { useMediaStream } from "@/hooks/index";
import {ClipLoader} from "react-spinners"

const Page = () => {
  const [isLobby, setIsLobby] = useState(true);
  const { stream, isLoading } = useMediaStream();

  if (isLoading) return(
    <div className="flex items-center justify-center h-screen w-full">
      <ClipLoader size={50} />
    </div>
  ) 
  if (!stream) return <div >Stream Not Found</div>;

  if (isLobby)
  {
    return <Lobby stream={stream} onJoinRoom={() => setIsLobby(false)} />;
  }

  return <ChannelBox stream={stream} roomId="345"/>;
};

export default Page;
