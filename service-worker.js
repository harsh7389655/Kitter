const CACHE_NAME = 'kitter-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/images/hero-banner.jpg',
  './assets/images/cta-bg.jpg',
  './assets/images/cta-banner.png',
  './assets/images/cta-icon.png',
  './assets/images/product-1.jpg',
  './assets/images/product-1_0.jpg',
  './assets/images/product-2.jpg',
  './assets/images/product-2_0.jpg',
  './assets/images/product-3.jpg',
  './assets/images/product-3_0.jpg',
  './favicon.svg',
  './assets/js/script.js',
  'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
  'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'
];

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(urlsToCache))
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       })
//   );
// });

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  
}

);
self.addEventListener("install", function (event) { event.waitUntil(preLoad());
});
self.addEventListener("fetch", function (event) {
event.respondWith(checkResponse(event.request).catch(function () {
console.log("Fetch from cache successful!");
return returnFromCache(event.request);
}));
console.log("Fetch successful!");
event.waitUntil(addToCache(event.request));
});
self.addEventListener('sync', event => { if (event.tag === 'syncMessage') {
console.log("HelloSync")
}
});
self.addEventListener('push', function(event) {
  if (event && event.data) {
    var data = event.data.json();
    if (data.method == "pushMessage") {
      console.log("Push notification sent");
      event.waitUntil(
        self.registration.showNotification("Anushka", {
          body: data.message
        })
      );
    }
  }
});

var filesToCache = [ './index.html'
];
var preLoad = function () {
return caches.open("offline").then(function (cache) {
// caching index and important routes
return cache.addAll(filesToCache);
});
};
var checkResponse = function (request) { return new Promise(function (fulfill, reject) {
fetch(request).then(function (response) { if (response.status !== 404) {
fulfill(response);
} else {
reject();
}
}, reject);
});
};
var addToCache = function (request) {
return caches.open("offline").then(function (cache) { return fetch(request).then(function
(response) {
return cache.put(request, response);
});
});
};
var returnFromCache = function (request) {
return caches.open("offline").then(function (cache) { return
cache.match(request).then(function (matching) {
if (!matching || matching.status == 404) { return cache.match("offline.html");
} else {
return matching;
}
});
});
};

