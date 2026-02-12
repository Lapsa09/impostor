"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log del error a un servicio de monitoreo
    console.error("Error en la aplicación:", error);
  }, [error]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-red-600">
          ¡Algo salió mal!
        </CardTitle>
        <CardDescription>
          Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          {error.message || "Error desconocido"}
        </div>
        <Button
          onClick={reset}
        >
          Intentar de nuevo
        </Button>
        <Button
          onClick={() => router.push("/")}
          variant="outline"
        >
          Volver al inicio
        </Button>
      </CardContent>
    </Card>
  );
}
