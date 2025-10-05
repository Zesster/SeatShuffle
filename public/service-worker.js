/* PWA Service Worker with dynamic base scope */
const CACHE_NAME = 'classroom-app-v3';
const ROOT = new URL(self.registration.scope).pathname; // e.g., '/SeatShuffle/' or '/'

const CORE_ASSETS = [
  ROOT,
  ROOT + 'index.html',
  ROOT + 'manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : undefined)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Navigations: network-first, fallback to cached app shell
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match(ROOT + 'index.html'))
    );
    return;
  }

  // Stale-while-revalidate for versioned build assets under `${ROOT}assets/`
  if (url.pathname.startsWith(ROOT + 'assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        const fetchPromise = fetch(req)
          .then((res) => { cache.put(req, res.clone()); return res; })
          .catch(() => undefined);
        return cached || fetchPromise || caches.match(req);
      })
    );
    return;
  }

  // Default: network-first with fallback to cache
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});

