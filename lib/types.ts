export type GameTheme =
  | "jugadores-actuales-leyendas"
  | "jugadores-leyendas"
  | "jugadores-actuales"
  | "clubes"
  | "equipos-historicos"
  | "mundial-especifico"
  | "futbol-argentino";

export interface ThemeOption {
  id: GameTheme;
  label: string;
}

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

export interface Room {
  id: string;
  code: string;
  hostId: string;
  theme: GameTheme;
  players: Player[];
  gameStarted: boolean;
  currentRound: number;
  impostorId?: string;
  impostorIds?: string[]; // Para múltiples impostores
  assignedSubject?: string;
  numImpostors: number; // Cantidad de impostores seleccionada
}

export interface PlayerAssignment {
  playerId: string;
  isImpostor: boolean;
  subject?: string;
}
