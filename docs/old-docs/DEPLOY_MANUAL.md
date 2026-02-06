# 🚀 Deploy Manual - Impostor Futbolero

## ⚠️ Estado Actual

El deploy automático a Railway está **temporalmente desactivado** debido a limitaciones con tokens de API.

### Razón:

- Railway requiere verificación de cuenta para crear Project Tokens
- La verificación requiere OAuth de GitHub (actualmente con problemas)
- El token de sesión local no funciona para CI/CD

## ✅ CI/CD Funcionando

GitHub Actions **SÍ** está ejecutando:

- ✅ Build automático en cada push
- ✅ Validación de código (ESLint)
- ✅ Type checking (TypeScript)
- ✅ Inicialización de datos

## 🎯 Cómo Hacer Deploy

### Método 1: Railway CLI (Recomendado)

```bash
# Desde tu computadora local
railway up
```

**Ventajas:**

- ⚡ Rápido (1 comando)
- ✅ Ya configurado en tu proyecto
- 🔐 Usa tu autenticación existente

### Método 2: Git Push a Railway

Si configuraste el Git remote de Railway:

```bash
git push railway main
```

### Método 3: Railway Dashboard

1. Ve a: https://railway.app/project/9a066a2c-c545-41d7-8a87-7dfa48538cce
2. Click en tu servicio "impostor"
3. Click en "Deploy" → "Redeploy"

## 🔄 Workflow Recomendado

```bash
# 1. Desarrolla tu feature
git add .
git commit -m "feat: nueva funcionalidad"

# 2. Push a GitHub (activa CI automático)
git push origin main
# → GitHub Actions valida el código ✅

# 3. Espera a que el CI pase en GitHub Actions
# → Ve a: https://github.com/Lapsa09/impostor/actions

# 4. Deploy manual a Railway
railway up
# → Deploy a producción 🚀
```

## 📊 Comparación

| Acción             | Automático        | Manual          |
| ------------------ | ----------------- | --------------- |
| Build & Validación | ✅ GitHub Actions | ❌              |
| Type Checking      | ✅ GitHub Actions | ❌              |
| ESLint             | ✅ GitHub Actions | ❌              |
| Deploy a Railway   | ❌ (OAuth issue)  | ✅ `railway up` |

## 🔮 Futuro: Activar Deploy Automático

Una vez que se resuelva el problema de OAuth:

### Opción A: Verificar cuenta de Railway

1. Intenta en modo incógnito: https://railway.app/account/tokens
2. O usa otro navegador
3. Crea un Project Token
4. Actualiza el secret `RAILWAY_TOKEN` en GitHub
5. Reactiva el workflow (descomentar `push: branches: [main]`)

### Opción B: Alternativa con Render.com

Si Railway OAuth sigue sin funcionar, considera migrar a Render.com:

- No requiere tokens complejos
- Deploy desde GitHub directo
- Ver: `docs/RENDER_MANUAL_GUIDE.md`

## 💡 Ventajas del Setup Actual

Aunque el deploy no sea automático, **aún tienes muchos beneficios**:

✅ **Validación Pre-Deploy**

- GitHub Actions detecta errores antes de que lleguen a producción
- No puedes hacer deploy de código roto (CI debe pasar primero)

✅ **Historial de Builds**

- Todos los builds registrados en GitHub
- Fácil ver cuándo algo se rompió

✅ **Colaboración**

- Pull Requests se validan automáticamente
- Code review con CI integrado

✅ **Deploy Rápido**

- Un comando: `railway up`
- Mismo resultado que deploy automático

## 📚 Documentación

- **[CI Workflow](../CICD_SETUP_SUMMARY.md)** - Resumen del sistema CI/CD
- **[GitHub Actions](./GITHUB_ACTIONS.md)** - Guía completa
- **[OAuth Troubleshooting](./OAUTH_TROUBLESHOOTING.md)** - Solucionar OAuth
- **[Railway CLI](./RAILWAY_CLI_GUIDE.md)** - Guía de Railway CLI

## 🆘 Si Necesitas Ayuda

1. **CI falla:** Revisa los logs en GitHub Actions
2. **Deploy falla:** Ejecuta `railway logs` para ver errores
3. **OAuth issues:** Ver `docs/OAUTH_TROUBLESHOOTING.md`
