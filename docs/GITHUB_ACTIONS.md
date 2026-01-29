# 🚀 GitHub Actions CI/CD

Este proyecto usa GitHub Actions para automatizar el proceso de build, testing y deploy.

## 📋 Workflows Disponibles

### 1. CI - Build & Test (`ci.yml`)

**Se ejecuta en:**
- Push a `main` o `develop`
- Pull Requests a `main` o `develop`

**Pasos:**
1. ✅ Checkout del código
2. 📦 Instala dependencias con pnpm
3. 🔍 Ejecuta ESLint (continúa aunque falle)
4. 🔧 Inicializa `subjects.json` desde el template
5. 🏗️ Compila la aplicación (Next.js + TypeScript)
6. ✅ Confirma que todo funcionó

### 2. Deploy to Railway (`deploy.yml`)

**Se ejecuta en:**
- Push a `main` (automático)
- Manualmente desde GitHub Actions tab

**Pasos:**
1. ✅ Ejecuta todos los pasos del CI
2. 🚂 Instala Railway CLI
3. 🚀 Deploy automático a Railway
4. ✅ Confirma deployment exitoso

## ⚙️ Configuración Requerida

### Secrets en GitHub

Ve a tu repositorio → Settings → Secrets and variables → Actions → New repository secret

**📖 [Guía detallada de configuración de secrets](./GITHUB_SECRETS_SETUP.md)**

Necesitas configurar estos secrets:

#### 1. `RAILWAY_TOKEN` (Requerido para deploy)

```bash
# En tu terminal local
railway login
railway whoami --token
```

Copia el token y agrégalo como secret en GitHub con el nombre `RAILWAY_TOKEN`.

#### 2. `ADMIN_KEY` (Opcional pero recomendado)

El password para acceder al panel de admin. Si no lo configuras, el CI usará `test-key-for-ci` solo para testing.

```
ADMIN_KEY=tu-password-super-secreto
```

#### 3. `RAILWAY_SERVICE_ID` (Opcional)

Si tienes múltiples servicios en Railway:

```bash
railway service list
```

Agrega el ID del servicio como secret. Si no lo configuras, usará el nombre `impostor` por defecto.

## 🔄 Flujo de Trabajo Recomendado

### Desarrollo Normal:

```bash
# 1. Trabajas en tu rama
git checkout -b feature/nueva-caracteristica

# 2. Haces commits normales
git add .
git commit -m "feat: nueva característica"

# 3. Push a tu rama
git push origin feature/nueva-caracteristica

# 4. Creas Pull Request en GitHub
# → GitHub Actions ejecuta el CI automáticamente
# → Ves los resultados en el PR

# 5. Cuando el CI pasa y apruebas el PR
git checkout main
git merge feature/nueva-caracteristica
git push origin main

# → GitHub Actions hace deploy automático a Railway! 🚀
```

### Deploy Manual (si es necesario):

1. Ve a tu repositorio en GitHub
2. Click en "Actions" tab
3. Selecciona "Deploy to Railway" en el sidebar
4. Click en "Run workflow" → "Run workflow"
5. Espera a que termine (~2-3 minutos)

## 📊 Ver Logs de CI/CD

1. Ve a tu repositorio en GitHub
2. Click en "Actions" tab
3. Verás todos los workflows ejecutados
4. Click en cualquiera para ver logs detallados

## 🆚 Comparación: Antes vs Ahora

### Antes (Manual):
```bash
# En tu computadora local
pnpm run build
railway up
# O deploy manual en Render
```

❌ Cada dev debe recordar hacer build
❌ No hay validación automática
❌ Errores solo se ven en producción
❌ No hay historial de deployments

### Ahora (Automatizado):
```bash
# Solo haces
git push origin main
```

✅ Build automático en cada push
✅ Validación antes de merge (en PRs)
✅ Errores detectados antes de producción
✅ Historial completo en GitHub Actions
✅ Deploy automático a Railway
✅ Rollback fácil (solo revertir commit)

## 🔧 Desarrollo Local

Para desarrollo local, nada cambia:

```bash
# Sigue funcionando igual
pnpm run dev

# Build local si necesitas
pnpm run build
```

El CI/CD solo se activa en GitHub, no afecta tu workflow local.

## 🐛 Troubleshooting

### "Error: RAILWAY_TOKEN not found"

Solución: Configura el secret `RAILWAY_TOKEN` en GitHub (ver arriba).

### "Error: subjects.json.example not found"

Solución: Asegúrate de que `data/subjects.json.example` existe en el repositorio.

### "Build failed" en el CI

1. Ve a Actions → Click en el workflow fallido
2. Expande los pasos para ver el error exacto
3. Corrige el error localmente
4. Haz commit y push nuevamente

### Deploy funciona en CI pero falla en Railway

Verifica que las variables de entorno estén configuradas en Railway:

```bash
railway variables
# Debe incluir: ADMIN_KEY
```

## 📚 Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Railway Docs](https://docs.railway.app/)
- [pnpm CI/CD](https://pnpm.io/continuous-integration)

## 🎯 Próximos Pasos (Opcional)

Podrías agregar:
- 🧪 Tests unitarios (Jest, Vitest)
- 🎨 Screenshot testing con Playwright
- 📊 Code coverage reports
- 🏷️ Versioning automático con tags
- 🔔 Notificaciones de Slack/Discord cuando hay deploy
- 🌍 Deploy a staging environment antes de producción
