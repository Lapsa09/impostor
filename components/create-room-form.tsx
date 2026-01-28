"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { GameTheme } from "@/lib/types";
import { THEME_OPTIONS } from "@/lib/game-utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import Link from "next/link";

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

  const handleCreateRoom = () => {
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
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4 mx-auto">
          <span className="text-4xl">⚽</span>
        </div>
        <CardTitle className="text-3xl font-bold text-green-800">
          Crear Sala
        </CardTitle>
        <CardDescription>
          Hola, <span className="font-semibold">{playerName}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
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
            onClick={handleCreateRoom}
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
      </CardContent>
    </Card>
  );
}
