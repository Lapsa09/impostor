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
  currentTheme: GameTheme;
}

export function HostControls({
  isHost,
  hasRound,
  onStartRound,
  onNextRound,
  onChangeTheme,
  onCloseRoom,
  currentTheme,
}: HostControlsProps) {
  const [showThemeEditor, setShowThemeEditor] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<GameTheme>(currentTheme);

  if (!isHost) return null;

  const handleChangeTheme = () => {
    onChangeTheme(selectedTheme);
    setShowThemeEditor(false);
  };

  return (
    <Card className="border-yellow-500 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Controles de Anfitrión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {!hasRound ? (
          <Button
            onClick={onStartRound}
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
