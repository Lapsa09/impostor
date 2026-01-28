import { GameTheme, ThemeOption } from "./types";

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
    label: "Equipos Históricos (Año Aleatorio)",
    usesRandomYear: true,
  },
  {
    id: "mundial-especifico",
    label: "Mundial (Año Aleatorio)",
    usesRandomYear: true,
  },
  {
    id: "futbol-argentino",
    label: "Fútbol Argentino",
  },
];

// Base de datos de sujetos según temática
const JUGADORES_ACTUALES = [
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Kylian Mbappé",
  "Erling Haaland",
  "Vinicius Jr",
  "Kevin De Bruyne",
  "Harry Kane",
  "Luka Modrić",
  "Robert Lewandowski",
  "Mohamed Salah",
  "Neymar Jr",
  "Karim Benzema",
  "Son Heung-min",
  "Bernardo Silva",
  "Rodri",
  "Bukayo Saka",
  "Jude Bellingham",
  "Julián Álvarez",
  "Lautaro Martínez",
  "Emiliano Martínez",
];

const JUGADORES_LEYENDAS = [
  "Diego Maradona",
  "Pelé",
  "Johan Cruyff",
  "Franz Beckenbauer",
  "Alfredo Di Stéfano",
  "Zinedine Zidane",
  "Ronaldo Nazário",
  "Ronaldinho",
  "Thierry Henry",
  "Paolo Maldini",
  "Franco Baresi",
  "Roberto Baggio",
  "Lothar Matthäus",
  "Michel Platini",
  "George Best",
  "Ferenc Puskás",
  "Eusébio",
  "Gerd Müller",
  "Marco van Basten",
  "Romário",
];

const CLUBES = [
  "Real Madrid",
  "Barcelona",
  "Manchester United",
  "Liverpool",
  "Bayern Munich",
  "AC Milan",
  "Inter de Milán",
  "Juventus",
  "Ajax",
  "Benfica",
  "Porto",
  "Manchester City",
  "Chelsea",
  "Arsenal",
  "PSG",
  "Borussia Dortmund",
  "Atlético Madrid",
  "Sevilla",
  "Roma",
  "Napoli",
];

const JUGADORES_ARGENTINOS = [
  "Lionel Messi",
  "Diego Maradona",
  "Alfredo Di Stéfano",
  "Gabriel Batistuta",
  "Javier Zanetti",
  "Juan Román Riquelme",
  "Hernán Crespo",
  "Daniel Passarella",
  "Mario Kempes",
  "Sergio Agüero",
  "Ángel Di María",
  "Carlos Tevez",
  "Javier Mascherano",
  "Martín Palermo",
  "Ariel Ortega",
  "Claudio Caniggia",
  "Fernando Redondo",
  "Roberto Ayala",
  "Julián Álvarez",
  "Lautaro Martínez",
];

export function getSubjectsForTheme(theme: GameTheme, year?: number): string[] {
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
      // Si no hay año, generar uno aleatorio entre 1950 y 2024
      const equiposYear =
        year || Math.floor(Math.random() * (2024 - 1950 + 1)) + 1950;
      return [`Equipos destacados de ${equiposYear}`];
    case "mundial-especifico":
      // Años de mundiales: cada 4 años desde 1930, excepto 1942 y 1946
      const mundialYears = [];
      for (let y = 1930; y <= 2022; y += 4) {
        if (y !== 1942 && y !== 1946) {
          mundialYears.push(y);
        }
      }
      const mundialYear =
        year || mundialYears[Math.floor(Math.random() * mundialYears.length)];
      return [`Selecciones del Mundial ${mundialYear}`];
    case "futbol-argentino":
      return JUGADORES_ARGENTINOS;
    default:
      return JUGADORES_ACTUALES;
  }
}

export function getRandomSubject(theme: GameTheme, year?: number): string {
  const subjects = getSubjectsForTheme(theme, year);
  return subjects[Math.floor(Math.random() * subjects.length)];
}

export function generateRandomYear(theme: GameTheme): number | undefined {
  const option = THEME_OPTIONS.find((opt) => opt.id === theme);
  if (!option?.usesRandomYear) return undefined;

  if (theme === "equipos-historicos") {
    // Año aleatorio entre 1950 y 2024
    return Math.floor(Math.random() * (2024 - 1950 + 1)) + 1950;
  }

  if (theme === "mundial-especifico") {
    // Años de mundiales
    const mundialYears = [];
    for (let y = 1930; y <= 2022; y += 4) {
      if (y !== 1942 && y !== 1946) {
        mundialYears.push(y);
      }
    }
    return mundialYears[Math.floor(Math.random() * mundialYears.length)];
  }

  return undefined;
}

export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
