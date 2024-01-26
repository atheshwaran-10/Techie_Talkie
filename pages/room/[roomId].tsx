import { createContext, useState } from "react";
import ChannelBox from "@/components/ChannelBox"
import Lobby from "@/components/lobby"
import { useMediaStream } from "@/hooks/index";
import {ClipLoader} from "react-spinners"
import {useRouter} from "next/router"
const Page = () => {
  const [isLobby, setIsLobby] = useState(true);
  const { stream, isLoading } = useMediaStream();
  const router=useRouter();
  const {roomId}=router.query;

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <ClipLoader size={50} />
      </div>
    );
  if (!stream) return <div>Stream Not Found</div>;

  if (isLobby) {
    return <Lobby stream={stream} onJoinRoom={() => setIsLobby(false)} />;
  }

  return <ChannelBox stream={stream} roomId={"123"} />;
};

export default Page;
