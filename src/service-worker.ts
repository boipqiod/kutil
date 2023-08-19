
const _self = self as unknown as ServiceWorkerGlobalScope;

_self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    console.log(event)
})

_self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    console.log(event)
});

_self.addEventListener('message', (event) => {
    console.log('메인으로부터 메시지 받음:', event);

    // 메인으로 메시지 보내기
    event.ports[0].postMessage({
        status: 'success',
        payload: "메시지 받음"
    });
});


_self.addEventListener('push', (event) => {
    console.log('Service Worker push.');
    console.log(event.data.text());
    const title = event.data.text()
    const options = {
        body: event.data.text(),
    };
    event.waitUntil(_self.registration.showNotification(title, options));
    console.log('Service Worker push end.');
});

_self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker notificationclick.');
    event.notification.close();
})
