// Cambia este nombre (ej. a 'mi-pwa-v2') cada vez que actualices imágenes o archivos del proyecto
const CACHE_NAME = 'mis-recetas-v2';

// Archivos principales que se guardarán en caché para uso offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192-v2.png',
  './icon-512-v2.png'
];

// Evento de Instalación: Guarda los recursos clave en la caché inicial
self.addEventListener('install', (e) => {
  console.log('Service Worker instalado');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Evento de Activación: Elimina cachés antiguas cuando cambias el CACHE_NAME
self.addEventListener('activate', (e) => {
  console.log('Service Worker activado');
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Borrando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Evento Fetch: Sirve desde la caché si existe el archivo; si no, va a la red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});