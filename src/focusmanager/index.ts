import {Controller} from "./Controller";
import {Utils} from "../common/Utils";

const BASE_URL = "/kuitl/"

window.onload = async () =>{
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../serviceWorker.js').then(() => {
            console.log('Service Worker Registered');
        });
    }
    if ('wakeLock' in navigator) {
        let wakeLock = null;

        try {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock was released');
            });
            console.log('Wake Lock is active');
        } catch (err: any) {
            console.error(`${err.name}, ${err.message}`);
        }
    }


    new Controller().init()
    new Utils().completedLoading()
}
