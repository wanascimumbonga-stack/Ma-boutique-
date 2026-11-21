var C="boutique-v29",F=["./","index.html","cahier.html","config.js","manifest.json","logo-192.png","logo-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F);}));self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C;}).map(function(x){return caches.delete(x);}));}));self.clients.claim();});
self.addEventListener("fetch",function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==self.location.origin)return; /* jamais d'API ni de photos externes dans le cache */
  e.respondWith(fetch(r).then(function(x){var cp=x.clone();caches.open(C).then(function(c){c.put(r,cp);});return x;}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("index.html");});}));
});
self.addEventListener("push",function(e){
  var d={};try{d=e.data?e.data.json():{};}catch(x){d={title:"Ma boutique",body:e.data?e.data.text():""};}
  e.waitUntil(self.registration.showNotification(d.title||"Ma boutique",{body:d.body||"",icon:"logo-192.png",badge:"logo-192.png",vibrate:[200,100,200,100,300],renotify:true,data:{url:d.url||"#/"},tag:d.url||"mb"}));
});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  var u=(e.notification.data&&e.notification.data.url)||"#/";
  var full=new URL("./"+(u.charAt(0)==="#"?u:"#/"),self.registration.scope).href;
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++){var c=list[i];if("focus" in c){if("navigate" in c)c.navigate(full);return c.focus();}}
    return clients.openWindow(full);
  }));
});
