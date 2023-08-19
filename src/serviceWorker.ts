
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
});

self.addEventListener('message', (event) => {
    console.log('메인으로부터 메시지 받음:', event.data);

    // 메인으로 메시지 보내기
    event.ports[0].postMessage('서비스 워커에서 메인으로 메시지');
});


self.addEventListener('push', (event) => {
    console.log('Service Worker push.');
    console.log(event);
})
