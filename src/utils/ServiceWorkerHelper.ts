import {appServiceMessage} from "./tpyes";

export default class ServiceWorkerHelper {

    protected static registration: ServiceWorkerRegistration | undefined

    static async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', function(event) {
                console.log('메인 스레드에서 받은 메시지:', event.data);
            });

            const registration = await navigator.serviceWorker.getRegistration('../service-worker.js');
            if (!registration) {
                await navigator.serviceWorker.register('../service-worker.js')
            } else {
                this.registration = registration
                console.log('Service Worker is already registered.')
            }
        } else {
            console.log('Service Worker is not supported by browser.');
        }
    }

    static async sendMessageToServiceWorker<T>(message: appServiceMessage<T>) {
        try {
            this.registration?.active?.postMessage(message)
        }catch (e) {

            console.log(e)
        }
    }
    static async showNotification(title: string, options?: NotificationOptions) {
        await this.registration?.showNotification(title, options)
    }

    constructor() {
    }

}
