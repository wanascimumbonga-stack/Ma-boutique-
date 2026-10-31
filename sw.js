var C="boutique-v8",F=["./","index.html","cahier.html","config.js","manifest.json","logo-192.png","logo-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F);}));self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C;}).map(function(x){return caches.delete(x);}));}));self.clients.claim();});
self.addEventListener("fetch",function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==self.location.origin)return; /* jamais d'API ni de photos externes dans le cache */
  e.respondWith(fetch(r).then(function(x){var cp=x.clone();caches.open(C).then(function(c){c.put(r,cp);});return x;}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("index.html");});}));
});
