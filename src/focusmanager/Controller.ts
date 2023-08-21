import {getById} from "../utils/domUtils";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";
import {appServiceMessage, appServiceName, focusmanagerDisplay, focusmanagerInit} from "../utils/tpyes";
import {soundList} from "../utils/Audio";

export class Controller {
    private static shared: Controller

    focusEle: HTMLInputElement
    relaxEle: HTMLInputElement

    autoEle: HTMLInputElement
    pushEle: HTMLInputElement
    soundEle: HTMLInputElement

    settingEle: HTMLDivElement
    timerEle: HTMLDivElement

    infoEle: HTMLDivElement

    originFocusTime: number = 0
    originRelaxTime: number = 0
    runningTime: number = 0

    isFocus: boolean = true

    timer!: NodeJS.Timer
    startTime: number = 0; // 시작 시간을 저장할 변수

    isRunning: boolean = false

    constructor() {
        this.focusEle = getById<HTMLInputElement>('f_time')
        this.relaxEle = getById<HTMLInputElement>('r_time')

        this.autoEle = getById<HTMLInputElement>('auto')
        this.pushEle = getById<HTMLInputElement>('push')
        this.soundEle = getById<HTMLInputElement>('sound')

        this.settingEle = getById<HTMLInputElement>('setting')
        this.timerEle = getById<HTMLInputElement>('timer')

        this.infoEle = getById<HTMLDivElement>('info')

        if (Controller.shared)
            return Controller.shared
        else {
            Controller.shared = this
        }
    }


    /****초기화****/
        //이벤트 리스너 등록 등 초기화 함수
    init = () => {
        //스타트 버튼 액션 이벤트 리스너 등
        getById<HTMLButtonElement>('btn-start').addEventListener('click', this.startAction)
        getById<HTMLButtonElement>('btn-end').addEventListener('click', this.end)
        getById<HTMLButtonElement>('btn-relax-start').addEventListener('click', () => {
            this.sendToServiceWorker('start')
        });
        getById<HTMLButtonElement>('btn-focus-start').addEventListener('click', () => {
            this.sendToServiceWorker('start')
        });
        getById<HTMLButtonElement>('btn-info').addEventListener('click', this.showInfo);

        this.pushEle.addEventListener('click', () => {
            if(Notification.permission === 'default') {
                this.pushEle.checked = false
                alert('Please allow push notification\nClick button that right side of "Start" button')
            }
        })
        this.infoEle.addEventListener('click', this.closeInfo)
    }
    //이벤트 리스너 함수
    startAction = async () => {
        if (
            this.focusEle.value === "" ||
            this.relaxEle.value === "" ||
            Number(this.focusEle.value) <= 0 ||
            Number(this.relaxEle.value) <= 0
        ) {
            alert("입력 값을 확인해주세요")
            return
        }

        console.log('startAction')


        await ServiceWorkerHelper.sendMessageToServiceWorker<focusmanagerInit>({
            command: appServiceName.focusmanager,
            type: 'init',
            payload: {
                isAuto: this.autoEle.checked,
                isPush: this.pushEle.checked,
                focusTime: Number(this.focusEle.value) * 60,
                relaxTime: Number(this.relaxEle.value) * 60,
            }
        })

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', this.receiveFromServiceWorker)
        }

        this.settingEle.classList.add('hide')
        this.timerEle.classList.remove('hide')

        this.sendToServiceWorker('start')


        // this.start()
    }

    /****진행****/
        //타이머 시작
    start = () => {
        // 시간 저장 (분을 초로 변환)
        this.originFocusTime = this.runningTime = Number(this.focusEle.value) * 60
        this.originRelaxTime = Number(this.relaxEle.value) * 60


        //화면 전환

        // 시작 시간 기록
        this.startTime = Date.now();
        this.isRunning = true
        this.timer = setInterval(this.timerAction, 100)
        this.isFocus = true
        this.sendToServiceWorker('start')
    }

    end = () => {
        navigator.serviceWorker.removeEventListener('message', this.receiveFromServiceWorker)
        //값 초기화
        this.timerEle.classList.add('hide')
        this.settingEle.classList.remove('hide')
        this.isFocus = true
        this.isRunning = false
        clearInterval(this.timer)
        this.sendToServiceWorker('end')
    }

    // 타이머 액션
    timerAction = async () => {

        // // 남은 시간 계산
        // this.runningTime = this.isFocus ? this.originFocusTime - Math.floor((Date.now() - this.startTime) / 1000) : this.originRelaxTime - Math.floor((Date.now() - this.startTime) / 1000)
        //
        // this.updateTimeDisplay(this.runningTime);
        // if (this.runningTime <= 0) {
        //     clearInterval(this.timer)
        //     this.sendToServiceWorker('start')
        //
        //     if (!this.isRunning) return
        //     this.isRunning = false
        //
        //     //푸시 알림
        //     if (this.pushEle.checked) {
        //         ServiceWorkerHelper.showNotification(
        //             this.isFocus ? '' : 'Relax Time is over! Ready to focus',
        //             {
        //                 body: 'Focus Time is over! Good job'
        //             }
        //         ).then().catch()
        //     }
        //
        //     //소리 재생
        //     if (this.soundEle?.checked) {
        //         await new Audio(soundList.bell).play().catch(e => console.log(e))
        //     }
        //
        //     if (this.autoEle.checked) this.isFocus ? this.startRelax() : this.startFocus()
        //     else this.isFocus ? getById<HTMLButtonElement>('btn-relax-start').classList.remove('hide') : getById<HTMLButtonElement>('btn-focus-start').classList.remove('hide');
        // }
    }

    // 시간을 00:00 형식으로 표시
    updateTimeDisplay(timeInSeconds: number, state: "focus" | "relax" ) {
        console.log('updateTimeDisplay', timeInSeconds, state)

        const _timeInSeconds = timeInSeconds <= 0 ? 0 : timeInSeconds
        const minutes = Math.floor(_timeInSeconds / 60);
        const seconds = Math.floor(_timeInSeconds % 60);
        getById('display-timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        getById('display-message').textContent = state === 'focus' ? 'Focus' : 'Relax'
    }

    /****화면****/

    setButton = (name: "focus" | "relax") => {
        getById<HTMLButtonElement>('btn-focus-start').classList.remove('hide')
        getById<HTMLButtonElement>('btn-focus-start').textContent = name === 'focus' ? 'Focus' : 'Relax'
    }

    hideButton = () => {
        getById<HTMLButtonElement>('btn-focus-start').classList.add('hide')
    }

    /****기타****/
    showInfo = () => {
        this.infoEle.classList.remove('hide')
    }

    closeInfo = () => {
        this.infoEle.classList.add('hide')
    }

    sendToServiceWorker = (type: "start" | "end") => {
        try {
            ServiceWorkerHelper.sendMessageToServiceWorker<any>({
                command: appServiceName.focusmanager,
                type,
                payload: null
            }).then()
        } catch (e) {
            console.log(e)
        }
    }

    receiveFromServiceWorker = (event: MessageEvent) => {
        // console.log('메인 스레드에서 받은 메시지:', event.data)
        const data = event.data as appServiceMessage<any>

        if (data.command !== appServiceName.focusmanager) return

        switch (data.type) {
            case 'display': {
                const payload = data.payload as focusmanagerDisplay
                this.isFocus = payload.isFocus
                this.runningTime = payload.runningTime

                console.log('display', payload)

                this.updateTimeDisplay(this.runningTime, this.isFocus ? 'focus' : 'relax')
                if (this.runningTime <= 0) {

                    new Audio(soundList.bell).play().catch(e => console.log(e))

                    if(this.autoEle.checked){
                        this.sendToServiceWorker('start')
                    }else {
                        this.setButton(this.isFocus ? 'relax' : 'focus')
                    }
                }else {
                    this.hideButton()
                }
                break
            }
            case 'end': {
                this.end()
                break
            }
        }

    }
}
