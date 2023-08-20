import {Controller} from "./Controller";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";
import {appServiceName} from "../utils/tpyes";

window.onload = async () => {
    await ServiceWorkerHelper.registerServiceWorker()

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
}

//페이지 이동시 포커스 매니저 종료
window.onbeforeunload = () => {
    ServiceWorkerHelper.sendMessageToServiceWorker<string>({
        command: appServiceName.focusmanager,
        type: 'end',
        payload: ''
    }).then().catch()
}
