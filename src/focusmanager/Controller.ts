import {getById} from "../utils/domUtils";
import {Audio, soundList} from "../utils/Audio";
import ServiceWorkerHelper from "../utils/ServiceWorkerHelper";

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
    focusTime: number = 0
    relaxTime: number = 0

    isFocus: boolean = true

    timer!: NodeJS.Timer
    startTime: number = 0; // 시작 시간을 저장할 변수

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
        this.originFocusTime = this.focusTime = Number(this.focusEle.value) * 60
        this.originRelaxTime = this.relaxTime = Number(this.relaxEle.value) * 60
        this.updateTimeDisplay(this.focusTime)

        //화면 전환
        this.settingEle.classList.add('hide')
        this.timerEle.classList.remove('hide')

        // 시작 시간 기록
        this.startTime = Date.now();
        this.timer = setInterval(this.timerAction, 100)
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

        if (this.isFocus) {
            this.focusTime = this.originFocusTime - elapsed;
            this.updateTimeDisplay(this.focusTime);
            if (this.focusTime <= 0) {
                clearInterval(this.timer);

                ServiceWorkerHelper.showNotification('Focus Time is over!').then()
                await new Audio().play(soundList.bell)
                if (this.autoEle.checked) this.startRelax()
                else getById<HTMLButtonElement>('btn-relax-start').classList.remove('hide');
            }
        } else {
            this.relaxTime = this.originRelaxTime - elapsed;
            this.updateTimeDisplay(this.relaxTime);
            if (this.relaxTime <= 0) {
                clearInterval(this.timer);

                ServiceWorkerHelper.showNotification('Relax Time is over!').then()
                await new Audio().play(soundList.bell)
                if (this.autoEle.checked) this.startFocus()
                else getById<HTMLButtonElement>('btn-focus-start').classList.remove('hide');
            }
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
        this.relaxTime = Number(this.relaxEle.value) * 60;
        getById<HTMLButtonElement>('btn-relax-start').classList.add('hide');
        getById<HTMLButtonElement>('display-message').textContent = "Relax"
        this.timer = setInterval(this.timerAction, 500);
    }

    // 집중 시작
    startFocus = () => {
        this.startTime = Date.now();
        this.isFocus = true;
        this.focusTime = Number(this.focusEle.value) * 60;
        getById<HTMLButtonElement>('btn-focus-start').classList.add('hide');
        getById<HTMLButtonElement>('display-message').textContent = "Focus"
        this.timer = setInterval(this.timerAction, 500);
    }

    /****기타****/
    showInfo = () => {
        this.infoEle.classList.remove('hide')
    }

    closeInfo = () => {
        this.infoEle.classList.add('hide')
    }
}
