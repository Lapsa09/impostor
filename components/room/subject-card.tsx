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
        isImpostor ? "border-red-500 border-2" : "border-green-500 border-2"
      }
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isImpostor ? (
            <>
              <EyeOff className="w-5 h-5 text-red-600" />
              <span className="text-red-600">Eres el Impostor</span>
            </>
          ) : (
            <>
              <Eye className="w-5 h-5 text-green-600" />
              <span className="text-green-600">Tu tema</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-center p-6 rounded-lg ${
            isImpostor ? "bg-red-50" : "bg-green-50"
          }`}
        >
          <p
            className={`text-3xl font-bold ${
              isImpostor ? "text-red-700" : "text-green-700"
            }`}
          >
            {subject}
          </p>
        </div>
        {isImpostor && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Intenta pasar desapercibido y descubre el tema de los demás
          </p>
        )}
      </CardContent>
    </Card>
  );
}
