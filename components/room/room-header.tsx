import { Room } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { THEME_OPTIONS } from "@/lib/game-utils";

interface RoomHeaderProps {
  room: Room;
  playerId: string;
}

export function RoomHeader({ room, playerId }: RoomHeaderProps) {
  const isHost = room.hostId === playerId;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Sala: {room.code}
          </CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-sm">{room.players.length} jugadores</span>
          </div>
        </div>
        {isHost && (
          <p className="text-sm text-muted-foreground">
            Eres el anfitrión de la sala
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Temática:</span>
            <span className="font-medium">
              {THEME_OPTIONS.find((option) => option.id === room.theme)?.label}
            </span>
          </div>
          {room.themeYear && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Año:</span>
              <span className="font-medium">{room.themeYear}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
