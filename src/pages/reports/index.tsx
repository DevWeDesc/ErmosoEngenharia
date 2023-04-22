import { Header } from "@/components/Header";
import { Paginaton } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { Flex, SimpleGrid, Box, Text,  Table, Thead, Th, Tr, Tbody, Td, Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";


const Status = dynamic(() => import("./styles").then((mod) => mod.Status), {
  ssr: false,
});
export default function Reports() {

  return (
<Flex direction="column" h="100vh">
    <Header />
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar />
      <SimpleGrid flex='1' gap="4" minChildWidth="320px" alignItems="flex-start" >
        <Box
        p="8"
        textAlign="center"
        className="bg-slate-900
        "
        rounded="8"
        minHeight="320px"
        m="2"
        >
        <Text mb="4" fontWeight="bold" className="text-zinc-300">LAUDOS ABERTOS</Text>
        <Table colorScheme="whatsapp">
          <Thead  >
            <Tr >
              <Th color="gray.300" >TIPO DE IMÓVEL</Th>
              <Th color="gray.300" >REGIÃO</Th>
              <Th color="gray.300" >ÁREA PRIVADA</Th>
              <Th color="gray.300" >STATUS</Th>
              <Th color="gray.300" >Concluir</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td className="text-zinc-300"  >APARTAMENTO</Td>
              <Td className="text-zinc-300"  >SÃO PAULO</Td>
              <Td className="text-zinc-300"  >150 m2</Td>
              <Td className="text-zinc-300"  ><Status color="yellow">FINALIZANDO</Status></Td>
              <Td className="text-zinc-300"  ><Button colorScheme="teal" isDisabled={true} >PREENCHER</Button></Td>
            </Tr>
            <Tr>
              <Td className="text-zinc-300"  >CASA</Td>
              <Td className="text-zinc-300"  >SOROCABA</Td>
              <Td className="text-zinc-300"  >230 m2</Td>
              <Td className="text-zinc-300"  ><Status color="red">ABERTO</Status></Td>
              <Td className="text-zinc-300"  ><Button colorScheme="teal" isDisabled={false} >PREENCHER</Button></Td>
            </Tr>
            <Tr>
              <Td className="text-zinc-300"  >SALA COMERCIAL</Td>
              <Td className="text-zinc-300"  >SANTO ANDRÉ</Td>
              <Td className="text-zinc-300"  >84 m2</Td>
              <Td className="text-zinc-300"  ><Status color="red">ABERTO</Status></Td>
              <Td className="text-zinc-300"  ><Button colorScheme="teal" isDisabled={false} >PREENCHER</Button></Td>
            </Tr>
          </Tbody>
        </Table>
        <Paginaton />
        </Box>
      </SimpleGrid>
    </Flex>
</Flex>
  
  )
}