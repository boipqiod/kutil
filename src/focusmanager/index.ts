import {Controller} from "./Controller";
import {Indicator} from "../utils/Indicator";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";
import swal from 'sweetalert2'

window.onload = async () =>{
    // Indicator.instance.setIndicator()
    console.log(Notification.permission)

    if (Notification.permission === 'default') {
        // 사용자가 아직 알림 권한을 선택하지 않았을 때
        document.getElementById('subscribeButton').addEventListener('click', function() {
            Notification.requestPermission().then(async function(permission) {
                if (permission === 'granted') {
                    // 사용자가 알림 권한을 허용한 경우
                    alert('알림 권한을 허용했습니다.');
                    await ServiceWorkerHelper.registerServiceWorker()
                }
                else{
                    // 사용자가 알림 권한을 거부한 경우
                    alert('알림 권한을 거부했습니다.');
                }
            });
        });
    }else   if (Notification.permission === 'granted') {
        await ServiceWorkerHelper.registerServiceWorker()
    }
    new Controller().init()


    // await ServiceWorkerHelper.pushMessageToServiceWorker({type: 'init', data: {url: BASE_URL}})

    Indicator.instance.hideIndicator()
}
