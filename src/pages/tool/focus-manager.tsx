import {Button, FormControl, FormLabel, Heading, Input, Stack, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Head from "next/head";

export const FocusManager = () => {
    const [times, setTimes] = useState({
        focus: 50,
        relax: 10
    });

    const [startTime, setStartTime] = useState<number>(0);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const [texts, setTexts] = useState({
        timeNow: "00:00",
        buttonText: "Start"
    })

    let timer: NodeJS.Timeout | null = null;

    const [isStart, setIsStart] = useState<boolean>(false);

    useEffect(() => {
        if(startTime === 0) return
        timer && clearInterval(timer);
        timer = setInterval(timerAction, 500);
    }, [startTime])

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (!isNaN(parseInt(value))) {
            setTimes({
                ...times,
                [name]: value
            })
        }
    }

    const setStartTimeNow = () => {
        setStartTime(new Date().getTime());
        setIsStart(true);
    }

    const startTimer = () => {
        if(isStart){
        }else{
            setStartTimeNow();
            setTexts(prevTexts => ({
                ...prevTexts,
                buttonText: "Stop"
            }))
            setIsFocus(prevIsFocus => !prevIsFocus);
        }
    }

    const timerAction = () => {
        const now = new Date().getTime();
        const runningTime = (now - startTime);
        const remainingTime = (isFocus ? times.focus : times.relax) * 60000 - runningTime;
        // 밀리초를 분과 초로 변환
        const min = Math.floor(remainingTime / 60000);
        const sec = Math.floor((remainingTime % 60000) / 1000);

        if (remainingTime < 0) {
            console.log("끝")
            new Audio('/assets/bell.mp3').play().catch(e => console.log(e));
            stopTimer();
            return;
        }

        setTexts(prevTexts => ({
            ...prevTexts,
            timeNow: `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`,
        }));
    }

    const stopTimer = () => {
        setStartTime(0);
        setIsStart(false);
        setTexts({
            timeNow: "00:00",
            buttonText: isFocus ? "Relax" : "Focus"
        })
        timer && clearInterval(timer);
    }

    const resetTimer = () => {
        setStartTime(0);
        setIsFocus(false)
        setIsStart(false);
        setTexts({
            timeNow: "00:00",
            buttonText: "Start"
        })
        timer && clearInterval(timer);
    }

    return (
        <>
            <Head>
                <title>{"Focus manager"}</title>
                <meta name="description" content="Focus management service"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Stack
                alignItems={"center"}
                pt={"100px"}
                h={"100%"}
                gap={5}
            >
                <Heading
                    mb={"10px"}
                >Focus Manager</Heading>
                <Stack
                    mb={20}
                    w={"100%"}
                    px={"5%"}
                >
                    <Text
                        fontSize={"2xl"}
                        align={"center"}
                    >Time Set</Text>
                    <Stack
                        direction={"row"}
                        w={{base: "100%", md: "60%"}}
                        m={"auto"}
                    >
                        <Stack
                            w={"50%"}
                        >
                            <Text
                                fontSize={"sm"}
                            >
                                Focus Time (minutes)
                            </Text>
                            <Input
                                disabled={isStart}
                                type={'number'}
                                placeholder={"enter focus minutes"}
                                name={"focus"}
                                min={1}
                                max={60}
                                defaultValue={50}
                                onChange={handleTimeChange}
                            />
                        </Stack>
                        <Stack
                            w={"50%"}
                        >
                            <Text
                                fontSize={"sm"}
                            >
                                Relax Time (minutes)
                            </Text>
                            <Input
                                disabled={isStart}
                                type={'number'}
                                placeholder={"enter relax minutes"}
                                name={"relax"}
                                min={1}
                                max={60}
                                defaultValue={10}
                                onChange={handleTimeChange}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack>
                    <Text
                        fontSize={"2xl"}
                        align={"center"}
                    >Timer</Text>
                    <Heading
                        size={"2xl"}
                        mb={20}
                    >
                        {texts.timeNow}
                    </Heading>
                </Stack>
                <Button
                    w={{base: "100%", md: "80%"}}
                    onClick={() => {
                        if (isStart) {
                            resetTimer();
                        } else {
                            startTimer();
                        }
                    }}
                    disabled={isStart}
                >
                    {texts.buttonText}
                </Button>
            </Stack>
        </>
    );
}

export default FocusManager;