"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

interface ShareCardProps {
  roomCode: string;
}

export function ShareCard({ roomCode }: ShareCardProps) {
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/room/${roomCode}`;

  const handleCopyLink = async () => {
    try {
      if (!navigator.clipboard) {
        toast.error("Función de copiar no disponible.");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      toast.success("¡Enlace copiado!");
    } catch (err) {
      logger.error("Error al copiar:", err);
      toast.error("No se pudo copiar el enlace");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Impostor Futbolero",
          text: `¡Únete a mi sala de Impostor Futbolero!`,
          url: shareUrl,
        });
      } catch (err) {
        logger.log("Error al compartir:", err);
      }
    } else {
      await handleCopyLink();
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Comparte este código con tus amigos:
            </p>
            <div className="text-4xl font-bold tracking-wider text-green-600">
              {roomCode}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar enlace
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
