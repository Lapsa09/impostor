import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

interface SubjectCardProps {
  subject: string;
  isImpostor: boolean;
}

export function SubjectCard({ subject, isImpostor }: SubjectCardProps) {
  return (
    <Card
      className={
        isImpostor
          ? "border-destructive/50 bg-destructive/10 backdrop-blur-md"
          : "border-primary/50 bg-primary/5 backdrop-blur-md"
      }
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isImpostor ? (
            <>
              <EyeOff className="w-5 h-5 text-destructive" />
              <span className="text-destructive font-bold">Eres el Impostor</span>
            </>
          ) : (
            <>
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-primary font-bold">Tu tema</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-center p-6 rounded-lg border ${isImpostor
              ? "bg-destructive/10 border-destructive/20"
              : "bg-primary/10 border-primary/20"
            }`}
        >
          <p
            className={`text-3xl font-bold font-display uppercase tracking-wider ${isImpostor ? "text-destructive" : "text-primary"
              }`}
          >
            {subject}
          </p>
        </div>
        {isImpostor && (
          <p className="text-sm text-destructive/80 mt-4 text-center font-medium">
            Intenta pasar desapercibido y descubre el tema de los demás
          </p>
        )}
      </CardContent>
    </Card>
  );
}
