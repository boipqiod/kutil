import Head from "next/head";
import {useDropzone} from 'react-dropzone';
import {Heading, Stack, Textarea, Text, Button} from "@chakra-ui/react";
import {useState} from "react";
import {pagesListL} from "@/pages";
import {pageType} from "@/types/page";
import {CardList} from "@/components/Card";

export const FileToBase64 = () => {

  const utilPageList = pagesListL.filter(page => page.type === pageType.util && page.path !== "/util/string-to-base64");
  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFileName(acceptedFiles[0].name)
    setFile(acceptedFiles[0])
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
  });

  const convertToBase64 = () => {
    const base64String = document.getElementById("base64String") as HTMLTextAreaElement;

    if (file === null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      base64String.value = reader.result as string;
    }
  }

  return (
    <>
      <Head>
        <title>{"FileToBase64"}</title>
        <meta name="description" content="어떤 파일이든 Base64로 인코딩"/>
      </Head>
      <Stack>
        <Heading
          size={"lg"}
          textAlign={"center"}
          pt={"40px"}
        >
          FileToBase64
        </Heading>

        <Stack
          alignItems={"center"}
        >
          <Stack
            position={"relative"}
            width={"60%"}
            height={"200px"}
            textAlign={"center"}
            justifyContent={"center"}
            mt={"100px"}
            shadow={"md"}
            borderWidth={"1px"}
            {...getRootProps()}
          >
            <Stack
              position={"absolute"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              opacity={isDragActive ? 0.5 : 0}
              transition={"opacity 0.2s"}
              zIndex={isDragActive ? 2 : -1}
              backgroundColor={"black"}
            >
          </Stack>
            <input
              style={{width: "100%", height: "100%"}}
              {...getInputProps()} />
            <Heading size={"sm"}>
              {
                fileName === "" ?
                isDragActive ? "Drop!" : "Drop any file!" :
                  isDragActive ? "Drop!" : fileName
              }
            </Heading>
          </Stack>
        </Stack>
        <Button
          mt={"50px"}
          w={"100%"}
          onClick={convertToBase64}
        >
          Convert to Base64
        </Button>
        <Stack
          justifyContent={"center"}>
          <Text>
            Base64
          </Text>
          <Textarea
            id={"base64String"}
            placeholder={"Base64 String"}
            h={"300px"}
          />
        </Stack>
        <CardList pages={utilPageList}/>
      </Stack>
    </>
  )
}

export default FileToBase64;
