export default class ServiceWorkerHelper {

    static messageChannel: MessageChannel = new MessageChannel()

    static async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported')
            const registration = await navigator.serviceWorker.getRegistration('../service-worker.js');
            if (!registration) {
               await navigator.serviceWorker.register('../service-worker.js')

                console.log('Service Worker is registered.')
            } else {
                console.log('Service Worker is already registered.')
            }
        } else {
            console.log('Service Worker is not supported by browser.');
        }

        this.messageChannel.port1.onmessage = (event) => {
            console.log('서비스 워커로부터 메시지 받음:', event.data);
        }

    }

    static async sendMessageToServiceWorker(message: any) {
        console.log(message)

const registration = await navigator.serviceWorker.getRegistration('../service-worker.js')
        if (registration) {
            const result = await registration.active?.postMessage(message)
            return result
        }else {
            console.log('Service Worker is not registered.')
        }

        navigator.serviceWorker.controller?.postMessage(message)
    }

    static async pushMessageToServiceWorker(message: any) {
        const registration = await navigator.serviceWorker.getRegistration('../service-worker.js')
        if (registration) {
            registration.active?.postMessage(message)
        }else {
            console.log('Service Worker is not registered.')
        }
    }

    static async showNotification(title: string, options?: NotificationOptions) {
        const registration = await navigator.serviceWorker.getRegistration('../service-worker.js')
        if (registration) {
            await registration.showNotification(title, options)
        }else {
            console.log('Service Worker is not registered.')
        }
    }

    constructor() {
    }

}
