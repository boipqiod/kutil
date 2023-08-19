import {appServiceMessage} from "./tpyes";

export default class ServiceWorkerHelper {

    static messageChannel: MessageChannel = new MessageChannel()

    static async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', function(event) {
                console.log('메인 스레드에서 받은 메시지:', event.data);
            });

            const registration = await navigator.serviceWorker.getRegistration('../service-worker.js');
            if (!registration) {
                await navigator.serviceWorker.register('../service-worker.js')
            } else {

                console.log('Service Worker is already registered.')
            }
        } else {
            console.log('Service Worker is not supported by browser.');
        }
    }

    static async sendMessageToServiceWorker<T>(message: appServiceMessage<T>) {
        navigator.serviceWorker.controller.postMessage({
            command: message.command,
            payload: message.payload
        });
    }

    static async pushMessageToServiceWorker(message: any) {

    }

    static async showNotification(title: string, options?: NotificationOptions) {

        console.log('Notification.title:', title)

        const registration = await navigator.serviceWorker.getRegistration('../service-worker.js')
        if (registration) {
            await registration.showNotification(title, options)
        } else {
            console.log('Service Worker is not registered.')
        }
    }

    constructor() {
    }

}
