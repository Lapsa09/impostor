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
  "Mauro Zárate",
  "Javier Saviola",
  "Diego Simeone",
  "Oscar Ruggeri",
  "Ricardo Bochini",
  "Leandro Paredes",
  "Emiliano Martínez",
];

const EQUIPOS_HISTORICOS = [
  // Equipos historicos del siglo xxi como el Barcelona de 2009, el real madrid de 2014, etc.
  "Barcelona 2009",
  "Real Madrid 2014",
  "Manchester United 2008",
  "Liverpool 2019",
  "Bayern Munich 2013",
  "AC Milan 2007",
  "Inter de Milán 2010",
  "Juventus 2015",
  "Ajax 2019",
  "Chelsea 2012",
  "PSG 2020",
  "Atlético Madrid 2014",
  "Real Madrid 2002",
  "Barcelona 2015",
  "Manchester City 2023",
  "Liverpool 2005",
  "Bayern Munich 2020",
  "PSG 2025",
  "AC Milan 2003",
  "Real Madrid 2017",
  "Real Madrid 2022",
  "Barcelona 2024",
  "Barcelona 2011",
  "Boca Juniors 2000",
  "River Plate 2015",
  "San Lorenzo 2014",
  "Independiente 2017",
  "Boca Juniors 2003",
  "River Plate 2018",
];

const MUNDIALES = [
  "Mundial 1978",
  "Mundial 1986",
  "Mundial 1990",
  "Mundial 1994",
  "Mundial 2002",
  "Mundial 2006",
  "Mundial 2010",
  "Mundial 2014",
  "Mundial 2018",
  "Mundial 2022",
];

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
