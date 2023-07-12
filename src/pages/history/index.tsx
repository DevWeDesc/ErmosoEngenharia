'use client'
import { Header } from "@/components/Header";
import { Paginaton } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { Flex, SimpleGrid, Box, Text,  Table, Thead, Th, Tr, Tbody, Td, Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Status = dynamic(() => import("../reports/styles").then((mod) => mod.Status), {
  ssr: false,
});

interface ReportsProps {
id: string | number; 
customerName: string;
address: string;
contactOne: string;
contactTwo: string;
registration: string;
iptu: string;
leadNumber: string;
guaranteeValue: string;
status: string;
}

export default function History() {

  const router = useRouter()

  const [closeReports, setCloseReports ] = useState<ReportsProps[]>([])

  async function GetCloseReports() {
    await api.get("/closereports").then((res)=> {
      setCloseReports(res.data)
    }).catch((err)=> {
      console.log(err)
    } )
  }

  useEffect(() => {
    GetCloseReports()
  },[])

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
              <Th color="gray.300" >NOME DO CLIENTE</Th>
              <Th color="gray.300" >MATRICULA</Th>
              <Th color="gray.300" >LEAD</Th>
              <Th color="gray.300" >STATUS</Th>
              <Th color="gray.300" >Concluir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              closeReports.map((report)=> (
                <Tr key={ report.id}>
                  <Td className="text-zinc-300">{report.customerName}</Td>
                  <Td className="text-zinc-300">{report.registration}</Td>
                  <Td className="text-zinc-300">{report.leadNumber}</Td>
                  <Td className="text-zinc-300"><Status color="green">FECHADO</Status></Td>
                  <Td className="text-zinc-300"><Button colorScheme="yellow" onClick={ ()=> router.push(`/history/${report.leadNumber}`)} >DETALHES</Button></Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>

        <Paginaton />
        </Box>
      </SimpleGrid>
    </Flex>
</Flex>
  
  )
}