import {useEffect, useState} from "react";

export const useSpeedTab = () => {

    const [isStarted, setIsStarted] = useState<boolean>(false)
    const [time, setTime] = useState<string>("")
    const [tabCount, setTabCount] = useState<number>(0)

    let timer: ReturnType<typeof setInterval>;
    let startTime: number = 0


    const start = () => {
        console.log("start")
        setIsStarted(true)
        setTabCount(0)
        startTime = new Date().getTime() + 1000 * 10
        timer = setInterval(timerAction, 30)
    }

    const end = () => {
        clearInterval(timer)
        setTime("")
        alert("The End")
        setIsStarted(false)
    }

    const timerAction = () => {
        const now = new Date().getTime()
        const distance = startTime - now
        const seconds = Math.floor(distance / 1000)
        const milliseconds = Math.floor((distance % 1000) / 10)
        setTime(`${seconds}.${milliseconds}`)
        //0초 이하면 종료
        if(seconds <= 0 && milliseconds <= 0) {
            end()
        }
    }

    const handleTab = () => {
        setTabCount(tabCount + 1)
    }

    return {
        time, tabCount, isStarted,
        start, handleTab
    }
}
