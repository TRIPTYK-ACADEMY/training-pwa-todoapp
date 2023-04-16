const assets = ["/", "style.css", "app.js", "sw-register.js", 
"https://fonts.googleapis.com/css2?family=Noto+Sans&family=Poppins:wght@700&display=swap", "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200", "https://fonts.gstatic.com/s/materialsymbolsoutlined/v105/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsLjBuVY.woff2", "https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNr5TRASf6M7Q.woff2", "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2"];

self.addEventListener("install", event => {
  event.waitUntil( // If a file is big and take a long time before loading
    caches.open("assets").then( cache => {
        cache.addAll(assets);
    })
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
        .then( response => {
            // Even if the response is in the cache, we fetch it
            // and update the cache for future usage
            const fetchPromise = fetch(event.request).then(
                  networkResponse => {
                    caches.open("assets").then( cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            // We use the currently cached version if it's there
            return response || fetchPromise; // cached or a network fetch
        })
  );
}); 