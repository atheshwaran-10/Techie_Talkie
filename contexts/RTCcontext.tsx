"use client"

// RTCcontext.tsx

import { createContext, useEffect, useState,useContext } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

export const RTCcontext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});
export const useSocket = () => {
  return useContext(RTCcontext);
 };

export const RTCContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socketio",
        addTrailingSlash: false,
      },
    );

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);

    setSocket(socketInstance);

    return () => {
      // Clean up: disconnect and remove event listeners when the component unmounts
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
      socketInstance.disconnect();
    };
  }, []); // Run this effect only once

  return (
    <RTCcontext.Provider value={{ socket, isConnected }}>
      {children}
    </RTCcontext.Provider>
  );
};


// import { io } from "socket.io-client";
// import { createContext,useEffect,useState,useContext } from "react";

// export const sc = io("/", { path: "/api/socketio" });
// export const RTCcontext = createContext(sc);

// type SocketContextType = {
//   socket: any | null;
//   isConnected: boolean;
// };

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false,
// });

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const RTCContextProvider=({ 
//   children 
// }: { 
//   children: React.ReactNode 
// }) =>{
//    const [socket, setSocket] = useState(null);
//    const [isConnected, setIsConnected] = useState(false);

//    useEffect(() => {
//      const socketInstance = new (io as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
//        path: "/api/socketio",
//        addTrailingSlash: false,
//      });

//      socketInstance.on("connect", () => {
//        setIsConnected(true);
//      });

//      socketInstance.on("disconnect", () => {
//        setIsConnected(false);
//      });

//      setSocket(socketInstance);

//      return () => {
//        socketInstance.disconnect();
//      };
//    }, []);
   
//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// }


/**
 * "use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

export const RTCcontext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(RTCcontext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      },
    );

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <RTCcontext.Provider value={{ socket, isConnected }}>
      {children}
    </RTCcontext.Provider>
  );
};

 */