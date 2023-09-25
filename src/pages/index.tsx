import Head from 'next/head'
import {Heading, Stack, Text} from "@chakra-ui/react";
import {usePage} from "@/hooks/common/usePage";
import {pageInfo, pageType} from "@/types/page";
import {CardList} from "@/components/Card";

export const pagesListL: pageInfo[] = [
    {
        title: "StringToBase64",
        description: "문자열을 Base64로 인코딩",
        path: "/util/string-to-base64",
        type: pageType.util,
    },
    {
        title: "FileToBase64",
        description: "파일을 Base64로 인코딩",
        path: "/util/file-to-base64",
        type: pageType.util,
    },
    {
        title: "PngToJpg",
        description: "PNG 파일을 JPG 파일로 변환",
        path: "/util/png-to-jpg",
        type: pageType.util,
    },
    {
        title: "FocusManager",
        description: "집중 시간 관리 서비스",
        path: "/tool/focus-manager",
        type: pageType.tool,
    }
]

const Section = (props: { pageType: pageType, pages: pageInfo[] }) => {
    return (
        <Stack
            w={"100%"}
            h={"100%"}
            p={"10px"}
        >
            <Heading
                w={"100%"}
                textAlign={"center"}
                size={"lg"}
            >{props.pageType}
            </Heading>
            <CardList pages={props.pages}/>
        </Stack>
    )
}

export const Home = () => {
    return (
        <>
            <Head>
                <title>{"kutil"}</title>
                <meta name="description" content="공상헌의 이모저모 페이지입니다"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Stack
                mt={"100px"}
            >
                <Heading
                    w={"100%"}
                    textAlign={"center"}
                >{"Kong's Util"}
                </Heading>
                <Heading
                    w={"100%"}
                    textAlign={"center"}
                    size={"md"}
                >{"공상헌의 이모저모 페이지"}
                </Heading>
            </Stack>
            <Stack
                mt={"50px"}
            >
                {
                    Object.values(pageType).map((type, index) => {
                        const pages = pagesListL.filter(page => page.type === type)
                        if (pages.length !== 0)
                            return (
                                <Section
                                    key={index}
                                    pageType={type}
                                    pages={pages}
                                />
                            )
                    })
                }
            </Stack>

        </>
    )
}

export default Home
