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
      timeout: 10000, // Timeout de conexión
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
    // Retornar el estado de conexión actual del socket
    return socketInstance?.connected || false;
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const socketInstance = initializeSocket();

    if (socketInstance) {
      const handleConnect = () => {
        console.log("Socket conectado en useSocket:", socketInstance.id);
        setIsConnected(true);
        // Pequeño delay para asegurar que el socket está completamente listo
        setTimeout(() => {
          setIsReady(true);
        }, 100);
      };

      const handleDisconnect = () => {
        console.log("Socket desconectado en useSocket");
        setIsConnected(false);
        setIsReady(false);
      };

      // Si el socket ya está conectado cuando se monta el componente
      if (socketInstance.connected) {
        // Usar setTimeout para evitar setState síncrono en useEffect
        setTimeout(() => {
          setIsConnected(true);
          setTimeout(() => {
            setIsReady(true);
          }, 100);
        }, 0);
      }

      socketInstance.on("connect", handleConnect);
      socketInstance.on("disconnect", handleDisconnect);

      return () => {
        socketInstance.off("connect", handleConnect);
        socketInstance.off("disconnect", handleDisconnect);
      };
    }
  }, []);

  return { socket, isConnected: isConnected && isReady };
}
