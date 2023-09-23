import Head from "next/head";
import {useDropzone} from 'react-dropzone';
import {Heading, Stack, Textarea, Text, Button} from "@chakra-ui/react";
import {useState} from "react";
import {pagesListL} from "@/pages";
import {pageType} from "@/types/page";
import {CardList} from "@/components/Card";
import JSZip from "jszip";
import {saveAs} from "file-saver";



export const PngToJpg = () => {

    const utilPageList = pagesListL.filter(page => page.type === pageType.util && page.path !== "/util/png-to-jpg");
    const [fileName, setFileName] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [resultImages, setResultImages] = useState<string[]>([]);
    const [resultJpgFiles, setResultJpgFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        reset()
        setFiles(acceptedFiles)
        acceptedFiles.forEach((file) => {
            setFileName(prevState => prevState + file.name + ", ");
        })

    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
        }
    });

    const reset = () => {
        setFileName("");
        setFiles([]);
        setResultImages([]);
        setResultJpgFiles([]);
    }
    const dataURLtoBlob = (dataUrl: string): Blob => {
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const convertImageToFile = (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/jpeg');
                const blob = dataURLtoBlob(dataUrl);
                const newFile = new File([blob], file.name.toLowerCase().replace('.png', '.jpg'), { type: 'image/jpeg' });
                resolve(newFile);
            };
            img.onerror = () => {
                reject(new Error('Image loading failed'));
            };
        });
    };

    const convertToJpg = async () => {
        try {
            const promises = files.map(convertImageToFile);
            const resultJpgFiles = await Promise.all(promises);
            setResultJpgFiles(resultJpgFiles);
            const resultImages = resultJpgFiles.map(file => URL.createObjectURL(file));
            setResultImages(resultImages);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const downloadZip =  async () => {
        const zip = new JSZip();
        resultJpgFiles.forEach(file => {
            zip.file(file.name, file);
        })
        const content = await zip.generateAsync({type:"blob"});
        saveAs(content, "png-to-jpg.zip");
    }

    return (
        <>
            <Head>
                <title>{"PNG to JPG"}</title>
                <meta name="description" content="PNG 파일을 JPG 파일로 변환"/>
            </Head>
            <Stack>
                <Heading
                    size={"lg"}
                    textAlign={"center"}
                    pt={"40px"}
                >
                    PNG to JPG
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
                                    isDragActive ? "Drop!" : "Drop any PNG Images!" :
                                    isDragActive ? "Drop!" : fileName
                            }
                        </Heading>
                    </Stack>
                </Stack>
                <Button
                    mt={"50px"}
                    w={"100%"}
                    onClick={convertToJpg}
                >
                    Convert to JPG
                </Button>
                <Stack
                    w={"100%"}
                    direction={"row"}
                    wrap={"wrap"}
                    >
                    {
                        resultImages.map((image, index) => {
                            return (
                                <img
                                    key={index}
                                    src={image}
                                    alt={"result"}
                                    width={"20%"}
                                />
                            )
                        })
                    }
                </Stack>

                {
                    resultImages.length !== 0 &&
                    <Button onClick={downloadZip}>Download for zip</Button>
                }
                <hr/>
                <CardList pages={utilPageList}/>
            </Stack>
        </>
    )
}

export default PngToJpg;
