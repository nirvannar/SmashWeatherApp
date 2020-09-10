


   const filesToCache = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'service-worker.js',
    'script.js',
    'site.webmanifest',
    'images/background.jpg',
    'images/android-chrome-192x192.png',
    'images/android-chrome-512x512.png',
    'images/apple-touch-icon.png',
    'images/favicon.ico',
    'images/favicon-16x16.png',
    'images/favicon-32x32.png',
    'images/mstile-70x70.png',
    'images/mstile-144x144.png',
    'images/mstile-150x150.png',
    'images/mstile-310x150.png',
    'images/mstile-310x310.png',
    'images/safari-pinned-tab.svg'
  ];
  
  const staticCacheName = 'pages-cache-v1';
  
  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
      }).catch(error => {
      //Console.log(erro)
      })
    );
   });
   
   
   
   
   
   
  