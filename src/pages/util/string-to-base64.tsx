import {Container, Heading, Stack, Textarea, Text, Button, FormControl, FormLabel,} from "@chakra-ui/react";
import {CardList} from "@/components/Card";
import Head from "next/head";

export const StringToBase64 = () => {

  const convert = () => {
    const inputString = document.getElementById("inputString") as HTMLTextAreaElement;
    const outputString = document.getElementById("outputString") as HTMLTextAreaElement;

    if (inputString.value === "") {
      alert("Input String");
      return;
    }

    outputString.value = btoa(inputString.value);
  }

  const copy = () => {
    const outputString = document.getElementById("outputString") as HTMLTextAreaElement;
    outputString.select();
    try {
      window.navigator.clipboard.writeText(outputString.value).then(
        ()=>{
          alert("Copy");
        }
      );

    } catch (err) {
      console.error("텍스트 복사 실패:", err);
    }
  }

  return (
    <>
      <Head>
        <title>{"kutil: StringToBase64"}</title>
      </Head>
      <Container>
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
              Input String
            </FormLabel>
            <Textarea
              id={"inputString"}
              placeholder={"Input String"}
              resize={"none"}
              h={"200px"}
            />

            <Button
              w={"100%"}
              onClick={convert}
            >
              Convert
            </Button>

            <FormLabel>
              Output String
            </FormLabel>
            <Textarea
              id={"outputString"}
              placeholder={"Output String"}
              resize={"none"}
              h={"200px"}
              readOnly
            />
            <Button
              w={"100%"}
              onClick={copy}
            >
              Copy
            </Button>
          </Stack>
        </FormControl>

        {/*  다른 유틸 페이지 카드뷰 형식으로 보여주기*/}

      </Container>
    </>

  )
}

export default StringToBase64;
