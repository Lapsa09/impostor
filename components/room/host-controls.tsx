"use client";

import { useState } from "react";
import { GameTheme } from "@/lib/types";
import { THEME_OPTIONS } from "@/lib/game-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, SkipForward, Settings, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface HostControlsProps {
  isHost: boolean;
  hasRound: boolean;
  onStartRound: () => void;
  onNextRound: () => void;
  onChangeTheme: (theme: GameTheme) => void;
  onCloseRoom: () => void;
  onChangeNumImpostors: (num: number) => void;
  currentTheme: GameTheme;
  enoughPlayers: boolean;
  playerCount: number;
  numImpostors: number;
}

export function HostControls({
  isHost,
  hasRound,
  onStartRound,
  onNextRound,
  onChangeTheme,
  onCloseRoom,
  onChangeNumImpostors,
  currentTheme,
  enoughPlayers,
  playerCount,
  numImpostors,
}: HostControlsProps) {
  const [showThemeEditor, setShowThemeEditor] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<GameTheme>(currentTheme);

  if (!isHost) return null;

  const handleChangeTheme = () => {
    onChangeTheme(selectedTheme);
    setShowThemeEditor(false);
  };

  // Calcular el máximo de impostores permitido
  // Mínimo 1, máximo 1 + (jugadores - 5) / 2
  const maxImpostors =
    playerCount > 5 ? Math.floor(1 + (playerCount - 5) / 2) : 1;

  const impostorOptions = Array.from({ length: maxImpostors }, (_, i) => i + 1);

  return (
    <Card className="border-yellow-500 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Controles de Anfitrión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Selector de impostores (solo visible si hay más de 5 jugadores) */}
        {playerCount > 5 && !hasRound && (
          <div className="p-3 bg-secondary rounded-lg space-y-2">
            <label className="text-sm font-medium">
              Cantidad de Impostores: {numImpostors}
            </label>
            <Select
              value={numImpostors.toString()}
              onValueChange={(value) => onChangeNumImpostors(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {impostorOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Impostor" : "Impostores"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Aviso de jugadores insuficientes */}
        {!hasRound && !enoughPlayers && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
              ⚠️ Se necesitan al menos 3 jugadores para iniciar el juego
            </p>
          </div>
        )}

        {!hasRound ? (
          <Button
            onClick={onStartRound}
            disabled={!enoughPlayers}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Iniciar Ronda
          </Button>
        ) : (
          <Button
            onClick={onNextRound}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Nueva Ronda
          </Button>
        )}

        {!showThemeEditor ? (
          <Button
            onClick={() => setShowThemeEditor(true)}
            variant="outline"
            className="w-full"
          >
            <Settings className="w-4 h-4 mr-2" />
            Cambiar Temática
          </Button>
        ) : (
          <div className="space-y-2 p-3 bg-secondary rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Nueva temática</span>
              <Button
                onClick={() => setShowThemeEditor(false)}
                variant="ghost"
                size="icon"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Select
              value={selectedTheme}
              onValueChange={(value) => setSelectedTheme(value as GameTheme)}
            >
              <SelectTrigger>
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
            <Button onClick={handleChangeTheme} size="sm" className="w-full">
              Aplicar cambio
            </Button>
          </div>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full" size="sm">
              Cerrar Sala
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro de que quieres cerrar la sala?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Todos los jugadores serán
                expulsados de la sala.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={onCloseRoom}>
                Cerrar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
