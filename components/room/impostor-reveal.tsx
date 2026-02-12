"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, UserX } from "lucide-react";
import { Button } from "../ui/button";

interface ImpostorRevealProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  impostorName: string;
  subject: string;
}

export function ImpostorReveal({
  open,
  onOpenChange,
  impostorName,
  subject,
}: ImpostorRevealProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-destructive/50 bg-black/90 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center border-2 border-destructive animate-pulse">
              <UserX className="w-10 h-10 text-destructive" />
            </div>
          </div>
          <DialogTitle className="text-3xl text-center font-display uppercase tracking-widest text-destructive drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
            ¡El impostor era...!
          </DialogTitle>
          <DialogDescription className="text-center space-y-4 pt-4">
            <div className="bg-destructive/10 border-2 border-destructive/50 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-destructive/5 animate-pulse" />
              <div className="flex items-center justify-center gap-2 mb-2 relative z-10">
                <User className="w-5 h-5 text-destructive" />
                <span className="text-2xl font-bold text-destructive font-display uppercase">
                  {impostorName}
                </span>
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/50 rounded-lg p-4">
              <p className="text-sm text-primary/80 mb-1 font-mono uppercase">El tema era:</p>
              <p className="text-xl font-semibold text-primary font-display uppercase">{subject}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild className="w-full">
            <Button className="w-full">Continuar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
