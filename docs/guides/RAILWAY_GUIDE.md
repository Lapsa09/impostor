# 🚂 Railway Deployment Quick Guide

Guía rápida para desplegar **Impostor Futbolero** en Railway.

---

## ✅ Por qué Railway es perfecto para este proyecto

- ✅ **Soporte nativo de WebSockets** (crítico para Socket.io)
- ✅ **Dockerfile support** out of the box
- ✅ **Deploy automático** desde GitHub
- ✅ **Variables de entorno** fáciles de configurar
- ✅ **Logs en tiempo real**
- ✅ **Métricas incluidas** (CPU, RAM, Network, WebSockets)
- ✅ **Escalado automático** (opcional)

---

## 🚀 Deployment en 5 Pasos

### 1. Preparar el Proyecto

```bash
# Asegúrate de tener todos los archivos actualizados
git add .
git commit -m "Preparado para Railway deployment"
git push origin main
```

**Verifica que tengas:**
- ✅ `Dockerfile` en la raíz
- ✅ `.env.example` (no subas `.env` o `.env.local`)
- ✅ `railway.json` configurado
- ✅ `.gitignore` con `.env*`

---

### 2. Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Login con GitHub
3. Click en **"New Project"**
4. Selecciona **"Deploy from GitHub repo"**
5. Elige el repositorio `impostor`
6. Railway detectará el `Dockerfile` automáticamente

---

### 3. Configurar Variables de Entorno

En Railway Dashboard → Tu proyecto → Variables, agrega:

```bash
ADMIN_KEY=tu-clave-super-secreta-produccion
ALLOWED_ORIGINS=https://impostor-production.up.railway.app
NEXT_PUBLIC_BASE_URL=https://impostor-production.up.railway.app
NODE_ENV=production
```

**⚠️ Importante:**
- NO necesitas configurar `PORT` - Railway lo asigna automáticamente
- Cambia `ADMIN_KEY` por una clave segura diferente a la de desarrollo
- Después de configurar, Railway redesplegará automáticamente

---

### 4. Verificar Deployment

Railway desplegará automáticamente. Puedes ver el progreso en:
- **View Logs** - Ver logs de build y runtime
- **Deployments** - Historial de deploys

**Tiempo estimado:** 5-10 minutos

---

### 5. Testing Post-Deploy

Una vez desplegado, verifica:

```bash
# URL principal
https://tu-app.up.railway.app

# SEO files
https://tu-app.up.railway.app/robots.txt
https://tu-app.up.railway.app/sitemap.xml
```

**Tests críticos:**
- [ ] La app carga correctamente
- [ ] **WebSockets conectan** (crear/unirse a sala)
- [ ] Socket.io funciona sin errores
- [ ] Admin panel requiere autenticación
- [ ] Compartir link funciona
- [ ] No hay console.logs en browser console

---

## 🔧 Configuración Avanzada

### Dominio Personalizado

1. Railway Dashboard → Settings → Domains
2. Click en **"Generate Domain"** (gratuito: `*.up.railway.app`)
3. O agrega tu **dominio personalizado**

**Si usas dominio personalizado:**
```bash
# Actualiza estas variables en Railway:
ALLOWED_ORIGINS=https://tu-dominio.com
NEXT_PUBLIC_BASE_URL=https://tu-dominio.com
```

---

### Monitoreo y Logs

Railway incluye dashboards con:

**Métricas en tiempo real:**
- CPU usage
- Memory usage
- Network traffic
- **Active WebSocket connections**

**Logs:**
```bash
# Ver logs en Railway Dashboard
- Build logs (durante deploy)
- Application logs (runtime)
- WebSocket connection logs
```

---

### Redeploys

**Deploy automático (recomendado):**
```bash
# Push a GitHub
git push origin main
# Railway despliega automáticamente
```

**Deploy manual:**
- Railway Dashboard → Deployments → Redeploy

**Rollback:**
- Railway Dashboard → Deployments → Click en deploy anterior → Rollback

---

## 🐛 Troubleshooting

### WebSockets no conectan

**Problema:** Socket.io no conecta en producción

**Solución:**
1. Verifica `ALLOWED_ORIGINS` incluya tu dominio de Railway
2. Revisa logs: Railway Dashboard → View Logs
3. Verifica que el cliente use la URL correcta

```typescript
// lib/socket.ts - Ya configurado correctamente
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000",
];
```

---

### Variables no se aplican

**Problema:** Cambios en variables de entorno no se reflejan

**Solución:**
1. Railway Dashboard → Variables → Verifica valores
2. Después de cambiar variables, Railway redespliega automáticamente
3. Espera 2-3 minutos
4. Si persiste, haz un redeploy manual

---

### Port Error

**Problema:** App no responde en el puerto correcto

**Solución:**
```typescript
// server.ts - Debe usar process.env.PORT
const PORT = process.env.PORT || 3000;
```

Railway asigna el puerto automáticamente - NO lo configures en variables.

---

### Build Failures

**Problema:** Build falla en Railway

**Solución:**
1. Revisa Build Logs en Railway
2. Verifica que `Dockerfile` esté correcto
3. Asegúrate que `data/subjects.json` exista o se genere en build
4. Verifica que `pnpm-lock.yaml` esté committeado

```bash
# Localmente prueba el build:
pnpm build:ci
```

---

## 📊 Comparación: Railway vs Otras Plataformas

| Característica | Railway | Vercel | Render |
|----------------|---------|--------|--------|
| WebSockets | ✅ Nativo | ❌ No soportado | ✅ Sí |
| Dockerfile | ✅ Sí | ❌ No | ✅ Sí |
| Server Custom | ✅ Sí | ⚠️ Limitado | ✅ Sí |
| Socket.io | ✅ Perfecto | ❌ No funciona | ✅ Funciona |
| Auto-deploy | ✅ Sí | ✅ Sí | ✅ Sí |
| Free Tier | ✅ $5 crédito | ✅ Hobby | ✅ Limitado |
| Métricas | ✅ Incluidas | ✅ Incluidas | ⚠️ Básicas |

**Para este proyecto:** Railway es la mejor opción por Socket.io ✅

---

## 💡 Tips y Best Practices

### 1. Variables de Entorno
```bash
# Desarrollo (local)
cp .env.example .env.local

# Producción (Railway)
# Configura en Railway Dashboard
# NUNCA subas .env al repo
```

### 2. Logs
```bash
# Railway guarda logs por 7 días (free tier)
# Para logs permanentes, considera un servicio externo
```

### 3. Monitoring
```bash
# Railway Dashboard muestra:
- CPU/RAM usage
- Network traffic
- WebSocket connections activas
- Response times
```

### 4. Costos
```bash
# Free tier: $5 USD de crédito mensual
# Suficiente para:
- Apps pequeñas/medianas
- Testing y desarrollo
- ~500-1000 usuarios activos
```

---

## 🔗 Enlaces Útiles

- [Railway Dashboard](https://railway.app/dashboard)
- [Railway Docs](https://docs.railway.app/)
- [Railway CLI](https://docs.railway.app/develop/cli)
- [WebSocket Guide](https://docs.railway.app/guides/websockets)
- [Environment Variables](https://docs.railway.app/develop/variables)

---

## ✅ Checklist Post-Deploy

- [ ] App desplegada exitosamente
- [ ] Variables de entorno configuradas
- [ ] WebSockets funcionando
- [ ] Socket.io conecta sin errores
- [ ] Logs muestran app saludable
- [ ] Dominio configurado (opcional)
- [ ] Testing completo realizado
- [ ] Sin console.logs en producción
- [ ] Error tracking configurado (opcional)

---

## 🎉 ¡Listo para Producción!

Tu app **Impostor Futbolero** está ahora desplegada en Railway con:

✅ WebSockets funcionando perfectamente  
✅ Socket.io optimizado  
✅ Deploys automáticos  
✅ Logs y métricas en tiempo real  
✅ Escalabilidad automática  

**¡Disfruta tu app en producción!** 🚀

---

_Última actualización: 6 de febrero de 2026_
