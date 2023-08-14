import { precacheAndRoute } from 'workbox-precaching';
declare const self: ServiceWorkerGlobalScope;

// Workbox가 주입하는 미리 캐시할 파일 목록
declare const __WB_MANIFEST: { url: string, revision: string }[];
precacheAndRoute(__WB_MANIFEST);
self.__WB_MANIFEST;