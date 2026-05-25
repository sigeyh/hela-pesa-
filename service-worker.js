self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', function(event) {
  // Bypass Payhero STK‑push requests so they are not intercepted by the SW
  if (event.request.url.includes('payhero.co')) {
    return; // let the browser handle the request normally
  }
  event.respondWith(fetch(event.request));
});
