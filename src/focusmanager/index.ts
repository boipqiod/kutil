import {Controller} from "./Controller";
import {Indicator} from "../utils/Indicator";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";
import swal from 'sweetalert2'

window.onload = async () =>{
    Indicator.instance.setIndicator()

    const push = await swal.fire({
        title: '푸시 알림을 받으시겠습니까?',
        text: '푸시 알림을 받으시면 새로운 글이 올라올 때 알림을 받을 수 있습니다.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니오'
    })

    if(push.isConfirmed){
        const notification = await Notification.requestPermission()
        console.log("notification", notification)
    }

    await ServiceWorkerHelper.registerServiceWorker()
    new Controller().init()

    // await ServiceWorkerHelper.pushMessageToServiceWorker({type: 'init', data: {url: BASE_URL}})

    Indicator.instance.hideIndicator()
}
