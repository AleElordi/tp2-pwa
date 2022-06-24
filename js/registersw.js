//Chequeamos si soporta el Servie Worker

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../sw.js")
    .then((message)=>{console.log('Coneccion OK')});
}else{
    console.log('Service Worker no soportado');
}