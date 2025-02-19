const CACHE_NAME = "math-adventure-cache-v1";
const urlsToCache = [
    "index.html",
    "style.css",
    "game.js",
    "assets/correct.mp3",
    "assets/wrong.mp3",
    "assets/background.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
