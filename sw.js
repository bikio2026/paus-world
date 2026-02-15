// Pau's World of Wonder — Service Worker v6 (no-cache)
// This SW only exists to support PWA install + takes no action on fetch.
// All old caches are deleted on activate.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Pass-through: no caching at all
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
