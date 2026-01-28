# Guía de Deploy con Railway CLI

## 🚂 Railway CLI - Deploy sin OAuth

### 1. Instalar Railway CLI

```bash
# Windows (con npm)
npm install -g @railway/cli

# O con PowerShell (scoop)
scoop install railway
```

### 2. Login con Railway CLI

```bash
railway login
```
Esto abrirá el navegador para autenticarte (método diferente a OAuth de GitHub)

### 3. Inicializar proyecto

```bash
# Desde la raíz del proyecto
railway init
```

### 4. Deploy

```bash
railway up
```

### 5. Configurar variables de entorno

```bash
railway variables set NODE_ENV=production
railway variables set HOSTNAME=0.0.0.0
```

### 6. Obtener dominio

```bash
railway domain
```

El CLI te dará una URL pública automáticamente.

### 7. Ver logs

```bash
railway logs
```

---

## Comandos útiles

```bash
# Ver estado
railway status

# Abrir en navegador
railway open

# Ver variables
railway variables

# Conectar a producción
railway link
```

## ✅ Ventajas del CLI
- No necesita OAuth de GitHub
- Deploy más rápido
- Control total desde terminal
- Logs en tiempo real
