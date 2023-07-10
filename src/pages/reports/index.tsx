import Forms from "@/components/Forms";
import { Header } from "@/components/Header";
import { Paginaton } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { Flex, SimpleGrid, Box, Text,  Table, Thead, Th, Tr, Tbody, Td, Button, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from 'react';


const Status = dynamic(() => import("./styles").then((mod) => mod.Status), {
  ssr: false,
});
export default function Reports() {
  const [ formIsTrue, setFormIsTrue ] = useState<boolean>(true)

  return (
<Flex direction="column" minH="80vh">
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" className="text-xs	">
      <Sidebar />
      <SimpleGrid flex='1' gap="4" minChildWidth="320px" alignItems="flex-start" >
        <Box
        p="6"
        textAlign="center"
        className="bg-slate-900"
        rounded="8"
        minHeight="320px"
        m="2"
        >
        {
        formIsTrue ?
        <>
        
        <Text mb="4" fontWeight="bold" className="text-zinc-300">LAUDOS ABERTOS</Text>
        <Table colorScheme="whatsapp">
          <Thead  >
            <Tr>
              <Th color="gray.300" >NOME DO CLIENTE</Th>
              <Th color="gray.300" >ENDEREÇO</Th>
              <Th color="gray.300" >CONTATOS</Th>
              <Th color="gray.300" >MATRICULA</Th>
              <Th color="gray.300" >IPTU</Th>
              <Th color="gray.300" >LEAD</Th>
              <Th color="gray.300" >VALOR DA GARANTIA</Th>
              <Th color="gray.300" >STATUS</Th>
              <Th color="gray.300" >FORMULÁRIO</Th>

              
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td className="text-zinc-300">FULANDO SILVA LOPES</Td>
              <Td className="text-zinc-300">AVENIDA PAULISTA, 254</Td>
              <Td className="text-zinc-300 !p-2">
                <Flex>(11) 4455-6677</Flex>
                <Flex>(11) 4455-6677</Flex>
              </Td>
              <Td className="text-zinc-300">9999999</Td>
              <Td className="text-zinc-300">88888888</Td>
              <Td className="text-zinc-300">88888888</Td>
              <Td className="text-zinc-300">200.000,00</Td>
              <Td className="text-zinc-300"><Status color="yellow">FINALIZANDO</Status></Td>
              <Td className="text-zinc-300"><Button colorScheme="teal" isDisabled={true} >PREENCHER</Button></Td>
            </Tr>
            <Tr>
              <Td className="text-zinc-300">FULANDO SILVA LOPES</Td>
              <Td className="text-zinc-300">AVENIDA PAULISTA, 254</Td>
              <Td className="text-zinc-300 !p-2">
                <Flex>(11) 4455-6677</Flex>
                <Flex>(11) 4455-6677</Flex>
              </Td>
              <Td className="text-zinc-300">9999999</Td>
              <Td className="text-zinc-300">88888888</Td>
              <Td className="text-zinc-300">88888888</Td>
              <Td className="text-zinc-300">200.000,00</Td>
              <Td className="text-zinc-300"><Status color="yellow">ABERTO</Status></Td>
              <Td className="text-zinc-300"><Button  onClick={()=> setFormIsTrue(false)} colorScheme="teal" isDisabled={false} >PREENCHER</Button></Td>
            </Tr>
            <Tr>
              <Td className="text-zinc-300">FULANDO SILVA LOPES</Td>
              <Td className="text-zinc-300">AVENIDA PAULISTA, 254</Td>
              <Td className="text-zinc-300 !p-2">
                <Flex>(11) 4455-6677</Flex>
                <Flex>(11) 4455-6677</Flex>
              </Td>
              <Td className="text-zinc-300">9999999</Td>
              <Td className="text-zinc-300">88888888</Td>
              <Td className="text-zinc-300">88888888</Td>
              <Td className="text-zinc-300">200.000,00</Td>
              <Td className="text-zinc-300"><Status color="yellow">ABERTO</Status></Td>
              <Td className="text-zinc-300"><Button  onClick={()=> setFormIsTrue(false)} colorScheme="teal" isDisabled={false} >PREENCHER</Button></Td>
            </Tr>
          </Tbody>
        </Table>
        <Paginaton />
        </>
        :
        <>
          <Text mb="4" fontWeight="bold" className="text-zinc-300">FORMULÁRIO</Text>
          <Forms setFormIsTrue={ setFormIsTrue } />
        </>
      }
        </Box>
      </SimpleGrid>
    </Flex>
</Flex>
  
  )
}