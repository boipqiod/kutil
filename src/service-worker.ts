import {FocusManagerSW} from "./focusmanager/sw";

const _self = self as unknown as ServiceWorkerGlobalScope;

_self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    console.log(event)
})

_self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    console.log(event)
});

_self.addEventListener('message',  async (event) => {
    console.log('메인으로부터 메시지 받음:', event);

    const data = event.data

    switch (data.appName) {
        case 'focusmanager':{
            FocusManagerSW.instance.setClient(event.source)
            if (data.payload === 'start') {
                FocusManagerSW.instance.startSend()
            } else if (data.payload === 'end') {
                FocusManagerSW.instance.endSend()
            }
        }
    }

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
