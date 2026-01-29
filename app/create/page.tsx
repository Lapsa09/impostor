import { CreateRoomForm } from "@/components/create-room-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function CreateRoom({
  searchParams,
}: PageProps<"/create">) {
  const playerName = await searchParams.then(
    (res) => res.name as string | undefined,
  );

  if (!playerName) {
    return redirect("/");
  }

  return (
    <Suspense fallback={<div className="text-white text-xl">Cargando...</div>}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4 mx-auto">
            <span className="text-4xl">⚽</span>
          </div>
          <CardTitle className="text-3xl font-bold text-green-800">
            Crear Sala
          </CardTitle>
          <CardDescription>
            Hola, <span className="font-semibold">{playerName}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CreateRoomForm playerName={playerName} />
        </CardContent>
      </Card>
    </Suspense>
  );
}
