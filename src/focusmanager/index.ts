import {Controller} from "./Controller";
import {Utils} from "../utils/Utils";
import {Audio, soundList} from "../utils/Audio";
import {Indicator} from "../utils/Indicator";

const BASE_URL = "/kuitl/"

window.onload = async () =>{
    Indicator.instance.setIndicator()

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../serviceWorker.js').then(() => {
            console.log('Service Worker Registered');
        });
    }
    new Controller().init()
    Indicator.instance.hideIndicator()

}
