import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "subjects.json");

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading subjects data:", error);
    return NextResponse.json(
      { error: "Error al leer los datos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { adminKey } = await request.json();
    
    // Validar clave de administrador
    const validKey = process.env.ADMIN_KEY || "impostor-admin-2026";
    if (adminKey !== validKey) {
      return NextResponse.json(
        { error: "Clave de administrador inválida" },
        { status: 401 }
      );
    }

    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading subjects data:", error);
    return NextResponse.json(
      { error: "Error al leer los datos" },
      { status: 500 }
    );
  }
}
