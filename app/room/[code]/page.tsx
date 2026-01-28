import { Suspense } from "react";
import { RoomClient } from "@/components/room/room-client";
import { Card, CardContent } from "@/components/ui/card";

async function RoomPage({ params }: PageProps<"/room/[code]">) {
  const { code } = await params;

  const roomCode = code.toUpperCase();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-600 via-green-700 to-green-900">
          <Card className="p-8">
            <CardContent className="text-center">
              <div className="text-xl font-semibold">Cargando sala...</div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <RoomClient roomCode={roomCode} />
    </Suspense>
  );
}

export default RoomPage;
