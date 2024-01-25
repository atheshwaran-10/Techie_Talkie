"use client";
import { useMediaStream } from "@/hooks/index";
import { CrossLineDiv } from "@/common/components";
import useCurrentUser from "@/hooks/useCurrentUser";
import PeerVideo from "@/components/peer";
import VideoContainer from "@/components/video-container";
import { User } from "@prisma/client";
import { MicIcon, Video,MicOff,VideoOff } from "lucide-react";
export default function Lobby({
  stream,
  onJoinRoom,
}: {
  stream: MediaStream;
  onJoinRoom: () => void;
}) {
  const { data }: { data?: { currentUser?: User } } = useCurrentUser();
  const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);

  return (
    <div className="grid h-screen w-auto place-content-center place-items-center gap-4">
      <div className="flex flex-col gap-2">
        <VideoContainer
          id="me"
          muted={muted}
          visible={visible}
          stream={stream}
          userPicture={data?.currentUser?.image!}
        >
          <PeerVideo key="me" stream={stream} name={"You"} isMe={true} />
        </VideoContainer>

        <div className="flex justify-center gap-2">
          <button
            onClick={toggleVideo}
            data-for="visibility"
            data-tip={`${!visible ? "switch on" : "switch off"}`}
            className="relative rounded-xl bg-sky-400 p-3 text-white hover:bg-sky-500"
          >
            {visible ? <Video /> : <VideoOff/>}
          </button>

          <button
            onClick={() => toggle("audio")(stream)}
            data-for="audio"
            data-tip={`${muted ? "unmute" : "mute"}`}
            className="relative rounded-xl bg-sky-400 p-3 text-white hover:bg-sky-500"
          >
            {muted ? <MicOff /> : <MicIcon />}
          </button>
          <button
            onClick={onJoinRoom}
            type="button"
            className="w-1/3 rounded-lg bg-sky-400 p-2 text-sm font-medium text-white hover:bg-sky-500"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
