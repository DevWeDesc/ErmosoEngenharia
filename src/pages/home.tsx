'use client'
import { Sidebar } from "@/components/Sidebar";
import { Flex, SimpleGrid, Box, Text,  } from "@chakra-ui/react";
import { Charts } from "@/components/Charts";

export default function Home() {

  return (
<Flex direction="column" h="80vh">
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar />
      <SimpleGrid flex='1' gap="4" minChildWidth="320px" alignItems="flex-start" >
        <Box
        p="8"
        textAlign="center"
        className="bg-slate-900"
        rounded="8"
        height="320px"
        m="2"
        >
          <Text fontSize="lg" mb="4" className="text-zinc-300">
            Laudos enviados na semana
          </Text>
          <Charts />
        </Box>

        <Box
        p="8"
        className="bg-slate-900"
        rounded="8"
        m="2"
        textAlign="center"
        height="320px"
        >
          <Text fontSize="lg" mb="4" className="text-zinc-300">
           Laudos Recebidos
          </Text>
          <Charts />
        </Box>
      </SimpleGrid>
    </Flex>
</Flex>
  
  )
}