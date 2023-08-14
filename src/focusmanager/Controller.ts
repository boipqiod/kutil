import {getById} from "../common/domUtils";

export class Controller{
    private static shared: Controller

    focusEle: HTMLInputElement //집중 시간 엘리멘트
    relaxEle: HTMLInputElement

    settingEle: HTMLDivElement
    timerEle: HTMLDivElement

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

        this.settingEle = getById<HTMLInputElement>('setting')
        this.timerEle = getById<HTMLInputElement>('timer')

        if(Controller.shared)
            return Controller.shared
        else{
            Controller.shared = this
        }
    }


    /****초기화****/
    //이벤트 리스너 등록 등 초기화 함수
    init = () =>{
        //스타트 버튼 액션 이벤트 리스너 등
        getById<HTMLButtonElement>('btn-start').addEventListener('click', this.startAction)
        getById<HTMLButtonElement>('btn-relax-start').addEventListener('click', this.startRelax);
        getById<HTMLButtonElement>('btn-focus-start').addEventListener('click', this.startFocus);

    }
    //이벤트 리스너 함수
    startAction = () =>{
        if(
            this.focusEle.value === "" ||
            this.relaxEle.value === "" ||
            Number(this.focusEle.value) <= 0 ||
            Number(this.relaxEle.value) <= 0
        ){
            alert("입력 값을 확인해주세요")
            return
        }
        const isStart = confirm("시작하시겠습니까?")

        if(isStart) this.start()
    }

    /****진행****/
    //타이머 시작
    start = () =>{
        // 시간 저장 (분을 초로 변환)
        this.originFocusTime = this.focusTime = Number(this.focusEle.value) * 60
        this.originRelaxTime = this.relaxTime = Number(this.relaxEle.value) * 60
        this.updateTimeDisplay(this.originFocusTime)

        //화면 전환
        this.settingEle.classList.add('hide')
        this.timerEle.classList.remove('hide')

        // 시작 시간 기록
        this.startTime = Date.now();
        this.timer = setInterval(this.timerAction, 500)
    }

    // 타이머 액션
    timerAction = () => {
        const elapsed = (Date.now() - this.startTime) / 1000; // 초 단위로 경과 시간 계산

        if (this.isFocus) {
            this.focusTime = this.originFocusTime - elapsed;
            this.updateTimeDisplay(this.focusTime);
            if (this.focusTime <= 0) {
                clearInterval(this.timer);
                alert("집중 시간이 끝났습니다!");
                // 휴식 시작 버튼 표시
                getById<HTMLButtonElement>('btn-relax-start').classList.remove('hide');
            }
        } else {
            this.relaxTime = this.originRelaxTime - elapsed;
            this.updateTimeDisplay(this.relaxTime);
            if (this.relaxTime <= 0) {
                clearInterval(this.timer);
                alert("휴식 시간이 끝났습니다!");
                // 집중 시작 버튼 표시
                getById<HTMLButtonElement>('btn-focus-start').classList.remove('hide');
            }
        }
    }
// 시간을 00:00 형식으로 표시
    updateTimeDisplay(timeInSeconds: number) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        getById('display-timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // 휴식 시작
    startRelax = () => {
        this.isFocus = false;
        this.relaxTime = this.originRelaxTime;
        getById<HTMLButtonElement>('btn-relax-start').classList.add('hide');
        this.timer = setInterval(this.timerAction, 500);
    }

    // 집중 시작
    startFocus = () => {
        this.isFocus = true;
        this.focusTime = this.originFocusTime;
        getById<HTMLButtonElement>('btn-focus-start').classList.add('hide');
        this.timer = setInterval(this.timerAction, 500);
    }
}