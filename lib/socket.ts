import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Room, Player, GameTheme } from "@/lib/types";
import { generateRoomCode, getRandomSubject } from "@/lib/game-utils";
import { v4 as uuidv4 } from "uuid";

const rooms = new Map<string, Room>();
const socketToPlayer = new Map<
  string,
  { roomCode: string; playerId: string }
>();

export function initSocket(httpServer: HTTPServer) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
    "http://localhost:3000",
  ];

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Crear sala
    socket.on(
      "create-room",
      ({ playerName, theme }: { playerName: string; theme: GameTheme }) => {
        const roomCode = generateRoomCode();
        const playerId = uuidv4();

        console.log("Creando sala:", roomCode, "para jugador:", playerName);

        const player: Player = {
          id: playerId,
          name: playerName,
          isHost: true,
        };

        const room: Room = {
          id: uuidv4(),
          code: roomCode,
          hostId: playerId,
          theme,
          players: [player],
          gameStarted: false,
          currentRound: 0,
          numImpostors: 1, // Por defecto 1 impostor
        };

        rooms.set(roomCode, room);
        socket.join(roomCode);
        socketToPlayer.set(socket.id, { roomCode, playerId });

        console.log("Sala creada. Total de salas:", rooms.size);

        socket.emit("room-created", {
          roomCode,
          playerId,
          room,
        });
      },
    );

    // Obtener información de sala
    socket.on(
      "get-room",
      ({ roomCode, playerId }: { roomCode: string; playerId?: string }) => {
        console.log(
          "get-room solicitado para:",
          roomCode,
          "playerId:",
          playerId,
        );
        const room = rooms.get(roomCode.toUpperCase());

        if (!room) {
          console.log("Sala no encontrada:", roomCode);
          socket.emit("room-not-found");
          return;
        }

        console.log("Enviando datos de sala:", roomCode);
        socket.join(roomCode);

        // Si tenemos playerId, actualizar el mapping
        if (playerId) {
          console.log(
            "Actualizando mapping para socket:",
            socket.id,
            "playerId:",
            playerId,
          );
          socketToPlayer.set(socket.id, {
            roomCode: roomCode.toUpperCase(),
            playerId,
          });
        }

        socket.emit("room-data", room);
      },
    );

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
        socketToPlayer.set(socket.id, { roomCode, playerId });

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

      // Seleccionar impostores aleatorios según la cantidad configurada
      const numImpostors = Math.min(room.numImpostors, room.players.length);
      const shuffledPlayers = [...room.players].sort(() => Math.random() - 0.5);
      const impostorIds = shuffledPlayers
        .slice(0, numImpostors)
        .map((p) => p.id);

      room.impostorIds = impostorIds;
      // Mantener impostorId para compatibilidad (primer impostor)
      room.impostorId = impostorIds[0];

      // Obtener tema/sujeto aleatorio
      room.assignedSubject = getRandomSubject(room.theme);
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

        io.to(roomCode).emit("theme-updated", {
          theme,
        });
        io.to(roomCode).emit("room-updated", room);
      },
    );

    // Actualizar número de impostores
    socket.on(
      "update-num-impostors",
      ({
        roomCode,
        numImpostors,
      }: {
        roomCode: string;
        numImpostors: number;
      }) => {
        const room = rooms.get(roomCode);

        if (!room) {
          socket.emit("error", { message: "Sala no encontrada" });
          return;
        }

        room.numImpostors = numImpostors;
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

      // Revelar impostores antes de resetear
      if (
        room.impostorIds &&
        room.impostorIds.length > 0 &&
        room.assignedSubject
      ) {
        const impostors = room.players.filter((p) =>
          room.impostorIds?.includes(p.id),
        );
        const impostorNames = impostors.map((i) => i.name);

        io.to(roomCode).emit("impostor-reveal", {
          impostorName: impostorNames.join(", "),
          impostorNames,
          subject: room.assignedSubject,
        });
      } else if (room.impostorId && room.assignedSubject) {
        // Fallback para compatibilidad
        const impostor = room.players.find((p) => p.id === room.impostorId);
        if (impostor) {
          io.to(roomCode).emit("impostor-reveal", {
            impostorName: impostor.name,
            impostorNames: [impostor.name],
            subject: room.assignedSubject,
          });
        }
      }

      // Reset para siguiente ronda (después de 3 segundos para mostrar la revelación)
      setTimeout(() => {
        room.gameStarted = false;
        room.impostorId = undefined;
        room.impostorIds = undefined;
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
      console.log("Sala cerrada:", roomCode, "Total de salas:", rooms.size);
    });

    // Salir de la sala
    socket.on(
      "leave-room",
      ({ roomCode, playerId }: { roomCode: string; playerId: string }) => {
        const room = rooms.get(roomCode);

        if (!room) {
          return;
        }

        console.log("Jugador", playerId, "saliendo de sala:", roomCode);

        // Remover jugador de la sala
        room.players = room.players.filter((p) => p.id !== playerId);

        // Si no quedan jugadores, cerrar la sala
        if (room.players.length === 0) {
          console.log("Última persona salió, cerrando sala:", roomCode);
          rooms.delete(roomCode);
          io.to(roomCode).emit("room-closed");
          return;
        }

        // Si el host salió, transferir host a otro jugador
        if (room.hostId === playerId && room.players.length > 0) {
          const newHost = room.players[0];
          room.hostId = newHost.id;
          newHost.isHost = true;

          console.log(
            "Host transferido a:",
            newHost.name,
            "en sala:",
            roomCode,
          );

          io.to(roomCode).emit("host-transferred", {
            newHostId: newHost.id,
            newHostName: newHost.name,
          });
        }

        // Notificar a todos sobre la actualización
        io.to(roomCode).emit("room-updated", room);
        socket.leave(roomCode);
        socketToPlayer.delete(socket.id);
      },
    );

    // Desconexión
    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);

      // Buscar el mapping del socket al jugador
      const mapping = socketToPlayer.get(socket.id);

      if (!mapping) {
        // Socket no estaba en ninguna sala
        return;
      }

      const { roomCode, playerId } = mapping;
      const room = rooms.get(roomCode);

      if (!room) {
        socketToPlayer.delete(socket.id);
        return;
      }

      const player = room.players.find((p) => p.id === playerId);

      if (!player) {
        socketToPlayer.delete(socket.id);
        return;
      }

      console.log("Jugador", player.name, "desconectado de sala:", roomCode);

      // Remover jugador
      room.players = room.players.filter((p) => p.id !== playerId);

      // Si no quedan jugadores, cerrar la sala
      if (room.players.length === 0) {
        console.log("Última persona desconectada, cerrando sala:", roomCode);
        rooms.delete(roomCode);
        io.to(roomCode).emit("room-closed");
        socketToPlayer.delete(socket.id);
        return;
      }

      // Si el host se desconectó, transferir host a otro jugador
      if (room.hostId === playerId && room.players.length > 0) {
        const newHost = room.players[0];
        room.hostId = newHost.id;
        newHost.isHost = true;

        console.log("Host transferido a:", newHost.name, "en sala:", roomCode);

        io.to(roomCode).emit("host-transferred", {
          newHostId: newHost.id,
          newHostName: newHost.name,
        });
      }

      // Notificar a todos sobre la actualización
      io.to(roomCode).emit("room-updated", room);
      socketToPlayer.delete(socket.id);
    });
  });

  return io;
}
