var log = console.log.bind(console)
var version = '0.0.6'
var cacheName = 'todoit'
var cache = cacheName + '-' + version
var filesToCache  = [
    'http://localhost:8888/css/style.css',
    'http://localhost:8888/js/app.js',
    'http://localhost:8888/js/localforage.js',
    'http://localhost:8888/images/icons/favicon.ico',
    'http://localhost:8888/images/icons/icon-favicon-144x144.png',
    'http://localhost:8888/manifest.json',
    'http://localhost:8888/',
    'http://localhost:8888/index.php'
]



self.addEventListener('install', function (event) {
    log('[ServiceWorker] Installing...')

    event.waitUntil(caches
        .open(cache)
        .then(function (swcache) {
            log('[ServiceWorker] Caching files')
            return swcache.addAll(filesToCache)
        }))
})

self.addEventListener('fetch', function (event) {
    if (filesToCache.includes(event.request.url)) {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    if(response) {
                        log('Fulfilling ' + event.request.url + ' from cache.')
                        return response
                    } else {
                        log(event.request.url + ' not found in cache, fetching from network')
                        return fetch(event.request)
                    }
                })
        )
    }
})