import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Configuración del segmento de ruta
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "subjects.json");

export async function PUT(request: NextRequest) {
  try {
    const { adminKey, data } = await request.json();

    // Validar clave de administrador
    const validKey = process.env.ADMIN_KEY || "impostor-admin-2026";
    if (adminKey !== validKey) {
      return NextResponse.json(
        { error: "Clave de administrador inválida" },
        { status: 401 },
      );
    }

    // Validar estructura de datos
    const requiredKeys = [
      "jugadores_actuales",
      "jugadores_leyendas",
      "clubes",
      "jugadores_argentinos",
      "equipos_historicos",
      "mundiales",
    ];

    for (const key of requiredKeys) {
      if (!Array.isArray(data[key])) {
        return NextResponse.json(
          { error: `Campo inválido: ${key}` },
          { status: 400 },
        );
      }
    }

    // Guardar datos
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Datos guardados correctamente",
    });
  } catch (error) {
    console.error("Error saving subjects data:", error);
    return NextResponse.json(
      { error: "Error al guardar los datos" },
      { status: 500 },
    );
  }
}
