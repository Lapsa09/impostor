import { HomeForm } from "@/components/home-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4 mx-auto">
          <Image
            src="/icon1.png"
            alt="Impostor Futbolero"
            width={40}
            height={40}
          />
        </div>
        <CardTitle className="text-4xl font-bold text-green-800">
          Impostor Futbolero
        </CardTitle>
        <CardDescription>¿Quién es el impostor?</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <HomeForm />
        <div className="pt-4 border-t">
          <h3 className="text-sm font-semibold mb-2">Cómo jugar:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Un jugador será el impostor</li>
            <li>• Los demás reciben el nombre de un jugador/club</li>
            <li>• ¡Descubre quién es el impostor!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
