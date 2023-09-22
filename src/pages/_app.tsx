import type {AppProps} from 'next/app'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import "@/styles/index.css"
import Head from "next/head";
import {CommonLayout} from "@/layouts/CommonLayout";

const theme = extendTheme({
    breakpoints: {
        sm: "300px",
        md: "720px",
        lg: "960px",
        xl: "1200px",
    },
    styles: {
        global: {
            html: {
                fontSize: '14px',
                backgroundColor: "#d9d9d9",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
            },
        },
    },
});

export default function App({Component, pageProps}: AppProps) {

    return (
        <>
            <ChakraProvider theme={theme}>
                <CommonLayout>
                    <Component {...pageProps} />
                </CommonLayout>
            </ChakraProvider>
        </>

    )
}
