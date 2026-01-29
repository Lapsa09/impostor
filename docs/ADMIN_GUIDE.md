# Panel de Administración - Impostor Futbolero

## 🔐 Acceso al Panel

El panel de administración está protegido por una clave secreta. Para acceder:

1. **Configura la clave de administrador** en tu archivo `.env`:
   ```bash
   ADMIN_KEY=tu-clave-secreta-aqui
   ```

2. **Accede al panel** usando la URL con el parámetro `key`:
   ```
   http://localhost:3000/admin?key=tu-clave-secreta-aqui
   ```
   
   En producción:
   ```
   https://tu-dominio.com/admin?key=tu-clave-secreta-aqui
   ```

## 📊 Funcionalidades

El panel permite administrar todos los datos del juego organizados en 6 categorías:

### Categorías Disponibles:

1. **Jugadores Actuales** - Futbolistas en actividad
2. **Jugadores Leyendas** - Futbolistas históricos
3. **Clubes** - Equipos de fútbol
4. **Fútbol Argentino** - Jugadores argentinos
5. **Equipos Históricos** - Equipos memorables con año (ej: "Barcelona 2009")
6. **Mundiales** - Copas del Mundo (ej: "Mundial 2022")

### Acciones Disponibles:

- ✅ **Agregar** nuevos jugadores/equipos/mundiales a cualquier categoría
- ❌ **Eliminar** elementos existentes
- 💾 **Guardar** todos los cambios de una vez
- 📊 Ver el **contador** de elementos por categoría

## 🎮 Cómo Usar

### Agregar un Elemento:

1. En la categoría deseada, escribe el nombre en el campo de texto
2. Presiona el botón `+` o la tecla `Enter`
3. El elemento se agrega a la lista inmediatamente

### Eliminar un Elemento:

1. Localiza el elemento en la lista
2. Click en el ícono de basura (🗑️) junto al elemento
3. El elemento se elimina de la lista

### Guardar Cambios:

1. Después de hacer todos los cambios deseados
2. Click en el botón **"Guardar Cambios"** (verde, esquina superior derecha)
3. Los cambios se escriben permanentemente en el archivo `data/subjects.json`
4. Recibirás una notificación de éxito

## 📁 Base de Datos

Los datos se almacenan en: **`data/subjects.json`**

Este es un archivo JSON estático que puedes:
- ✏️ Editar manualmente si lo prefieres
- 📦 Hacer backup regularmente
- 🔄 **NO se versiona en Git** - Los cambios locales no afectan al repositorio
- 📤 Compartir entre instancias

> **Nota Importante:** El archivo `subjects.json` está en `.gitignore`, por lo que tus cambios locales no interferirán con Git. En producción o en nuevas instalaciones, se crea automáticamente desde `subjects.json.example`.

### Estructura del archivo:

```json
{
  "jugadores_actuales": ["Lionel Messi", "Cristiano Ronaldo", ...],
  "jugadores_leyendas": ["Diego Maradona", "Pelé", ...],
  "clubes": ["Real Madrid", "Barcelona", ...],
  "jugadores_argentinos": ["Lionel Messi", "Diego Maradona", ...],
  "equipos_historicos": ["Barcelona 2009", "Real Madrid 2014", ...],
  "mundiales": ["Mundial 2022", "Mundial 2018", ...]
}
```

### Archivos Relacionados:

- **`data/subjects.json`** - Archivo activo (ignorado por Git)
- **`data/subjects.json.example`** - Plantilla versionada en Git

## 🔒 Seguridad

- ⚠️ **NUNCA** compartas tu `ADMIN_KEY` públicamente
- 🔐 El acceso al panel solo es posible con la clave correcta
- 🚫 Sin clave válida, el usuario es redirigido a la página principal
- 🔑 Cambia la clave periódicamente por seguridad

### Recomendaciones de Seguridad:

1. Usa una clave compleja y única:
   ```bash
   ADMIN_KEY=ImPostor-F00tball-2026-Sup3rS3cr3t!
   ```

2. No versiones el archivo `.env` con Git (ya está en `.gitignore`)

3. En producción, configura la variable de entorno en tu plataforma:
   - **Railway**: Settings → Variables → Add Variable
   - **Vercel**: Settings → Environment Variables
   - **Render**: Environment → Add Environment Variable

4. Cambia la URL del admin si quieres mayor seguridad:
   - Renombra `app/admin/` a `app/super-secret-panel/`
   - Accede a `/super-secret-panel?key=...`

## 🚀 Uso en Producción

1. **Configura la variable de entorno** en tu plataforma de hosting
2. **Accede al panel** usando la URL completa con tu clave
3. **Haz cambios** según necesites
4. **Guarda** para aplicar los cambios
5. **Los cambios se reflejan inmediatamente** en el juego

## 🔄 Cómo Funcionan los Cambios

1. Al guardar, se actualiza el archivo `data/subjects.json`
2. La aplicación lee este archivo en cada despliegue
3. Los cambios persisten entre reinicios
4. En desarrollo, los cambios se ven al recargar la página
5. En producción, puede requerir un redeploy (según la plataforma)

## 📝 Notas Importantes

- Los cambios NO afectan partidas en curso
- Las nuevas partidas usarán los datos actualizados
- Puedes tener varios administradores con la misma clave
- El archivo JSON se formatea automáticamente con indentación
- Cada categoría mantiene su lista independiente

## 🐛 Solución de Problemas

### "Clave de administrador inválida"
- Verifica que `ADMIN_KEY` en `.env` coincida con el parámetro `key` en la URL
- Reinicia el servidor después de cambiar `.env`

### "Error al guardar los datos"
- Verifica permisos de escritura en la carpeta `data/`
- Revisa los logs del servidor para más detalles

### Los cambios no se reflejan
- Asegúrate de hacer click en "Guardar Cambios"
- En desarrollo, recarga la aplicación
- En producción, puede requerir un redeploy

## 🎯 Mejores Prácticas

1. **Haz cambios graduales**: Agrega/elimina pocos elementos a la vez
2. **Guarda frecuentemente**: No pierdas tu trabajo
3. **Revisa antes de guardar**: Los cambios son permanentes
4. **Mantén consistencia**: Usa el mismo formato para nombres similares
5. **Backup regular**: Copia `data/subjects.json` periódicamente

---

¿Preguntas o sugerencias? Abre un issue en el repositorio 🚀
