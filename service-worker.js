const CACHE_NAME = "player-cache-v1";

const FILES = [
  "/",
  "/index.html",
  "/style/style.css",
  "/js/main.js",
  "/audio/D-Bomb - O Ela, Ela (Official video).mp3",
  "/audio/Dr.Alban - It's My Life (Official HD Video).mp3",
  "/audio/Ice MC - It's a Rainy Day [Official Video].mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});