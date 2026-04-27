// SW deshabilitado: se auto-desinstala y limpia cachés
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))),
      self.registration.unregister()
    ]).then(() => self.clients.matchAll().then(clients => clients.forEach(c => c.navigate(c.url))))
  );
});
self.addEventListener('fetch', () => {});
