const CACHE_NAME = 'math-adventure-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/game.js',
    '/character.png',
    '/game-bg.png',
    '/correct.mp3',
    '/wrong.mp3'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(response => response || fetch(e.request))
    );
});
