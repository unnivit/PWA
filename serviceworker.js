const CACHE_NAME = 'pwa-multipage-cache-v3';
const urlsToCache = [
  './', // Cache root for start_url
  './index.html',
  './about.html',
  './contact.html',
  './style.css',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './manifest.json',
  './images/image1.jpg', 
  './images/image2.jpg',
  './favicon.ico'
];

// Install: Cache all specified resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Failed to cache resources:', error);
      })
  );
});

// Fetch: Serve cached resources if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if available, otherwise fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Fallback for offline errors (e.g., HTML fallback)
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
