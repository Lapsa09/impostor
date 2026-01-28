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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <UserX className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">
            ¡El impostor era...!
          </DialogTitle>
          <DialogDescription className="text-center space-y-4 pt-4">
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="w-5 h-5 text-red-600" />
                <span className="text-2xl font-bold text-red-700">
                  {impostorName}
                </span>
              </div>
            </div>
            <div className="bg-green-50 border border-green-500 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">El tema era:</p>
              <p className="text-xl font-semibold text-green-700">{subject}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild className="w-full">
            <Button variant={"outline"}>Continuar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
