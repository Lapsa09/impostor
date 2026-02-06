# Impostor Futbolero ⚽

Un juego social de fútbol donde un jugador es el impostor y los demás deben descubrirlo.

## 🎮 Cómo Jugar

1. **Crear Sala**: Un jugador crea una sala y elige la temática del juego
2. **Compartir Link**: El host comparte el link de la sala con los demás jugadores
3. **Unirse**: Los demás jugadores ingresan a la sala usando el link o código
4. **Iniciar Ronda**: El host inicia la ronda
5. **Asignaciones**:
   - Un jugador aleatorio será el **impostor** (no recibe ningún tema)
   - Los demás jugadores reciben el mismo **jugador/club/tema**
6. **Jugar**: Los jugadores conversan para descubrir quién es el impostor
7. **Siguiente Ronda**: El host puede pasar a la siguiente ronda o cambiar la temática

## 🎯 Temáticas Disponibles

- **Jugadores Actuales y Leyendas**: Mezcla de jugadores de todos los tiempos
- **Jugadores Leyendas**: Solo jugadores históricos del fútbol
- **Jugadores Actuales**: Jugadores en actividad
- **Clubes**: Equipos de fútbol famosos
- **Equipos Históricos (Año Aleatorio)**: Planteles históricos de un año generado aleatoriamente (1950-2024)
- **Mundial (Año Aleatorio)**: Selecciones de un Mundial aleatorio (1930-2022, excepto 1942 y 1946)
- **Fútbol Argentino**: Jugadores y clubes argentinos

## 🚀 Instalación y Ejecución

### Desarrollo

```bash
npm install
npm run dev
```

El juego estará disponible en `http://localhost:3000`

### Producción

```bash
npm run build
npm start
```

## 🛠️ Tecnologías

- **Next.js 16**: Framework de React
- **Socket.IO**: Comunicación en tiempo real
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos

## 📝 Características

- ✅ Salas con códigos únicos
- ✅ Enlace compartible para unirse
- ✅ Múltiples temáticas
- ✅ Cambio de temática entre rondas
- ✅ Sistema de host
- ✅ Asignación aleatoria de impostor
- ✅ Interfaz responsive
- ✅ Tiempo real con Socket.IO

## 🎲 Controles del Host

- Iniciar ronda
- Cambiar temática
- Pasar a siguiente ronda
- Cerrar sala

## 📚 Documentación

Consulta la carpeta [`docs/`](./docs) para más información:

- **[🚀 GitHub Actions CI/CD](./docs/GITHUB_ACTIONS.md)** - Sistema de integración y deploy automático
- **[Guía de Deployment](./docs/DEPLOYMENT.md)** - Instrucciones para desplegar la aplicación
- **[Guía de Railway CLI](./docs/RAILWAY_CLI_GUIDE.md)** - Deploy usando Railway CLI
- **[Guía Manual de Render](./docs/RENDER_MANUAL_GUIDE.md)** - Deploy alternativo en Render.com
- **[Solución OAuth](./docs/OAUTH_TROUBLESHOOTING.md)** - Troubleshooting de errores de OAuth
- **[Fix Rápido OAuth](./docs/QUICK_FIX_OAUTH.md)** - Solución rápida para OAuth
- **[Panel de Administración](./docs/ADMIN_GUIDE.md)** - Gestión de jugadores y equipos

---

¡Diviértete jugando al Impostor Futbolero! ⚽🎭
