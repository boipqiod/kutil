import React, {ReactNode} from "react";
import {Box, Stack} from "@chakra-ui/react";

type CommonLayoutProps = {
    children: ReactNode
    maxW?: string
}

export const CommonLayout = (props:CommonLayoutProps) => {
    return (
        <Stack
            w={"100vw"}
            p={0}
            m={0}
        >
            <Box
                maxW={props.maxW || "800px"}
                w={"100vw"}
                bg={"white"}
                m={"auto"}
            >
                {props.children}
            </Box>
        </Stack>
    )
}
