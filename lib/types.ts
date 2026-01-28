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
  usesRandomYear?: boolean;
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
  themeYear?: number;
  players: Player[];
  gameStarted: boolean;
  currentRound: number;
  impostorId?: string;
  assignedSubject?: string;
}

export interface PlayerAssignment {
  playerId: string;
  isImpostor: boolean;
  subject?: string;
}
