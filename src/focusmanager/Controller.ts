import {getById} from "../utils/domUtils";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";
import {appServiceName} from "../utils/tpyes";
import {soundList} from "../utils/Audio";

export class Controller {
    private static shared: Controller

    focusEle: HTMLInputElement
    relaxEle: HTMLInputElement

    autoEle: HTMLInputElement

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
        getById<HTMLButtonElement>('btn-relax-start').addEventListener('click', this.startRelax);
        getById<HTMLButtonElement>('btn-focus-start').addEventListener('click', this.startFocus);
        getById<HTMLButtonElement>('btn-info').addEventListener('click', this.showInfo);
        this.infoEle.addEventListener('click', this.closeInfo)
    }
    //이벤트 리스너 함수
    startAction = () => {
        if (
            this.focusEle.value === "" ||
            this.relaxEle.value === "" ||
            Number(this.focusEle.value) <= 0 ||
            Number(this.relaxEle.value) <= 0
        ) {
            alert("입력 값을 확인해주세요")
            return
        }
        this.start()
    }

    /****진행****/
        //타이머 시작
    start = () => {
        // 시간 저장 (분을 초로 변환)
        this.originFocusTime = this.runningTime = Number(this.focusEle.value) * 60
        this.originRelaxTime = Number(this.relaxEle.value) * 60
        this.updateTimeDisplay(this.runningTime)

        //화면 전환
        this.settingEle.classList.add('hide')
        this.timerEle.classList.remove('hide')

        // 시작 시간 기록
        this.startTime = Date.now();
        this.isRunning = true
        this.timer = setInterval(this.timerAction, 100)
        this.isFocus = true

        ServiceWorkerHelper.sendMessageToServiceWorker<string>({
            command: appServiceName.focusmanager,
            payload: 'start'
        }).then((res) => {
                console.log('메인 스레드에서 받은 메시지:', res);
            }
        ).catch(e => {
            console.log('메인 스레드에서 받은 메시지:', e);
        })
    }

    end = () => {
        //값 초기화
        this.timerEle.classList.add('hide')
        this.settingEle.classList.remove('hide')
        this.isFocus = true
        clearInterval(this.timer)
    }

    // 타이머 액션
    timerAction = async () => {
        const elapsed = (Date.now() - this.startTime) / 1000; // 초 단위로 경과 시간 계산

        this.runningTime = this.originFocusTime - elapsed * 100;
        this.updateTimeDisplay(this.runningTime);
        if (this.runningTime <= 0) {
            clearInterval(this.timer)

            console.log('타이머 종료')
            console.log('this.isRunning:', this.isRunning)
            if (!this.isRunning) return
            this.isRunning = false

            ServiceWorkerHelper.showNotification(
                this.isFocus ? 'Focus Time is over!' : 'Relax Time is over!'
            ).then( () => {
                console.log('showNotification success')
            }).catch((e) => {
                    console.log('showNotification error:', e)
            })
            await new Audio(soundList.bell).play()
            if (this.autoEle.checked) this.isFocus ? this.startRelax() : this.startFocus()
            else this.isFocus ? getById<HTMLButtonElement>('btn-relax-start').classList.remove('hide') : getById<HTMLButtonElement>('btn-focus-start').classList.remove('hide');
        }
    }

// 시간을 00:00 형식으로 표시
    updateTimeDisplay(timeInSeconds: number) {
        const _timeInSeconds = timeInSeconds <= 0 ? 0 : timeInSeconds
        const minutes = Math.floor(_timeInSeconds / 60);
        const seconds = Math.floor(_timeInSeconds % 60);
        getById('display-timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // 휴식 시작
    startRelax = () => {
        this.startTime = Date.now();
        this.isFocus = false;
        this.runningTime = Number(this.relaxEle.value) * 60;
        getById<HTMLButtonElement>('btn-relax-start').classList.add('hide');
        getById<HTMLButtonElement>('display-message').textContent = "Relax"
        this.isRunning = true
        this.timer = setInterval(this.timerAction, 100);
    }

    // 집중 시작
    startFocus = () => {
        this.startTime = Date.now();
        this.isFocus = true;
        this.runningTime = Number(this.focusEle.value) * 60;
        getById<HTMLButtonElement>('btn-focus-start').classList.add('hide');
        getById<HTMLButtonElement>('display-message').textContent = "Focus"
        this.isRunning = true
        this.timer = setInterval(this.timerAction, 100);
    }

    /****기타****/
    showInfo = () => {
        this.infoEle.classList.remove('hide')
    }

    closeInfo = () => {
        this.infoEle.classList.add('hide')
    }
}
