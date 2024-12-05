const CACHE_NAME = 'pwa-multipage-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './about.html',
  './contact.html',
  './style.css',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './manifest.json',
  './images/image1.jpg',       // Cache individual images
  './images/image2.jpg',
  './icon/icon-192x192.png',
  './favicon.ico'
];

// Install the service worker and cache files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      try {
          return cache.addAll(urlsToCache);
      } catch (error) {
          console.error('Failed to cache files:', error);
      }
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate and remove old caches
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
