import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="./manifest.json"/>
                <meta name="og:title" content={"kutil"}/>
                <meta name="og:description" content="공상헌의 이모저모 페이지입니다."/>
                <meta name="og:type" content="website"/>
                <meta name="og:url" content="https://boipqiod.github.io/kutil"/>
                <meta name="og:image" content="/logo.png"/>
                <meta name="og:site_name" content={"kutil"}/>
                <meta name="og:locale" content="ko_KR"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
