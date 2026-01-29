# 📚 Documentación - Impostor Futbolero

Bienvenido a la documentación de Impostor Futbolero. Aquí encontrarás guías detalladas para deployment, administración y troubleshooting.

## 📋 Índice

### 🤖 CI/CD & Automatización

- **[GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md)** - Sistema de integración continua y deploy automático con GitHub Actions

### 🚀 Deployment

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía principal de deployment con múltiples opciones (Railway, Render, Docker)
- **[RAILWAY_CLI_GUIDE.md](./RAILWAY_CLI_GUIDE.md)** - Guía paso a paso para deploy usando Railway CLI
- **[RENDER_MANUAL_GUIDE.md](./RENDER_MANUAL_GUIDE.md)** - Alternativa de deployment en Render.com

### 🔧 Troubleshooting

- **[OAUTH_TROUBLESHOOTING.md](./OAUTH_TROUBLESHOOTING.md)** - Soluciones completas para errores de OAuth en Railway
- **[QUICK_FIX_OAUTH.md](./QUICK_FIX_OAUTH.md)** - Solución rápida para el error de OAuth

### 🔐 Administración

- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** - Guía completa del panel de administración para gestionar jugadores, equipos y mundiales

---

## 🚀 Deployment - Resumen Rápido

### Opción 1: Railway CLI (Recomendado)

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init

# Configurar variables de entorno
railway variables set ALLOWED_ORIGINS=https://tu-dominio.railway.app

# Deploy
railway up
```

📖 Guía completa: [RAILWAY_CLI_GUIDE.md](./RAILWAY_CLI_GUIDE.md)

### Opción 2: Render.com

1. Conecta tu repositorio en Render.com
2. Configura las variables de entorno
3. Deploy automático

📖 Guía completa: [RENDER_MANUAL_GUIDE.md](./RENDER_MANUAL_GUIDE.md)

### Opción 3: Docker

```bash
docker build -t impostor-futbolero .
docker run -p 3000:3000 impostor-futbolero
```

📖 Guía completa: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔐 Panel de Administración

### Acceso Rápido

1. Configura `ADMIN_KEY` en tu archivo `.env`
2. Accede a: `https://tu-dominio.com/admin?key=tu-clave-secreta`

### Funcionalidades

- ✅ Agregar/eliminar jugadores actuales
- ✅ Agregar/eliminar jugadores leyendas
- ✅ Agregar/eliminar clubes
- ✅ Agregar/eliminar jugadores argentinos
- ✅ Agregar/eliminar equipos históricos
- ✅ Agregar/eliminar mundiales

📖 Guía completa: [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

---

## 🐛 Problemas Comunes

### Error: "Problem completing OAuth login" en Railway

**Solución rápida:** Usa Railway CLI en lugar de la integración de GitHub

```bash
railway login
railway up
```

📖 Más detalles: [QUICK_FIX_OAUTH.md](./QUICK_FIX_OAUTH.md) | [OAUTH_TROUBLESHOOTING.md](./OAUTH_TROUBLESHOOTING.md)

### Error: "Cannot find module '@/lib/game-utils'"

**Solución:** Asegúrate de compilar con `tsc-alias`

```bash
pnpm add -D tsc-alias
```

El script de build debe incluir: `tsc --project tsconfig.server.json && tsc-alias -p tsconfig.server.json`

---

## 📞 Soporte

Si encuentras algún problema no documentado aquí:

1. Revisa la [guía de troubleshooting](./OAUTH_TROUBLESHOOTING.md)
2. Verifica las variables de entorno en `.env.example`
3. Consulta los logs de tu plataforma de hosting

---

## 🔄 Actualizaciones

Esta documentación se actualiza regularmente. Última actualización: Enero 2026

**Volver al [README principal](../README.md)**
