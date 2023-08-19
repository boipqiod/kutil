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
        await navigator.serviceWorker.ready
    }


    static async sendMessageToServiceWorker(message: any) {
        navigator.serviceWorker.controller.postMessage({
            command: 'fetchData',
            payload: '데이터 요청'
        });
    }

    static async pushMessageToServiceWorker(message: any) {
        const registration = await navigator.serviceWorker.getRegistration('../service-worker.js')
        if (registration) {
            registration.active?.postMessage(message)
        } else {
            console.log('Service Worker is not registered.')
        }
    }

    static async showNotification(title: string, options?: NotificationOptions) {
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
