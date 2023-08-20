import {FocusManagerSW} from "./focusmanager/sw";
import {appServiceMessage, focusmanagerInit} from "./utils/tpyes";
import {populateDependencyGraph} from "ts-loader/dist/utils";

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
    const data = event.data as appServiceMessage<any>

    switch (data.command) {
        case 'focusmanager':{
            if(data.type === 'init') {
                const payload = data.payload as focusmanagerInit
                FocusManagerSW.instance.setClient(event.source, _self)
                FocusManagerSW.instance.init(payload)
            }
            else if (data.type === 'start') {
                FocusManagerSW.instance.startTimer().then()
            } else if (data.type === 'end') {
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
