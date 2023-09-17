import {usePage} from "@/hooks/common/usePage";
import {Stack, Text} from "@chakra-ui/react";
import {pageInfo} from "@/types/page";

export const Card = (page: pageInfo) => {
  const {toUrl} = usePage()
  return (
    <Stack
      h={"100%"}
      bg={"white"}
      _hover={{
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      }}
      boxShadow={"0 0 3px 0 rgba(0, 0, 0, 0.2)"}
      borderRadius={"10px"}
      p={"10px"}
      onClick={() => {
        toUrl(page.path).then()
      }}
    >
      <Text
        textAlign={"center"}
        size={"md"}
        fontWeight={"bold"}
      >{page.title}
      </Text>
      <Text
        textAlign={"center"}
        size={"sm"}
      >{page.description}
      </Text>
    </Stack>
  )
}

export const CardList = (props: { pages: pageInfo[] }) => {
  return (
    <Stack
      w={"100%"}
      h={"100%"}
      p={"10px"}
      spacing={"10px"}
      flexWrap={"wrap"}
      justifyContent={"start"}
      direction={{base: "column", md: "row"}}
    >
      {props.pages.map((page, index) => {
        return (
          <Stack
            key={index}
            w={{base: "100%", md: "calc(50% - 10px)", lg: "calc(33.333333% - 10px)"}}
            h={{base: "100%", md: "calc(50% - 10px)", lg: "calc(33.333333% - 10px)"}}
            p={"10px"}
          >
            <Card {...page} />
          </Stack>
        )
      })}
    </Stack>
  )
}
