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
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${player.id === playerId
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(var(--primary),0.2)]"
                  : "bg-secondary/30 border-transparent hover:bg-secondary/50 text-foreground"
                }`}
            >
              <span className="font-medium font-sora">{player.name}</span>
              {player.id === room.hostId && (
                <span className="text-[10px] uppercase tracking-wider bg-accent/20 text-accent border border-accent/50 px-2 py-0.5 rounded-sm font-bold">
                  Host
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
