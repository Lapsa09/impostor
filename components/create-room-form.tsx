"use client";

import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { THEME_OPTIONS } from "@/lib/game-utils";
import { GameTheme } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Field, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CreateRoomFormProps {
  playerName: string;
}

export function CreateRoomForm({ playerName }: CreateRoomFormProps) {
  const router = useRouter();
  const { socket, isConnected } = useSocket();

  const [selectedTheme, setSelectedTheme] = useState<GameTheme>(
    "jugadores-actuales-leyendas",
  );
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleRoomCreated = ({
      roomCode,
      playerId,
    }: {
      roomCode: string;
      playerId: string;
    }) => {
      console.log("Sala creada! Código:", roomCode, "PlayerId:", playerId);
      toast.dismiss("creating-room");
      toast.success("¡Sala creada exitosamente!");
      setIsCreating(false);
      setTimeout(() => {
        router.push(`/room/${roomCode}?playerId=${playerId}`);
      }, 500);
    };

    const handleError = ({ message }: { message: string }) => {
      console.error("Error al crear sala:", message);
      toast.dismiss("creating-room");
      toast.error(message);
      setIsCreating(false);
    };

    socket.on("room-created", handleRoomCreated);
    socket.on("error", handleError);

    return () => {
      socket.off("room-created", handleRoomCreated);
      socket.off("error", handleError);
    };
  }, [socket, isConnected, router]);

  const handleCreateRoom: React.SubmitEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();

    if (!socket || !isConnected) {
      toast.error("No conectado al servidor");
      return;
    }

    setIsCreating(true);
    toast.loading("Creando sala...", { id: "creating-room" });

    socket.emit("create-room", {
      playerName,
      theme: selectedTheme,
    });
  };

  return (
    <form onSubmit={handleCreateRoom} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="theme">Temática del juego</FieldLabel>
        <Select
          value={selectedTheme}
          onValueChange={(value) => setSelectedTheme(value as GameTheme)}
        >
          <SelectTrigger id="theme" className="w-full">
            <SelectValue placeholder="Selecciona una temática" />
          </SelectTrigger>
          <SelectContent>
            {THEME_OPTIONS.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          disabled={isCreating || !isConnected}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          {isCreating ? "Creando..." : "Crear Sala"}
        </Button>
        <Button variant="outline" className="w-full" size="lg" asChild>
          <Link href="/">Volver</Link>
        </Button>
      </div>

      {!isConnected && (
        <div className="text-center text-sm text-yellow-600">
          Conectando al servidor...
        </div>
      )}
    </form>
  );
}
