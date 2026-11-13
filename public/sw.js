// Service Worker para PWA Previsão do Tempo Agora
const CACHE_NAME = 'previsao-tempo-v3';

const STATIC_PRECACHE = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.webmanifest',
  '/apple-touch-icon.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE).catch((err) => {
        console.warn('Pre-caching partial notice:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests with http/https schemes
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Bypass live dynamic weather, geocoding, and crawler SEO files so they are always fresh
  if (
    request.url.includes('open-meteo.com') ||
    request.url.includes('nominatim.openstreetmap.org') ||
    request.url.includes('photon.komoot.io') ||
    request.url.includes('google') ||
    request.url.includes('doubleclick') ||
    request.url.endsWith('/sitemap.xml') ||
    request.url.endsWith('/robots.txt')
  ) {
    return;
  }

  // 1. Navigation requests (opening or reloading pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback to cached shell
          const cached = (await caches.match('/index.html')) || (await caches.match('/'));
          return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }

  // 2. Static application assets (JS, CSS, images, icons, fonts)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Stale-while-revalidate strategy: return cached if available, update in background
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (networkResponse.type === 'basic' || networkResponse.type === 'cors')
          ) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, copy);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and not in cache, let it fail naturally or return cached
          // CRITICAL: NEVER return HTML for a JS or CSS asset request!
          return cachedResponse || new Response('', { status: 408, statusText: 'Request timeout' });
        });

      return cachedResponse || fetchPromise;
    })
  );
});
