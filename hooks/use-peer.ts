import { useContext, useEffect, useState } from 'react';
import { useMediaStream } from '@/hooks/index';
import {useSocket} from '@/contexts/RTCcontext';
import { useRouter } from 'next/navigation';
import Peer from 'peerjs';
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import placeholder from "@/public/images/placeholder.png"
import { Nullable, PeerId, RoomId } from '@/common/types';
import { error } from '@/common/utils';
import useCurrentUser from "@/hooks/useCurrentUser"
import {User} from "@prisma/client"
/**
 * Creates a peer and joins them into the room
 * @returns peer object, its id and meta-state whether is peer fully created
 */
const usePeer = (stream: MediaStream, roomId: string) => {
  const { socket, isConnected } = useSocket();
  console.log("calling signalling server");
  const room = roomId;
  const { data }: { data?: { currentUser?: User } } = useCurrentUser();
  console.log("Peer data:" + data?.currentUser?.name);

  const { muted, visible } = useMediaStream(stream);

  const [isLoading, setIsLoading] = useState(true);
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [myId, setMyId] = useState<PeerId>("");

  useEffect(() => {
    if (!isConnected) {
      console.log("Socket not connected yet. Waiting for connection...");
      return;
    }

    (async function createPeerAndJoinRoom() {
      try {
        const peer = new (await import("peerjs")).default();
        setPeer(peer);
        setIsLoading(false);

        peer.on("open", (id) => {
          console.log("Peer data2:" + data?.currentUser?.name);
          console.log("your device id: ", id);
          setMyId(id);
          socket?.emit("room:join", {
            room,
            user: {
              id,
              muted,
              visible,
              name: data?.currentUser?.name,
              picture: data?.currentUser?.image || placeholder,
            },
          });
        });

        peer.on("error", error("error on peer"));
      } catch (e) {
        console.log("error: cannot create peer");
        error("Unable to create peer")(e);
      }
    })();
  }, [socket, isConnected]);

  return {
    peer,
    myId,
    isPeerReady: !isLoading,
  };
};

export default usePeer;

