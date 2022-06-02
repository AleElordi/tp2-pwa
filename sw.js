const VERSION = 'version1';

importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

if(workbox){
    console.log('Workbox cargado');
    workbox.precaching.precacheAndRoute([]);
}else{
    console.log('Workbox pendiente');
}