"use client"
import { useContext, useEffect, useState } from "react";
import ControlPanel from "@/components/control-panel"
import Chat from "@/components/chat"
import Status from "@/components/status"
import { Streams, SharedScreenStream } from "@/components/streams";
import { usePeer, useScreen } from "@/hooks/index";
import useMediaStream from "@/hooks/use-media-stream";
import {SocketIndicator}  from "../pages/components/SocketIndicator"

import {useSocket} from "@/contexts/RTCcontext"
import { UsersSettingsProvider, UsersConnectionProvider } from "@/contexts";
import {ClipLoader} from "react-spinners"
import { useRouter } from "next/navigation";
import { MediaConnection } from "peerjs";
import { toast, ToastContainer } from "react-toastify";

import { LoaderError, Modal } from "@/common/components/index";
import { Kind, PeerId } from "@/common/types";

export default function ChannelBox({ stream,roomId }: { stream: MediaStream,roomId:string }) {
  const router = useRouter();
  const { socket } = useSocket();

  const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);
  const { peer, myId, isPeerReady } = usePeer(stream,roomId);
  const { startShare, stopShare, screenTrack } = useScreen(stream);

  const [modal, setModal] = useState<"hidden" | "chat" | "status" | "close">(
    "hidden",
  );
  const [fullscreen, setFullscreen] = useState(false);
 

  function replaceTrack(track: MediaStreamTrack) {
    return (peer: MediaConnection) => {
      const sender = peer.peerConnection
        ?.getSenders()
        .find((s) => s.track?.kind === track.kind);
      sender?.replaceTrack(track);
    };
  }

  useEffect(() => {
    if(!socket)
      return;
    return () => {
      socket.disconnect();
    };
  }, []);


  if (!isPeerReady) return <ClipLoader color="red"/>;
  if (!peer) return <div>404 Not Found</div> ;

  async function toggleKind(kind: Kind, users?: MediaConnection[]) {
    switch (kind) {
      case "audio": {
        toggle("audio")(stream);
        socket.emit("user:toggle-audio", myId);
        return;
      }
      case "video": {
        toggleVideo((newVideoTrack: MediaStreamTrack) =>
          users!.forEach(replaceTrack(newVideoTrack)),
        );
        socket.emit("user:toggle-video", myId);
        return;
      }
      case "screen": {
        if (screenTrack) {
          stopShare(screenTrack);
          socket.emit("user:stop-share-screen");
          setFullscreen(false);
          toast("Stopped presenting screen");
        } else {
          await startShare(
            () => {
              socket.emit("user:share-screen");
              toast("Starting presenting screen");
            },
            () => socket.emit("user:stop-share-screen"),
          );
        }
        return;
      }
      case "fullscreen": {
        setFullscreen(!fullscreen);
        return;
      }
      case "chat": {
        modal == "chat" ? setModal("close") : setModal("chat");
        return;
      }
      case "users": {
        modal == "status" ? setModal("close") : setModal("status");
        return;
      }
      default:
        break;
    }
  }

  return (
    <div className="flex w-full">
      <div className="h-12 w-44 mb-auto">
        <SocketIndicator />
      </div>

      <UsersSettingsProvider>
        <div className="hidden h-screen w-full flex-col p-4 sm:flex">
          <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
            <div className="flex h-full place-content-center place-items-center gap-4">
              <SharedScreenStream
                sharedScreen={screenTrack}
                fullscreen={fullscreen}
              />
              <Streams
                stream={stream}
                muted={muted}
                visible={visible}
                sharedScreen={screenTrack}
                fullscreen={fullscreen}
              />
            </div>

            <div className="flex items-center">
              <ControlPanel
                visible={visible}
                muted={muted}
                screenTrack={Boolean(screenTrack)}
                chat={modal == "chat"}
                onToggle={toggleKind}
                onLeave={() => router.push("/")}
              />
            </div>
          </UsersConnectionProvider>
        </div>
        <div className="">
          <Modal
            title={
              modal === "chat"
                ? "Messenger"
                : modal === "status"
                  ? "Participants"
                  : ""
            }
            modal={modal}
            onClose={() => setModal("close")}
          >
            <div className={modal !== "chat" ? "hidden" : ""}>
              <Chat />
            </div>
            <div className={modal !== "status" ? "hidden" : ""}>
              <Status muted={muted} visible={visible} />
            </div>
          </Modal>
        </div>
      </UsersSettingsProvider>
      <ToastContainer position="bottom-left" theme="dark" autoClose={3000} />
    </div>
  );
}
