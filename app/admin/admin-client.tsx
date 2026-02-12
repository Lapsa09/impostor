"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Save, Lock } from "lucide-react";
import { logger } from "@/lib/logger";

interface SubjectsData {
  jugadores_actuales: string[];
  jugadores_leyendas: string[];
  clubes: string[];
  jugadores_argentinos: string[];
  equipos_historicos: string[];
  mundiales: string[];
}

const CATEGORY_LABELS: Record<keyof SubjectsData, string> = {
  jugadores_actuales: "Jugadores Actuales",
  jugadores_leyendas: "Jugadores Leyendas",
  clubes: "Clubes",
  jugadores_argentinos: "Fútbol Argentino",
  equipos_historicos: "Equipos Históricos",
  mundiales: "Mundiales",
};

export default function AdminClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<SubjectsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newItems, setNewItems] = useState<Record<keyof SubjectsData, string>>({
    jugadores_actuales: "",
    jugadores_leyendas: "",
    clubes: "",
    jugadores_argentinos: "",
    equipos_historicos: "",
    mundiales: "",
  });

  const handleAuthenticate = async (key: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey: key }),
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setIsAuthenticated(true);
        toast.success("Acceso concedido");
      } else {
        toast.error("Clave de administrador inválida");
        router.push("/");
      }
    } catch (error) {
      logger.error("Error:", error);
      toast.error("Error al autenticar");
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const key = searchParams.get("key");
    if (key) {
      setAdminKey(key);
      handleAuthenticate(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleAddItem = (category: keyof SubjectsData) => {
    const newItem = newItems[category].trim();
    if (!newItem) {
      toast.error("El campo no puede estar vacío");
      return;
    }

    if (data && data[category].includes(newItem)) {
      toast.error("Este elemento ya existe");
      return;
    }

    if (data) {
      setData({
        ...data,
        [category]: [...data[category], newItem],
      });
      setNewItems({ ...newItems, [category]: "" });
      toast.success("Elemento agregado");
    }
  };

  const handleRemoveItem = (category: keyof SubjectsData, index: number) => {
    if (data) {
      const updatedCategory = data[category].filter((_, i) => i !== index);
      setData({
        ...data,
        [category]: updatedCategory,
      });
      toast.success("Elemento eliminado");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/subjects/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey, data }),
      });

      if (response.ok) {
        toast.success("Datos guardados correctamente");
      } else {
        const error = await response.json();
        toast.error(error.error || "Error al guardar");
      }
    } catch (error) {
      logger.error("Error:", error);
      toast.error("Error al guardar los datos");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 animate-pulse" />
          <p className="text-lg">Autenticando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !data) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Lock className="w-6 h-6" />
              Acceso Restringido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Esta página requiere una clave de acceso válida en la URL
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="max-w-7xl w-full mx-auto space-y-6">
      <CardHeader className="flex flex-col md:flex-row items-center justify-between">
        <CardTitle className="text-2xl">Panel de Administración</CardTitle>

        <Button onClick={handleSave} disabled={isSaving} size="lg">
          <Save size={16} />
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </CardHeader>

      <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(Object.keys(data) as Array<keyof SubjectsData>).map((category) => (
          <div key={category}>
            <div>
              <h2>{CATEGORY_LABELS[category]}</h2>
              <p className="text-sm text-muted-foreground">
                {data[category].length} elementos
              </p>
            </div>
            <div className="space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddItem(category);
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Agregar nuevo..."
                  value={newItems[category]}
                  onChange={(e) =>
                    setNewItems({ ...newItems, [category]: e.target.value })
                  }
                />
                <Button type="submit" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </form>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {data[category].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-secondary rounded-md"
                  >
                    <span className="text-sm">{item}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(category, index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
