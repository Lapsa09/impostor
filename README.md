# Impostor Futbolero ⚽

Un juego social de fútbol donde un jugador es el impostor y los demás deben descubrirlo.

---

## 🚀 Quick Start

### Desarrollo Local

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# 3. Ejecutar en desarrollo
pnpm dev

# 4. Abrir en navegador
# http://localhost:3000
```

### Deploy a Railway

```bash
# Ver guía completa en:
docs/guides/RAILWAY_GUIDE.md
```

---

## 📚 Documentación

**Toda la documentación está en la carpeta `/docs`**

### 🎯 Comienza aquí:

- **[docs/quick-start/START_HERE.md](docs/quick-start/START_HERE.md)** - Guía de inicio

### 📖 Guías principales:

- [Guía de Implementación](docs/guides/IMPLEMENTATION_GUIDE.md)
- [Guía de Railway](docs/guides/RAILWAY_GUIDE.md)
- [Checklist](docs/guides/CHECKLIST.md)

### 📊 Reportes:

- [Best Practices Report](docs/reports/BEST_PRACTICES_REPORT.md)
- [Completion Report](docs/reports/COMPLETION_REPORT.md)

Ver índice completo: **[docs/README.md](docs/README.md)**

---

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

---

## 🎯 Temáticas Disponibles

- **Jugadores Actuales y Leyendas**: Mezcla de jugadores de todos los tiempos
- **Jugadores Leyendas**: Solo jugadores históricos del fútbol
- **Jugadores Actuales**: Jugadores en actividad
- **Clubes**: Equipos de fútbol famosos
- **Equipos Históricos (Año Aleatorio)**: Planteles históricos de un año especifico
- **Mundial (Año Aleatorio)**: Selecciones de un Mundial aleatorio
- **Fútbol Argentino**: Jugadores argentinos

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Real-time**: Socket.io
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Language**: TypeScript
- **Deployment**: Railway (WebSockets nativos)

---

## ✨ Features

- ✅ Real-time multiplayer con WebSockets
- ✅ Múltiples temáticas de juego
- ✅ Panel de administración para gestionar temas
- ✅ Compartir sala por link o código
- ✅ PWA-ready (installable)
- ✅ Responsive design
- ✅ SEO optimizado
- ✅ Production-ready

---

## 📊 Best Practices Implementadas

**Score: 9.5/10** ⭐

- ✅ Sistema de logging profesional (sin console.logs en producción)
- ✅ Headers de seguridad HTTP
- ✅ SEO completo (Open Graph, Twitter Cards, robots.txt, sitemap)
- ✅ Error boundaries globales
- ✅ Loading states
- ✅ Railway-optimized

Ver detalles: [docs/reports/BEST_PRACTICES_REPORT.md](docs/reports/BEST_PRACTICES_REPORT.md)

---

## 🚂 Deploy

Este proyecto está optimizado para **Railway** por su soporte nativo de WebSockets.

```bash
# Ver guía completa de deployment:
docs/guides/RAILWAY_GUIDE.md
```

**¿Por qué Railway?**

- ✅ Soporte nativo de WebSockets (esencial para Socket.io)
- ✅ Deploy automático desde GitHub
- ✅ Dockerfile support
- ✅ Variables de entorno fáciles
- ✅ Logs y métricas incluidas

---

## 🔧 Scripts Disponibles

```bash
pnpm dev          # Desarrollo local
pnpm build        # Build de producción
pnpm build:ci     # Build con inicialización de datos
pnpm start        # Servidor de producción
pnpm lint         # Linter
```

---

## 📁 Estructura del Proyecto

```
impostor/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Panel de administración
│   └── room/              # Salas de juego
├── components/            # Componentes React
│   ├── room/             # Componentes de sala
│   └── ui/               # UI components (Shadcn UI)
├── lib/                   # Utilidades y tipos
├── hooks/                 # Custom hooks
├── data/                  # Datos del juego (subjects.json)
├── docs/                  # 📚 Documentación completa
│   ├── quick-start/      # Guías de inicio rápido
│   ├── guides/           # Guías detalladas
│   └── reports/          # Reportes y análisis
├── public/               # Assets estáticos
├── server.ts             # Servidor Socket.io
└── Dockerfile            # Docker para Railway
```

---

## 🔐 Variables de Entorno

Ver `.env.example` para todas las variables necesarias.

```bash
ADMIN_KEY=tu-clave-secreta
ALLOWED_ORIGINS=http://localhost:3000,https://tu-app.up.railway.app
NEXT_PUBLIC_BASE_URL=http://localhost:3000
PORT=3000
NODE_ENV=development
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

---

## 🔗 Enlaces

- [Documentación Completa](docs/README.md)
- [Railway Dashboard](https://railway.app/dashboard)
- [Reportar un Issue](https://github.com/Lapsa09/impostor/issues)

---

## ⭐ Agradecimientos

- Diseño de iconos: [Vecteezy](https://es.vecteezy.com/)
- UI Components: [Shadcn UI](https://ui.shadcn.com/)
- Framework: [Next.js](https://nextjs.org/)

---

**¡Disfruta jugando a Impostor Futbolero!** ⚽🎮

_Hecho con ❤️ para los amantes del fútbol_
