"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const toggleFormMode = () => {
    setShowJoinForm((prev) => !prev);
    setRoomCode("");
  };

  return (
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
          onClick={toggleFormMode}
          disabled={!playerName.trim()}
          variant="secondary"
          className="w-full"
          size="lg"
          type="button"
        >
          {showJoinForm
            ? "Crear una nueva sala"
            : "Unirse a una sala existente"}
        </Button>
      </div>
    </form>
  );
}
