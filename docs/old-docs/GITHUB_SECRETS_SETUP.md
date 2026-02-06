# ⚙️ Configuración de Secrets para GitHub Actions

Para que los workflows de GitHub Actions funcionen correctamente, necesitas configurar algunos secrets en tu repositorio.

## 🔐 Cómo Agregar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (⚙️ arriba a la derecha)
3. En el menú lateral izquierdo, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. Ingresa el **Name** y **Value** del secret
6. Click en **Add secret**

## 📋 Secrets Requeridos

### 1. `RAILWAY_TOKEN` ⭐ (Requerido para deploy)

**Qué es:** Token de autenticación para Railway CLI

**Cómo obtenerlo:**

```bash
# En tu terminal local
railway login
# Se abrirá el browser, autoriza la app

# Obtén el token
railway whoami --token
```

**Copias el token que aparece** y lo agregas como secret con el nombre `RAILWAY_TOKEN`

**Ejemplo del output:**

```
github|12345678|my-token-here-abc123xyz789
```

Copia TODO ese string.

---

### 2. `ADMIN_KEY` (Recomendado)

**Qué es:** Password para acceder al panel de administración (`/admin`)

**Valor sugerido:** Una contraseña segura, por ejemplo:

```
Mi-Super-Password-Secreto-2026
```

**Nota:** Si no lo configuras, el CI usará `test-key-for-ci` solo para testing (no afecta producción).

---

### 3. `RAILWAY_SERVICE_ID` (Opcional)

**Qué es:** ID del servicio específico en Railway (útil si tienes múltiples servicios)

**Cómo obtenerlo:**

```bash
railway service list
```

**Output ejemplo:**

```
┌──────────────────────────────────────┬────────────┬──────┐
│ ID                                   │ Name       │ ... │
├──────────────────────────────────────┼────────────┼──────┤
│ abc123-def456-ghi789                 │ impostor   │ ... │
└──────────────────────────────────────┴────────────┴──────┘
```

Copia el **ID** y agrégalo como secret con el nombre `RAILWAY_SERVICE_ID`.

**Nota:** Si no lo configuras, el workflow intentará usar el servicio llamado `impostor` por defecto.

---

## ✅ Verificar que Todo Funciona

Una vez agregados los secrets:

1. Haz un commit de prueba:

   ```bash
   git add .
   git commit -m "test: verificar CI/CD"
   git push origin main
   ```

2. Ve a tu repositorio en GitHub → **Actions** tab

3. Deberías ver el workflow **"Deploy to Railway"** ejecutándose

4. Click en el workflow para ver el progreso en tiempo real

5. Si todo sale bien, verás ✅ en todos los pasos

## 🐛 Si algo falla

### Error: "RAILWAY_TOKEN not found"

Verifica que:

- El secret se llame exactamente `RAILWAY_TOKEN` (case-sensitive)
- Copiaste el token completo del comando `railway whoami --token`
- El token no tiene espacios extra al inicio o final

### Error: "railway: command not found"

Esto es normal en el CI. El workflow instala Railway CLI automáticamente.

### Error: "No project linked"

Verifica que hayas ejecutado `railway init` en tu proyecto local al menos una vez.

## 🔄 Actualizar un Secret

1. Ve a Settings → Secrets and variables → Actions
2. Click en el secret que quieres actualizar
3. Click en **Update secret**
4. Ingresa el nuevo valor
5. Click en **Update secret**

Los workflows usarán el nuevo valor en la próxima ejecución.

## 🗑️ Eliminar un Secret

1. Ve a Settings → Secrets and variables → Actions
2. Click en el ❌ junto al secret
3. Confirma la eliminación

## 📚 Más Información

- [GitHub Actions Secrets Docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Railway Tokens Docs](https://docs.railway.app/guides/cli#authentication)
