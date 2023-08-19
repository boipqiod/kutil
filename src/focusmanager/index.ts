import {Controller} from "./Controller";
import {Indicator} from "../utils/Indicator";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";

window.onload = async () => {
    // Indicator.instance.setIndicator()
    await ServiceWorkerHelper.registerServiceWorker()


    //오디오 재생 가능 여부 확인
    try {
        await new Audio().play()
    } catch (e) {
        document.getElementById('sound-label').remove()
    }

    //화면 꺼짐 방지
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
        document.getElementById('subscribeButton').addEventListener('click', async () => {
            await Notification.requestPermission()
            window.location.reload()
        });

    }

    new Controller().init()
    Indicator.instance.hideIndicator()
}
