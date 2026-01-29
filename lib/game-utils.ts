import { GameTheme, ThemeOption } from "./types";
import subjectsData from "@/data/subjects.json";

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "jugadores-actuales-leyendas",
    label: "Jugadores Actuales y Leyendas",
  },
  {
    id: "jugadores-leyendas",
    label: "Jugadores Leyendas",
  },
  {
    id: "jugadores-actuales",
    label: "Jugadores Actuales",
  },
  {
    id: "clubes",
    label: "Clubes",
  },
  {
    id: "equipos-historicos",
    label: "Equipos Históricos",
  },
  {
    id: "mundial-especifico",
    label: "Mundiales",
  },
  {
    id: "futbol-argentino",
    label: "Fútbol Argentino",
  },
];

// Cargar datos desde el archivo JSON
const JUGADORES_ACTUALES = subjectsData.jugadores_actuales;
const JUGADORES_LEYENDAS = subjectsData.jugadores_leyendas;
const CLUBES = subjectsData.clubes;
const JUGADORES_ARGENTINOS = subjectsData.jugadores_argentinos;
const EQUIPOS_HISTORICOS = subjectsData.equipos_historicos;
const MUNDIALES = subjectsData.mundiales;

export function getSubjectsForTheme(theme: GameTheme): string[] {
  switch (theme) {
    case "jugadores-actuales-leyendas":
      return [...JUGADORES_ACTUALES, ...JUGADORES_LEYENDAS];
    case "jugadores-leyendas":
      return JUGADORES_LEYENDAS;
    case "jugadores-actuales":
      return JUGADORES_ACTUALES;
    case "clubes":
      return CLUBES;
    case "equipos-historicos":
      return EQUIPOS_HISTORICOS;
    case "mundial-especifico":
      return MUNDIALES;
    case "futbol-argentino":
      return JUGADORES_ARGENTINOS;
    default:
      return JUGADORES_ACTUALES;
  }
}

export function getRandomSubject(theme: GameTheme): string {
  const subjects = getSubjectsForTheme(theme);
  return subjects[Math.floor(Math.random() * subjects.length)];
}
export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
