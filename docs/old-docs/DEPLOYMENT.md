# 🎮 Impostor Futbolero - Deployment Guide

## ⚠️ Problema con OAuth de Railway?

**Si tienes problemas conectando GitHub a Railway**, revisa estos archivos:
- � `RAILWAY_CLI_GUIDE.md` - Deploy con Railway CLI (sin OAuth)
- 📗 `RENDER_MANUAL_GUIDE.md` - Deploy en Render.com
- 📙 `OAUTH_TROUBLESHOOTING.md` - Soluciones al error OAuth

---

## �🚀 Opciones de Deployment

### Opción 1A: Railway CLI (Sin OAuth - MÁS FÁCIL)

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login (abre navegador)
railway login

# 3. Inicializar proyecto
railway init

# 4. Deploy
railway up

# 5. Configurar variables
railway variables set NODE_ENV=production
railway variables set HOSTNAME=0.0.0.0

# 6. Ver tu URL
railway domain
```

**Ver guía completa:** `RAILWAY_CLI_GUIDE.md`

### Opción 1B: Railway desde GitHub (Con OAuth)

1. Crear cuenta en [Railway.app](https://railway.app)
2. Conectar tu repositorio de GitHub
3. Configurar variables de entorno:
   ```
   NODE_ENV=production
   PORT=3000
   ALLOWED_ORIGINS=https://tu-dominio.railway.app
   ```
4. Deploy automático en cada push

**Pros:**
- ✅ Setup en 2 minutos
- ✅ WebSockets funcionan nativamente
- ✅ SSL gratis
- ✅ $5 de crédito gratis al mes

### Opción 2: Render (Sin problemas OAuth)

1. Crear cuenta en [Render.com](https://render.com)
2. Crear nuevo Web Service desde GitHub
3. Configurar:
   - Build Command: `pnpm install && pnpm run build`
   - Start Command: `pnpm start`
4. Variables de entorno:
   ```
   NODE_ENV=production
   ALLOWED_ORIGINS=https://tu-dominio.onrender.com
   ```

**Pros:**
- ✅ Plan gratuito disponible
- ✅ WebSockets soportados
- ✅ SSL gratis

**Contras:**
- ⚠️ Sleep en plan gratuito (inactividad de 15 min)

### Opción 3: Docker (Cualquier plataforma)

```bash
# Build
docker build -t impostor-futbolero .

# Run
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e ALLOWED_ORIGINS=https://tu-dominio.com \
  impostor-futbolero
```

## 🔧 Variables de Entorno Necesarias

```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
ALLOWED_ORIGINS=https://tu-dominio.com,https://www.tu-dominio.com
```

## 📋 Checklist Pre-Deployment

- [x] Next.config con output: 'standalone'
- [x] CORS configurado con dominios permitidos
- [x] Server.ts escuchando en 0.0.0.0
- [x] Puerto dinámico desde variables de entorno
- [x] Scripts de build y start configurados
- [x] Dockerfile optimizado para producción

## 🎯 Pasos para Railway (Método Recomendado)

1. **Push tu código a GitHub**
   ```bash
   git add .
   git commit -m "ready for deployment"
   git push origin main
   ```

2. **Ir a Railway**
   - Acceder a [railway.app](https://railway.app)
   - "Start a New Project" → "Deploy from GitHub repo"
   - Seleccionar tu repositorio

3. **Configurar Variables**
   - En el dashboard del proyecto
   - Ir a "Variables"
   - Agregar:
     ```
     ALLOWED_ORIGINS = ${{RAILWAY_PUBLIC_DOMAIN}}
     ```

4. **Deploy**
   - Railway detectará automáticamente el `railway.json`
   - El build iniciará automáticamente
   - Obtendrás una URL pública en ~2 minutos

## 🌐 Después del Deploy

1. **Actualizar ALLOWED_ORIGINS**
   - Copiar tu URL de Railway/Render
   - Actualizar la variable de entorno con tu dominio real
   - Ejemplo: `https://impostor-futbolero-production.up.railway.app`

2. **Probar WebSockets**
   - Crear una sala
   - Abrir en otra pestaña/dispositivo
   - Verificar sincronización en tiempo real

3. **Dominio Personalizado (Opcional)**
   - Railway/Render permiten agregar dominio custom
   - Configurar DNS apuntando al servicio
   - SSL se configura automáticamente

## 🐛 Troubleshooting

### WebSockets no conectan
- Verificar ALLOWED_ORIGINS incluye el dominio correcto
- Verificar que el protocolo sea `wss://` en producción

### Build falla
```bash
# Probar build localmente
pnpm run build
pnpm start
```

### Puerto no escucha
- Verificar que `HOSTNAME=0.0.0.0` esté configurado
- Railway/Render automáticamente asignan PORT

## 📊 Monitoreo

Railway y Render incluyen:
- Logs en tiempo real
- Métricas de uso
- Alertas de caídas
- Reinicio automático

## 💰 Costos Estimados

| Plataforma | Plan Gratuito | Plan Pagado |
|------------|---------------|-------------|
| Railway    | $5 crédito/mes | $5/mes base + uso |
| Render     | ✅ Sí (con sleep) | $7/mes |
| Docker     | Depende del host | Variable |

## 🎮 ¡Listo para jugar!

Una vez deployado, comparte tu URL:
```
https://tu-impostor-futbolero.railway.app
```

---

**Creado con ⚽ para los amantes del fútbol**
