"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { Room, GameTheme } from "@/lib/types";
import { RoomHeader } from "@/components/room/room-header";
import { PlayerList } from "@/components/room/player-list";
import { SubjectCard } from "@/components/room/subject-card";
import { ShareCard } from "@/components/room/share-card";
import { HostControls } from "@/components/room/host-controls";
import { ImpostorReveal } from "@/components/room/impostor-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface RoomClientProps {
  roomCode: string;
}

export function RoomClient({ roomCode }: RoomClientProps) {
  const { socket, isConnected } = useSocket();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlayerId = searchParams.get("playerId") || "";
  const initialPlayerName = searchParams.get("name") || "";
  const [playerId, setPlayerId] = useState<string>(initialPlayerId);
  const [room, setRoom] = useState<Room | null>(null);
  const [isImpostor, setIsImpostor] = useState(false);
  const [assignedSubject, setAssignedSubject] = useState<string>("");
  const [showImpostorReveal, setShowImpostorReveal] = useState(false);
  const [revealData, setRevealData] = useState<{
    impostorName: string;
    subject: string;
  } | null>(null);
  const initializedRef = useRef(false);

  // Inicialización
  useEffect(() => {
    if (initializedRef.current || !socket) return;

    const initRoom = () => {
      if (playerId) {
        console.log("Solicitando datos de sala:", roomCode);
        socket.emit("get-room", { roomCode, playerId });
        initializedRef.current = true;
      } else if (initialPlayerName) {
        console.log("Uniéndose a sala con nombre:", initialPlayerName);
        socket.emit("join-room", {
          roomCode,
          playerName: initialPlayerName,
        });
        initializedRef.current = true;
      } else {
        router.push("/");
      }
    };

    if (isConnected) {
      initRoom();
    } else {
      const handleConnect = () => {
        initRoom();
        socket.off("connect", handleConnect);
      };
      socket.on("connect", handleConnect);
      return () => {
        socket.off("connect", handleConnect);
      };
    }
  }, [socket, isConnected, roomCode, playerId, initialPlayerName, router]);

  // Socket listeners
  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleRoomData = (data: Room) => {
      console.log("Datos de sala recibidos:", data);
      setRoom(data);

      if (data.gameStarted) {
        const isPlayerImpostor = data.impostorIds
          ? data.impostorIds.includes(playerId)
          : data.impostorId === playerId;

        setIsImpostor(isPlayerImpostor);
        setAssignedSubject(
          isPlayerImpostor
            ? "IMPOSTOR"
            : data.assignedSubject || "Esperando...",
        );
      }
    };

    const handleJoinedRoom = ({
      playerId: newPlayerId,
      room: updatedRoom,
    }: {
      playerId: string;
      room: Room;
    }) => {
      console.log("Unido a sala, playerId:", newPlayerId);
      setPlayerId(newPlayerId);
      setRoom(updatedRoom);

      if (updatedRoom.gameStarted) {
        const isPlayerImpostor = updatedRoom.impostorIds
          ? updatedRoom.impostorIds.includes(newPlayerId)
          : updatedRoom.impostorId === newPlayerId;

        setIsImpostor(isPlayerImpostor);
        setAssignedSubject(
          isPlayerImpostor
            ? "IMPOSTOR"
            : updatedRoom.assignedSubject || initialPlayerName,
        );
      }
    };

    const handleRoomUpdated = (updatedRoom: Room) => {
      console.log("Sala actualizada:", updatedRoom);
      setRoom(updatedRoom);

      if (updatedRoom.gameStarted) {
        const isPlayerImpostor = updatedRoom.impostorIds
          ? updatedRoom.impostorIds.includes(playerId)
          : updatedRoom.impostorId === playerId;

        setIsImpostor(isPlayerImpostor);
        setAssignedSubject(
          isPlayerImpostor
            ? "IMPOSTOR"
            : updatedRoom.assignedSubject || "Esperando...",
        );
      }
    };

    const handleRoomClosed = () => {
      toast.info("La sala ha sido cerrada");
      router.push("/");
    };

    const handleHostTransferred = ({
      newHostId,
      newHostName,
    }: {
      newHostId: string;
      newHostName: string;
    }) => {
      if (playerId === newHostId) {
        toast.success("Ahora eres el anfitrión de la sala");
      } else {
        toast.info(`${newHostName} es ahora el anfitrión de la sala`);
      }
    };

    const handleError = ({ message }: { message: string }) => {
      console.error("Error:", message);
      toast.error(message);

      // Redirigir a la página principal después de mostrar el error
      setTimeout(() => {
        router.push("/");
      }, 2000);
    };

    const handleRoomNotFound = () => {
      toast.error("Sala no encontrada");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    };

    const handleImpostorReveal = ({
      impostorName,
      subject,
    }: {
      impostorName: string;
      subject: string;
    }) => {
      setRevealData({ impostorName, subject });
      setShowImpostorReveal(true);
    };

    socket.on("room-data", handleRoomData);
    socket.on("joined-room", handleJoinedRoom);
    socket.on("room-updated", handleRoomUpdated);
    socket.on("room-closed", handleRoomClosed);
    socket.on("host-transferred", handleHostTransferred);
    socket.on("room-not-found", handleRoomNotFound);
    socket.on("error", handleError);
    socket.on("impostor-reveal", handleImpostorReveal);

    return () => {
      socket.off("room-data", handleRoomData);
      socket.off("joined-room", handleJoinedRoom);
      socket.off("room-updated", handleRoomUpdated);
      socket.off("room-closed", handleRoomClosed);
      socket.off("host-transferred", handleHostTransferred);
      socket.off("room-not-found", handleRoomNotFound);
      socket.off("error", handleError);
      socket.off("impostor-reveal", handleImpostorReveal);
    };
  }, [socket, isConnected, playerId, initialPlayerName, router]);

  // Cleanup cuando se cierra el navegador o se abandona la página
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket && playerId && roomCode) {
        socket.emit("leave-room", { roomCode, playerId });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Emitir leave-room cuando el componente se desmonta
      if (socket && playerId && roomCode) {
        socket.emit("leave-room", { roomCode, playerId });
      }
    };
  }, [socket, playerId, roomCode]);

  // Funciones de control
  const handleStartRound = () => {
    if (socket) {
      socket.emit("start-round", { roomCode });
    }
  };

  const handleNextRound = () => {
    if (socket) {
      socket.emit("next-round", { roomCode });
    }
  };

  const handleChangeTheme = (theme: GameTheme) => {
    if (socket) {
      socket.emit("update-theme", { roomCode, theme });
    }
  };

  const handleChangeNumImpostors = (numImpostors: number) => {
    if (socket) {
      socket.emit("update-num-impostors", { roomCode, numImpostors });
    }
  };

  const handleCloseRoom = () => {
    if (socket) {
      socket.emit("close-room", { roomCode });
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit("leave-room", { roomCode, playerId });
      toast.info("Saliste de la sala");
      router.push("/");
    }
  };

  if (!room) {
    return (
      <Card className="p-8">
        <CardContent className="text-center">
          <div className="text-xl font-semibold">Cargando sala...</div>
        </CardContent>
      </Card>
    );
  }

  const isHost = room.hostId === playerId;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-4">
        <RoomHeader room={room} playerId={playerId} onLeaveRoom={handleLeaveRoom} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <PlayerList room={room} playerId={playerId} />
            {!room.gameStarted && <ShareCard roomCode={room.code} />}
          </div>

          <div className="space-y-4">
            {room.gameStarted && assignedSubject && (
              <SubjectCard subject={assignedSubject} isImpostor={isImpostor} />
            )}

            <HostControls
              isHost={isHost}
              enoughPlayers={room.players.length >= 3}
              hasRound={room.gameStarted}
              onStartRound={handleStartRound}
              onNextRound={handleNextRound}
              onChangeTheme={handleChangeTheme}
              onChangeNumImpostors={handleChangeNumImpostors}
              onCloseRoom={handleCloseRoom}
              currentTheme={room.theme}
              playerCount={room.players.length}
              numImpostors={room.numImpostors}
            />
          </div>
        </div>
      </div>

      {revealData && (
        <ImpostorReveal
          open={showImpostorReveal}
          onOpenChange={setShowImpostorReveal}
          impostorName={revealData.impostorName}
          subject={revealData.subject}
        />
      )}
    </>
  );
}
