# 🆘 Solución Rápida - Error OAuth Railway

## ❌ Error: "Problem completing OAuth login"

### ✅ SOLUCIÓN RÁPIDA: Usa Railway CLI

En lugar de conectar GitHub con OAuth, usa el CLI:

#### Windows (PowerShell/CMD):
```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. O ejecutar script automático
railway-deploy.bat
```

#### Linux/Mac:
```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. O ejecutar script automático
bash railway-deploy.sh
```

### 📋 Pasos Manuales

```bash
# 1. Login (abre navegador)
railway login

# 2. Inicializar
railway init

# 3. Deploy
railway up

# 4. Variables de entorno
railway variables set NODE_ENV=production
railway variables set HOSTNAME=0.0.0.0

# 5. Ver dominio
railway domain

# 6. Actualizar CORS (copia tu dominio del paso 5)
railway variables set ALLOWED_ORIGINS=https://tu-dominio.railway.app
```

### 🎯 Alternativa: Render.com

Si Railway no funciona, usa Render (más fácil que OAuth):

1. Ve a [render.com](https://render.com)
2. "New Web Service"
3. "Public Git repository"
4. Pega: `https://github.com/Lapsa09/impostor`
5. Configure:
   - Build: `pnpm install && pnpm run build`
   - Start: `pnpm start`
6. Deploy

Ver: `RENDER_MANUAL_GUIDE.md`

### 🔍 ¿Por qué falla OAuth?

1. **Cookies bloqueadas** - Navegador bloquea cookies de terceros
2. **Ad-blockers** - Extensiones bloquean OAuth
3. **Sesión GitHub expirada** - Necesitas hacer logout/login en GitHub

### 🛠️ Intentar arreglar OAuth (opcional)

```bash
# 1. Borrar caché de navegador (Ctrl + Shift + Delete)
# 2. Modo incógnito (Ctrl + Shift + N)
# 3. Desactivar ad-blockers
# 4. Probar otro navegador
```

### 💡 Recomendación

**Usa Railway CLI** - Es más rápido y confiable que OAuth.

---

**¿Necesitas ayuda?** Revisa los archivos:
- `RAILWAY_CLI_GUIDE.md` - Guía completa Railway CLI
- `RENDER_MANUAL_GUIDE.md` - Alternativa Render
- `OAUTH_TROUBLESHOOTING.md` - Más soluciones
