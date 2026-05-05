// Loja Indústria — Service Worker
// Estratégia: cache-first com network update em background.
// Permite à app correr 100% offline depois da primeira visita.

const CACHE_NAME = 'loja-industria-debito-gas-v2026.05.05.c';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './favicon.png',
  // Google Fonts são carregadas externamente; o browser cacheia-as por conta própria.
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap'
];

// Instalação: pré-carrega todos os recursos para o cache.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS).catch(err => {
        // Não falha se algum recurso (ex: fontes externas) der erro.
        console.warn('Some assets failed to cache:', err);
      }))
      .then(() => self.skipWaiting())
  );
});

// Ativação: limpa caches antigos.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first, fallback para network, e atualiza cache em background.
self.addEventListener('fetch', event => {
  // Só GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        // Atualiza cache em background com a versão fresca
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => cached); // Sem rede? Devolve cache.

      return cached || fetchPromise;
    })
  );
});
