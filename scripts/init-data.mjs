import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'subjects.json');
const EXAMPLE_FILE = path.join(DATA_DIR, 'subjects.json.example');

console.log('🔧 Inicializando datos...');

// Verificar si subjects.json ya existe
if (fs.existsSync(DATA_FILE)) {
  console.log('✅ subjects.json ya existe, no se sobrescribirá');
  process.exit(0);
}

// Verificar que existe el archivo de ejemplo
if (!fs.existsSync(EXAMPLE_FILE)) {
  console.error('❌ Error: subjects.json.example no encontrado');
  process.exit(1);
}

// Copiar el archivo de ejemplo
try {
  fs.copyFileSync(EXAMPLE_FILE, DATA_FILE);
  console.log('✅ subjects.json creado exitosamente desde subjects.json.example');
  process.exit(0);
} catch (error) {
  console.error('❌ Error al crear subjects.json:', error.message);
  process.exit(1);
}
