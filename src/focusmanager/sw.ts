import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";
import {soundList} from "../utils/Audio";
import {getById} from "../utils/domUtils";
import {focusmanagerInit} from "../utils/tpyes";

export class FocusManagerSW {

    static get instance(): FocusManagerSW {
        if (FocusManagerSW.shared)
            return FocusManagerSW.shared
        else {
            FocusManagerSW.shared = new FocusManagerSW()
            return FocusManagerSW.shared
        }
    }

    private static shared: FocusManagerSW

    client: MessagePort | ServiceWorker | Client | undefined
    sw: ServiceWorkerGlobalScope | undefined

    timer!: NodeJS.Timer

    isRunning: boolean = false
    isFocus: boolean = true

    runningTime: number = 1

    isAuto: boolean = false
    isPush: boolean = false
    focusTime: number = 0
    relaxTime: number = 0

    startTime: number = 0; // 시작 시간을 저장할 변수

    setClient = (client: MessagePort | ServiceWorker | Client, sw: ServiceWorkerGlobalScope) => {
        this.sw = sw
        this.client = client
    }

    init = (initDta: focusmanagerInit) => {

        this.isAuto = initDta.isAuto
        this.isPush = initDta.isPush
        this.focusTime = this.runningTime = initDta.focusTime
        this.relaxTime = initDta.relaxTime
        this.isFocus = true

        this.sendDisplay(this.isFocus, this.runningTime)
    }

    sendDisplay = (isFocus: boolean, runningTime: number) => {
        this.client?.postMessage({
            command: 'focusmanager',
            type: 'display',
            payload: {
                isFocus,
                runningTime
            }
        })
    }

    startTimer = async () => {
        this.isRunning = true
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            // 남은 시간 계산
            this.runningTime = this.isFocus ? this.focusTime - Math.floor((Date.now() - this.startTime) / 1000) : this.relaxTime - Math.floor((Date.now() - this.startTime) / 1000)
            this.sendDisplay(this.isFocus, this.runningTime)

            // 시간이 남았으면 리턴
            if (this.runningTime > 0) return
            //타이머 종료
            clearInterval(this.timer)
            if (!this.isRunning) return

            //푸시 알림
            if (this.isPush) {
                this.sw?.registration.showNotification(
                    this.isFocus ? 'Focus Time is over!' : 'Relax Time is over!',
                    {
                        body: this.isFocus ? 'Relax Time is over! Ready to focus' : 'Focus Time is over! Enjoy your break',
                        icon:  '../public/assets/focusmanager/fm_icon.png',
                    }
                ).then().catch()
            }
            this.isFocus = !this.isFocus
            this.isRunning = false

        }, 100)
    }

    endSend = () => {
        this.isRunning = false
        clearInterval(this.timer)
    }

}
