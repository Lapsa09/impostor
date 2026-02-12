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
    <Card className="w-full max-w-md border-primary/20 bg-black/40 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
      <CardHeader className="text-center space-y-4 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-3xl rounded-full -z-10" />

        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full mb-4 mx-auto border border-primary/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] shadow-primary/10 backdrop-blur-sm group">
          <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/icon1.png"
              alt="Impostor Futbolero"
              width={48}
              height={48}
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            />
          </div>
        </div>
        <CardTitle className="text-5xl font-bold text-primary tracking-tighter drop-shadow-sm skew-x-[-10deg]">
          IMPOSTOR <br /> <span className="text-white text-3xl tracking-normal font-sans font-light not-italic block mt-1 skew-x-[10deg]">FUTBOLERO</span>
        </CardTitle>
        <CardDescription className="text-lg font-medium text-muted-foreground">
          ¿Quién es el <span className="text-accent underline decoration-wavy underline-offset-4 pointer-events-none">impostor</span>?
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <HomeForm />
        <div className="pt-6 border-t border-white/5">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 text-center">Cómo jugar</h3>
          <ul className="text-xs text-muted-foreground space-y-2 font-mono bg-black/20 p-4 rounded-lg border border-white/5">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Un jugador será el <strong>impostor</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Los demás reciben el nombre de un jugador/club.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>¡Descubre quién miente!</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
