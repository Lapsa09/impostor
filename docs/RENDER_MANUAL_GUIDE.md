# Deploy en Render.com - Método Manual

## 🎨 Render - Alternativa sin OAuth

Si Railway OAuth falla, Render.com es excelente alternativa.

### Paso 1: Crear cuenta en Render

1. Ve a [render.com](https://render.com)
2. Sign up con email (no requiere GitHub OAuth inmediatamente)

### Paso 2: Conectar GitHub

1. En Render dashboard → "New +"
2. "Web Service"
3. "Connect GitHub" (sistema OAuth diferente de Railway)
4. Si falla, usa **método manual** (ver abajo)

### Método Manual (Sin GitHub):

#### A) Deploy desde GitHub público

1. Tu repo debe ser público en GitHub
2. En Render: "Public Git repository"
3. Pega la URL: `https://github.com/Lapsa09/impostor`
4. Configurar:
   ```
   Name: impostor-futbolero
   Runtime: Node
   Build Command: pnpm install && pnpm run build
   Start Command: pnpm start
   ```

#### B) Variables de Entorno

En Render dashboard → Environment:
```
NODE_ENV = production
HOSTNAME = 0.0.0.0
ALLOWED_ORIGINS = https://impostor-futbolero.onrender.com
```

#### C) Deploy

Click "Create Web Service" y espera 3-5 minutos.

### Paso 3: Actualizar ALLOWED_ORIGINS

Una vez deployed, copia tu URL de Render y actualiza:

1. En Render → Environment
2. Editar `ALLOWED_ORIGINS`
3. Poner tu dominio real: `https://tu-app.onrender.com`
4. Hacer re-deploy

## ⚠️ Nota sobre Render Free Plan

- El servicio "duerme" después de 15 minutos de inactividad
- Primera request después de dormir tarda ~30-60 segundos
- Upgrade a $7/mes elimina el sleep

## ✅ Verificar deployment

```bash
curl https://tu-app.onrender.com
```

## 🔍 Ver logs

Render dashboard → Logs (en tiempo real)
