import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Room, Player, GameTheme } from "@/lib/types";
import {
  generateRoomCode,
  getRandomSubject,
  generateRandomYear,
} from "@/lib/game-utils";
import { v4 as uuidv4 } from "uuid";

const rooms = new Map<string, Room>();

export function initSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Crear sala
    socket.on(
      "create-room",
      ({
        playerName,
        theme,
        themeYear,
      }: {
        playerName: string;
        theme: GameTheme;
        themeYear?: number;
      }) => {
        const roomCode = generateRoomCode();
        const playerId = uuidv4();

        console.log("Creando sala:", roomCode, "para jugador:", playerName);

        const player: Player = {
          id: playerId,
          name: playerName,
          isHost: true,
        };

        // Generar año aleatorio si la temática lo requiere
        const finalYear = themeYear || generateRandomYear(theme);

        const room: Room = {
          id: uuidv4(),
          code: roomCode,
          hostId: playerId,
          theme,
          themeYear: finalYear,
          players: [player],
          gameStarted: false,
          currentRound: 0,
        };

        rooms.set(roomCode, room);
        socket.join(roomCode);

        console.log("Sala creada. Total de salas:", rooms.size);

        socket.emit("room-created", {
          roomCode,
          playerId,
          room,
        });
      },
    );

    // Obtener información de sala
    socket.on("get-room", ({ roomCode }: { roomCode: string }) => {
      console.log("get-room solicitado para:", roomCode);
      const room = rooms.get(roomCode.toUpperCase());

      if (!room) {
        console.log("Sala no encontrada:", roomCode);
        socket.emit("room-not-found");
        return;
      }

      console.log("Enviando datos de sala:", roomCode);
      socket.join(roomCode);
      socket.emit("room-data", room);
    });

    // Unirse a sala
    socket.on(
      "join-room",
      ({ roomCode, playerName }: { roomCode: string; playerName: string }) => {
        const room = rooms.get(roomCode.toUpperCase());

        if (!room) {
          socket.emit("room-not-found");
          return;
        }

        if (room.gameStarted) {
          socket.emit("error", { message: "El juego ya comenzó" });
          return;
        }

        // Verificar si ya existe un jugador con ese nombre
        const nameExists = room.players.some(
          (p) => p.name.toLowerCase() === playerName.toLowerCase(),
        );
        if (nameExists) {
          socket.emit("error", {
            message: "Ya existe un jugador con ese nombre en la sala",
          });
          return;
        }

        const playerId = uuidv4();
        const player: Player = {
          id: playerId,
          name: playerName,
          isHost: false,
        };

        room.players.push(player);
        socket.join(roomCode);

        socket.emit("joined-room", { playerId, room });
        io.to(roomCode).emit("room-updated", room);
      },
    );

    // Iniciar ronda
    socket.on("start-round", ({ roomCode }: { roomCode: string }) => {
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Sala no encontrada" });
        return;
      }

      if (room.players.length < 2) {
        socket.emit("error", { message: "Se necesitan al menos 2 jugadores" });
        return;
      }

      // Seleccionar impostor aleatorio
      const impostorIndex = Math.floor(Math.random() * room.players.length);
      room.impostorId = room.players[impostorIndex].id;

      // Obtener tema/sujeto aleatorio
      room.assignedSubject = getRandomSubject(room.theme, room.themeYear);
      room.gameStarted = true;
      room.currentRound++;

      // Enviar actualización a todos
      io.to(roomCode).emit("room-updated", room);
    });

    // Actualizar tema
    socket.on(
      "update-theme",
      ({ roomCode, theme }: { roomCode: string; theme: GameTheme }) => {
        const room = rooms.get(roomCode);

        if (!room) {
          socket.emit("error", { message: "Sala no encontrada" });
          return;
        }

        room.theme = theme;
        // Generar año aleatorio si la temática lo requiere
        room.themeYear = generateRandomYear(theme);

        io.to(roomCode).emit("theme-updated", {
          theme,
          themeYear: room.themeYear,
        });
        io.to(roomCode).emit("room-updated", room);
      },
    );

    // Siguiente ronda
    socket.on("next-round", ({ roomCode }: { roomCode: string }) => {
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Sala no encontrada" });
        return;
      }

      // Revelar al impostor antes de resetear
      if (room.impostorId && room.assignedSubject) {
        const impostor = room.players.find((p) => p.id === room.impostorId);
        if (impostor) {
          io.to(roomCode).emit("impostor-reveal", {
            impostorName: impostor.name,
            subject: room.assignedSubject,
          });
        }
      }

      // Reset para siguiente ronda (después de 3 segundos para mostrar la revelación)
      setTimeout(() => {
        room.gameStarted = false;
        room.impostorId = undefined;
        room.assignedSubject = undefined;

        io.to(roomCode).emit("round-reset");
        io.to(roomCode).emit("room-updated", room);
      }, 500); // Pequeño delay para que el frontend muestre el dialog
    });

    // Cerrar sala
    socket.on("close-room", ({ roomCode }: { roomCode: string }) => {
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Sala no encontrada" });
        return;
      }

      io.to(roomCode).emit("room-closed");
      rooms.delete(roomCode);
    });

    // Desconexión
    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });

  return io;
}
