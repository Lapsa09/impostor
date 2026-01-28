"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateRoomForm } from "@/components/create-room-form";
import { useEffect } from "react";

function CreateRoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const playerName = searchParams.get("name") || "";

  useEffect(() => {
    if (!playerName) {
      router.push("/");
    }
  }, [playerName, router]);

  if (!playerName) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-600 via-green-700 to-green-900 p-4">
      <CreateRoomForm playerName={playerName} />
    </div>
  );
}

export default function CreateRoom() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-600 via-green-700 to-green-900">
          <div className="text-white text-xl">Cargando...</div>
        </div>
      }
    >
      <CreateRoomContent />
    </Suspense>
  );
}
