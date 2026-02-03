"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

interface StartingPlayerCardProps {
  playerName: string;
}

export function StartingPlayerCard({ playerName }: StartingPlayerCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-600">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Empieza la ronda:</p>
            <p className="text-lg font-bold">{playerName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
