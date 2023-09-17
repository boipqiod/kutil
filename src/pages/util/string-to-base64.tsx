import {Button, Container, FormControl, FormLabel, Heading, Stack, Textarea, useToast,} from "@chakra-ui/react";
import {CardList} from "@/components/Card";
import Head from "next/head";
import {pagesListL} from "@/pages";
import {pageType} from "@/types/page";

export const StringToBase64 = () => {

  const utilPageList = pagesListL.filter(page => page.type === pageType.util && page.path !== "/util/string-to-base64");
  const toast = useToast()

  const convertToBase64 = () => {
    const normalString = document.getElementById("normalString") as HTMLTextAreaElement;
    const base64String = document.getElementById("base64String") as HTMLTextAreaElement;

    if (normalString.value === "") {
      toast({
        title: 'Please input Normal String',
        status: 'warning',
        duration: 3000,
      })
      return;
    }

    base64String.value = btoa(normalString.value);
  }

  const convertToString = () => {
    const normalString = document.getElementById("normalString") as HTMLTextAreaElement;
    const base64String = document.getElementById("base64String") as HTMLTextAreaElement;

    if (base64String.value === "") {
      toast({
        title: 'Please input Base64 String',
        status: 'warning',
        duration: 3000,
      })
      return;
    }

    normalString.value = atob(base64String.value);
  }

  const copy = async (id: string) => {
    const textArea = document.getElementById(id) as HTMLTextAreaElement;
    try {
      await window.navigator.clipboard.writeText(textArea.value)
      toast({
        title: 'Copied',
        status: 'success',
        duration: 2000,
        size: "xl",
      })
    } catch (err) {
      console.error("텍스트 복사 실패:", err);
    }
  }

  const copyNormal = () => {
    copy("normalString").then();
  }

  const copyBase64 = () => {
    copy("base64String").then();
  }



  return (
    <>
      <Head>
        <title>{"kutil: StringToBase64"}</title>
        <meta name="description" content="convert strong to base64"/>
      </Head>
      <Stack>
        <Heading
          size={"lg"}
          textAlign={"center"}
          pt={"40px"}
        >
          StringToBase64
        </Heading>
        <FormControl
          w={"100%"}
          mt={"100px"}
        >
          <Stack>
            <FormLabel>
              Normal String
            </FormLabel>
            <Textarea
              id={"normalString"}
              placeholder={"Normal String"}
              resize={"none"}
              h={"200px"}
            />
            <Stack
              direction={"row"}
            >
              <Button
                w={"25%"}
                onClick={copyNormal}
              >
                Copy Normal
              </Button>
              <Button
                w={"100%"}
                onClick={convertToBase64}
              >
                Convert to Base64
              </Button>
            </Stack>


            <FormLabel>
              Base64 String
            </FormLabel>
            <Textarea
              id={"base64String"}
              placeholder={"Base64 String"}
              resize={"none"}
              h={"200px"}
            />
            <Stack
              direction={"row"}
            >
              <Button
                w={"25%"}
                onClick={copyBase64}
              >
                Copy Base64
              </Button>
              <Button
                w={"100%"}
                onClick={convertToString}
              >
                Convert to String
              </Button>
            </Stack>
          </Stack>
        </FormControl>
        {/*  다른 유틸 페이지 카드뷰 형식으로 보여주기*/}
        <CardList pages={utilPageList}/>
      </Stack>
    </>

  )
}

export default StringToBase64;
