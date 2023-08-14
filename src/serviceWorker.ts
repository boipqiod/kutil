import { precacheAndRoute } from 'workbox-precaching';
declare const self: ServiceWorkerGlobalScope;


// 캐시 이름과 캐싱할 파일 목록

const CACHE_NAME = 'my-cache';
const urlsToCache: string[] = [
    '/',
    '/styles/main.css',
    '/script/main.js'
];
// Workbox가 주입하는 미리 캐시할 파일 목록
declare const __WB_MANIFEST: { url: string, revision: string }[];
precacheAndRoute(__WB_MANIFEST);
self.__WB_MANIFEST;

// 설치 이벤트에서 파일 캐싱
// self.addEventListener('install', (event: any) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache: Cache) => {
//                 return cache.addAll(urlsToCache);
//             })
//     );
// });
//
// // fetch 이벤트에서 캐시 응답 제공
// self.addEventListener('fetch', (event: any) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then((response: Response | undefined) => {
//                 if (response) {
//                     return response; // 캐시에서 응답이 있다면 반환
//                 }
//                 return fetch(event.request); // 캐시에 없다면 네트워크 요청
//             })
//     );
// });
