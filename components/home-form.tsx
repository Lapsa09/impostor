"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "./ui/field";

export function HomeForm() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleCreateRoom = () => {
    if (playerName.trim()) {
      router.push(`/create?name=${encodeURIComponent(playerName)}`);
    }
  };

  const handleJoinRoom = () => {
    if (playerName.trim() && roomCode.trim()) {
      router.push(
        `/room/${roomCode.toUpperCase()}?name=${encodeURIComponent(playerName)}`,
      );
    }
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (showJoinForm) {
      handleJoinRoom();
    } else {
      handleCreateRoom();
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4 mx-auto">
          <span className="text-4xl">⚽</span>
        </div>
        <CardTitle className="text-4xl font-bold text-green-800">
          Impostor Futbolero
        </CardTitle>
        <CardDescription>¿Quién es el impostor?</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="playerName">Tu nombre</FieldLabel>
            <Input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Ingresa tu nombre"
            />
          </Field>
          {showJoinForm && (
            <Field>
              <FieldLabel htmlFor="roomCode">Código de sala</FieldLabel>
              <Input
                id="roomCode"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Ej: ABC123"
                maxLength={6}
              />
            </Field>
          )}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleCreateRoom}
              disabled={
                showJoinForm
                  ? !playerName.trim() || !roomCode.trim()
                  : !playerName.trim()
              }
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {showJoinForm ? "Unirse" : "Crear Sala"}
            </Button>
            <Button
              onClick={() => setShowJoinForm(true)}
              disabled={!playerName.trim()}
              variant="secondary"
              className="w-full"
              size="lg"
            >
              Unirse a Sala
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-semibold mb-2">Cómo jugar:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Un jugador será el impostor</li>
            <li>• Los demás reciben el nombre de un jugador/club</li>
            <li>• ¡Descubre quién es el impostor!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
