import {Controller} from "./Controller";
import {Indicator} from "../utils/Indicator";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";

const BASE_URL = "/kuitl/"

window.onload = async () =>{
    Indicator.instance.setIndicator()

    const notification =  await Notification.requestPermission()
    console.log(notification)

    await ServiceWorkerHelper.registerServiceWorker()

    new Controller().init()

    // await ServiceWorkerHelper.pushMessageToServiceWorker({type: 'init', data: {url: BASE_URL}})

    Indicator.instance.hideIndicator()
}
