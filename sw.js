// Service worker: primero red (para ver siempre los datos nuevos), y si no hay internet, la última copia guardada.
const CACHE='salas-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(ch=>ch.put(e.request,c)).catch(()=>{});return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('./'))));
});
