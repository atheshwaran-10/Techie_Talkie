import { Server as NetServer, Socket } from "net";
import { Server as HTTPServer } from "http";
import { NextApiResponse } from "next/types";
import { Server as SocketIOServer } from "socket.io";
//@ts-ignore
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket as ClientSocket } from "socket.io-client";


export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type TSocket = ClientSocket<DefaultEventsMap, DefaultEventsMap>;

export type KeyValue<T> = Record<string, T>;
export type Nullable<T> = T | null;

export type RoomId = string;

export type AppendVideoStream = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => (stream: MediaStream) => void;

export type PeerId = string;

export type UserMessage = {
  user: string;
  text: string;
  time: string;
  shouldAggregate: boolean;
};

export type Status = "loading" | "idle" | "rejected" | "success";
export type Kind =
  | "audio"
  | "video"
  | "chat"
  | "users"
  | "screen"
  | "fullscreen";
