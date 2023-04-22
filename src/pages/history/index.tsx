import { Header } from "@/components/Header";
import { Paginaton } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { Flex, SimpleGrid, Box, Text,  Table, Thead, Th, Tr, Tbody, Td, Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Status = dynamic(() => import("../reports/styles").then((mod) => mod.Status), {
  ssr: false,
});
export default function History() {

  return (
<Flex direction="column" h="80vh">
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
        <Text mb="4" fontWeight="bold" className="text-zinc-300">LAUDOS CONCLUÍDOS</Text>
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
              <Td className="text-zinc-300"  >SÃO BERNARDO</Td>
              <Td className="text-zinc-300"  >140 m2</Td>
              <Td className="text-zinc-300"  ><Status color="green">FINALIZADO</Status></Td>
              <Td className="text-zinc-300"  ><Button colorScheme="yellow" isDisabled={false} >DETALHES</Button></Td>
            </Tr>
            <Tr>
              <Td className="text-zinc-300"  >SALA COMERCIAL</Td>
              <Td className="text-zinc-300"  >SOROCABA</Td>
              <Td className="text-zinc-300"  >78 m2</Td>
              <Td className="text-zinc-300"  ><Status color="green">FINALIZADO</Status></Td>
              <Td className="text-zinc-300"  ><Button colorScheme="yellow" isDisabled={false} >DETALHES</Button></Td>
            </Tr>
            <Tr>
              <Td className="text-zinc-300"  >CASA</Td>
              <Td className="text-zinc-300"  >MINAS GERAIS</Td>
              <Td className="text-zinc-300"  >180 m2</Td>
              <Td className="text-zinc-300"  ><Status color="green">FINALIZADO</Status></Td>
              <Td className="text-zinc-300"  ><Button colorScheme="yellow" isDisabled={false} >DETALHES</Button></Td>
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