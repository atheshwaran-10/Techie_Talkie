"use client"
import { io } from "socket.io-client";
import { createContext } from "react";
export const sc = io("/", { path: "/api/socketio" });
export const RTCcontext = createContext(sc);
interface RTCContextProps {
  children: React.ReactNode;
}

export default function RTCContextProvider({ children }: RTCContextProps) {
  return <RTCcontext.Provider value={sc}>{children}</RTCcontext.Provider>;
}
