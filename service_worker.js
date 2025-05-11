// for offline functionality and timer functionality
const CACHE_NAME = 'bmt-cache-v2';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './script1.js',
    './imgs/favicon_64p.png',
    './imgs/BMT_logo_alpha_192p.png'
]

// install event - cache files
self.addEventListener('install', event_=>{
    event_.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});


// fetch event - serve from cache
self.addEventListener('fetch', event_ => {
    event_.respondWith(
        caches.match(event_.request).then(response=>response||fetch(event_.request))
    );
});