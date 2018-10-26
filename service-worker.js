var log = console.log.bind(console)
var version = '0.0.1'
var cacheName = 'gitstar'
var cache = cacheName + '-' + version
var filesToCache  = [
    'http://localhost:8080/css/style.css',
    'http://localhost:8080/manifest.json',
    'http://localhost:8080/',
    'http://localhost:8080/index.html'
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