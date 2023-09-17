import {useSpeedTab} from "@/hooks/game/useSpeedTab";
import {Box, Heading, IconButton, Stack, Text} from "@chakra-ui/react";
import {CommonLayout} from "@/layouts/CommonLayout";
import {SearchIcon} from "@chakra-ui/icons";
import Head from "next/head";

export const SpeedTab = () => {
    const hook = useSpeedTab()

    return (

        <>
            <CommonLayout maxW={"500"}>
                <Stack
                    direction={"row"}
                    w={"100%"}
                    h={"60px"}
                    bg={"#73749d"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    px={"20px"}
                    py={0}
                >
                    <Heading
                        color={"white"}
                    >Tab Game</Heading>

                    <IconButton
                        aria-label='Search database'
                        icon={<SearchIcon />}
                    />
                </Stack>
                <Box
                    id={"tab-area"}
                    w={"100%"}
                    h={"100vw"}
                    bg={"#dfffd2"}
                    onClick={hook.isStarted ? hook.handleTab : hook.start}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {hook.isStarted ? "Tab Here!" : "Tab to Start"}
                </Box>

                <Text
                    zIndex={1}
                    pos={"absolute"}
                    top={"80px"}
                    width={"100%"}
                    textAlign={"center"}
                    left={0}
                    fontSize={"48px"}
                >
                    {hook.time}
                </Text>

                <Text
                    zIndex={1}
                    pos={"absolute"}
                    top={"50%"}
                    left={"0"}
                    width={"100%"}
                    textAlign={"center"}
                    fontSize={"18px"}
                >
                </Text>
                <Text
                    zIndex={1}
                    pos={"absolute"}
                    bottom={"50px"}
                    width={"100%"}
                    textAlign={"center"}
                    left={0}
                    fontSize={"48px"}
                >
                    {hook.tabCount}
                </Text>
            </CommonLayout>
        </>

    )
}

export default SpeedTab