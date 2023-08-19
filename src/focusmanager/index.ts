import {Controller} from "./Controller";
import {Indicator} from "../utils/Indicator";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";
import swal from 'sweetalert2'

window.onload = async () =>{
    // Indicator.instance.setIndicator()
    await ServiceWorkerHelper.registerServiceWorker()

    try {
        const wakeLock = await navigator.wakeLock.request("screen");
        console.log('wakeLock:', wakeLock)
    } catch (err) {
        // the wake lock request fails - usually system related, such being low on battery
        console.log(`${err.name}, ${err.message}`);
    }

    console.log('Notification.permission:', Notification.permission)
    if (Notification.permission === 'default') {
        const subscribeButton = document.getElementById('subscribeButton')
        subscribeButton.style.display = 'block'
        document.getElementById('subscribeButton').addEventListener('click', function() {
            Notification.requestPermission()
        });

    }

    new Controller().init()
    Indicator.instance.hideIndicator()
}
