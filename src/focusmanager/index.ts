import {Controller} from "./Controller";
import {Indicator} from "../utils/Indicator";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";

window.onload = async () =>{
    Indicator.instance.setIndicator()

    await ServiceWorkerHelper.registerServiceWorker()

    const push = confirm("푸시 알림을 받으시겠습니까?")

    if(push){
        const notification = await Notification.requestPermission()
        console.log("notification", notification)
    }
    new Controller().init()

    // await ServiceWorkerHelper.pushMessageToServiceWorker({type: 'init', data: {url: BASE_URL}})

    Indicator.instance.hideIndicator()
}
