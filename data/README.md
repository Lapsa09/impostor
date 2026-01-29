# Data Directory

Esta carpeta contiene la base de datos en formato JSON para el juego Impostor Futbolero.

## 📁 Archivos

### `subjects.json` (NO versionado)

- **Propósito:** Archivo activo que usa la aplicación
- **Estado Git:** Ignorado (está en `.gitignore`)
- **Modificable:** Sí, a través del panel de administración o editando manualmente
- **Creación:** Se genera automáticamente desde `subjects.json.example` si no existe

### `subjects.json.example` (Versionado)

- **Propósito:** Plantilla con datos por defecto
- **Estado Git:** Versionado en el repositorio
- **Modificable:** Solo al actualizar la versión base
- **Uso:** Se copia a `subjects.json` en nuevas instalaciones

## 🔄 Flujo de Trabajo

### Primera Instalación / Deploy:

1. El repositorio incluye solo `subjects.json.example`
2. **Durante el CI/CD**, GitHub Actions ejecuta `build:ci` que inicializa y compila
3. Si `subjects.json` ya existe, el script no lo sobrescribe
4. Los cambios que hagas se guardan en `subjects.json`
5. `subjects.json` nunca se sube a Git (está en `.gitignore`)

### Desarrollo Local:

```bash
# Primera vez - copia el archivo manualmente
cp data/subjects.json.example data/subjects.json

# O usa el comando de build completo
pnpm run build:ci

# Para desarrollo normal
pnpm run dev

# Build local (sin inicializar datos)
pnpm run build
```

### Deploy en Producción:

1. El proceso de build crea automáticamente `subjects.json`
2. En deploys posteriores, si `subjects.json` ya existe, no se sobrescribe
3. Tus cambios persisten entre deploys

### Actualizar Datos Base:

Si quieres actualizar los datos por defecto para todos:

1. Modifica `subjects.json.example`
2. Haz commit del cambio
3. Los nuevos deploys usarán estos datos actualizados
4. Las instalaciones existentes mantienen su `subjects.json` personalizado

## 🎯 Beneficios de Este Sistema

✅ **No hay conflictos de Git**: Tus cambios locales no interfieren con el repositorio

✅ **Datos personalizables**: Cada instancia puede tener sus propios datos

✅ **Fácil reset**: Si quieres volver a los datos originales, borra `subjects.json` y reinicia

✅ **Deployment simple**: No requiere configuración adicional

## 📝 Estructura de Datos

```json
{
  "jugadores_actuales": ["Jugador 1", "Jugador 2", ...],
  "jugadores_leyendas": ["Leyenda 1", "Leyenda 2", ...],
  "clubes": ["Club 1", "Club 2", ...],
  "jugadores_argentinos": ["Argentino 1", "Argentino 2", ...],
  "equipos_historicos": ["Equipo Año", "Equipo Año", ...],
  "mundiales": ["Mundial XXXX", "Mundial XXXX", ...]
}
```

Cada categoría es un array de strings.

## 🔧 Solución de Problemas

### El archivo no se crea automáticamente

**Solución:**

```bash
cd data
cp subjects.json.example subjects.json
```

### Quiero restaurar los datos originales

**Solución:**

```bash
cd data
rm subjects.json
# Reinicia la app y se creará automáticamente desde el ejemplo
```

### Quiero hacer backup de mis cambios

**Solución:**

```bash
# Copia el archivo fuera del proyecto
cp data/subjects.json ~/backup-subjects-$(date +%Y%m%d).json

# O súbelo a otro servicio (Drive, Dropbox, etc.)
```

---

Para más información sobre el panel de administración, consulta: [`docs/ADMIN_GUIDE.md`](../docs/ADMIN_GUIDE.md)
