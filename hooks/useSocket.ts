"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let isInitialized = false;

function initializeSocket() {
  if (!isInitialized && typeof window !== "undefined") {
    console.log("Inicializando socket globalmente...");
    socket = io(window.location.origin, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Socket conectado:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket desconectado");
    });

    socket.on("connect_error", (error) => {
      console.error("Error de conexión:", error);
    });

    isInitialized = true;
  }
  return socket;
}

export function useSocket() {
  const [isConnected, setIsConnected] = useState(() => {
    const socketInstance = initializeSocket();
    return socketInstance?.connected || false;
  });

  useEffect(() => {
    const socketInstance = initializeSocket();

    if (socketInstance) {
      const handleConnect = () => {
        console.log("Socket conectado en useSocket:", socketInstance.id);
        setIsConnected(true);
      };

      const handleDisconnect = () => {
        console.log("Socket desconectado en useSocket");
        setIsConnected(false);
      };

      socketInstance.on("connect", handleConnect);
      socketInstance.on("disconnect", handleDisconnect);

      return () => {
        socketInstance.off("connect", handleConnect);
        socketInstance.off("disconnect", handleDisconnect);
      };
    }
  }, []);

  return { socket, isConnected };
}
