const VERSION = 'version1';

importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

if(workbox){
    console.log('Workbox cargado');

    self.addEventListener("message",(event)=>{
    if(event.data && event.data.type =="SKIP_WAITING"){
        self.skipWaiting();
    }
    })

    workbox.routing.registerRoute(
        new RegExp('/*'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName:VERSION
        })
    )
    //workbox.precaching.precacheAndRoute([]);
} else{
    console.log('Workbox pendiente');
}