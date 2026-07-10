/* Wonder Journey OS — Service Worker (docs/32 · PWA Phase 1–2)
   Cache-first for the app shell so lessons keep working offline after the
   first visit. Bump VERSION on every release so families get updates. */
const VERSION = "wj-v0.28.0";
const CORE = [
  "./", "./index.html",
  "./curriculum.js", "./curriculum-map.js", "./media-manifest.js", "./recipes.js", "./app.js",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first for same-origin GETs; network fills the cache (so real photos in
// assets/ become available offline after they're first viewed). Offline misses
// fall back to the app shell — the resilient media system handles the rest.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then((hit) =>
      hit ||
      fetch(e.request)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
          return res;
        })
        .catch(() => (e.request.mode === "navigate" ? caches.match("./index.html") : Response.error()))
    )
  );
});
