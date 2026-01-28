import { Room } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlayerListProps {
  room: Room;
  playerId: string;
}

export function PlayerList({ room, playerId }: PlayerListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jugadores</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {room.players.map((player) => (
            <li
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                player.id === playerId
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-secondary"
              }`}
            >
              <span className="font-medium">{player.name}</span>
              {player.id === room.hostId && (
                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-semibold">
                  Anfitrión
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
