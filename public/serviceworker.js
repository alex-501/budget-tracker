const VERSION = ' version_01 ';
const APP_PREFIX = 'Budget- ' ;     

const CACHE_NAME = APP_PREFIX + VERSION;


//write list of all files you want to cache then set their paths
const FILES_TO_CACHE = [
  "./",   "./index.html",
  "./css/styles.css",  "./js/index.js", "./js/idb.js",
  "./icons/icon-72x72.png",  "./icons/icon-96x96.png", "./icons/icon-128x128.png",
  "./icons/icon-144x144.png", "./icons/icon-152x152.png",  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",  "./icons/icon-512x512.png", "./manifest.json"];


  //event listener for fetch and function
  self.addEventListener('fetch', function (e) 
  {console.log('fetch request : ' + e.request.url)
 e.respondWith(caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
        //errlog
   
    } else {console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)   } }))})

        

//event listener

self.addEventListener('activate', function(e) {
  e.waitUntil( caches.keys().then(function(keyList) {
      let  cacheKeeplist = keyList.filter(function(key) {
    return key.indexOf(APP_PREFIX);});
    
    
    cacheKeeplist.push(CACHE_NAME);
    
    return Promise.all(
        keyList.map(function(key, i) {
    
            if (cacheKeeplist.indexOf(key) === -1) {
            console.log('deleting cache : ' + keyList[i]);
            return caches.delete(keyList[i]); }})  );  }));});