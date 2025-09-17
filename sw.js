// sw.js - generated
const CACHE_NAME = 'equilibrio-v1-20250917141524';
const ASSETS = [
  './',
  './dashboard.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).then(fetchResp => {
      if (event.request.url.startsWith(self.location.origin)) {
        const clone = fetchResp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      }
      return fetchResp;
    }).catch(() => caches.match('./dashboard.html')))
  );
});
