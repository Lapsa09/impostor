// Service Worker placeholder para notificaciones
// Este archivo previene errores 404 en la consola

self.addEventListener("install", () => {
  console.log("Service Worker instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", () => {
  console.log("Push recibido");
});
