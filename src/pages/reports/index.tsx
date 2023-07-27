'use client'
import { Paginaton } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { Flex, SimpleGrid, Box, Text,  Table, Thead, Th, Tr, Tbody, Td, Button, Input, Select, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { report } from "process";
import { useState, useEffect } from 'react';
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { HiOutlineDocumentDownload } from 'react-icons/hi'

interface ReportsProps {
    id: string | number; 
	customerName: string;
		   adress: string;
		contactOne: string;
		contactTwo: string;
	registration: string;
		      iptu: string;
		leadNumber: string;
guaranteeValue: string;
	      status: string;
     document: []
}
const Status = dynamic(() => import("./styles").then((mod) => mod.Status), {
  ssr: false,
});
export default function Reports() {
  
  const router = useRouter()

  const [reports, setReports] = useState<ReportsProps[]>([])

  async function GetOpenReports() {
    await api.get("/reports").then((res) => {
      setReports(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    GetOpenReports()
  },[])



  return (
<Flex direction="column" minH="80vh">
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar />
      <SimpleGrid flex='1' gap="4" minChildWidth="320px" alignItems="flex-start" >
        <Box
        p="6"
        textAlign="center"
        className="bg-slate-900 text-xs"
        rounded="8"
        minHeight="320px"
        m="2"
        >
        <Text mb="4" fontWeight="bold" className="text-zinc-300">LAUDOS ABERTOS</Text>
        <Table colorScheme="whatsapp">
          <Thead  >
            <Tr>
              <Th color="gray.300" >NOME DO CLIENTE</Th>
              <Th color="gray.300" >ENDEREÇO</Th>
              <Th color="gray.300" >CONTATOS</Th>
              <Th color="gray.300" >DOCUMENTOS</Th>
              <Th color="gray.300" >LEAD</Th>
              <Th color="gray.300" >VALOR DA GARANTIA</Th>
              <Th color="gray.300" >STATUS</Th>
              <Th color="gray.300" >FORMULÁRIO</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              reports.map((report) => (
                <Tr key={report.id}>
                <Td className="text-zinc-300">{report.customerName}</Td>
                <Td className="text-zinc-300">{report.adress}</Td>
                <Td className="text-zinc-300 !p-2">
                  <Flex>{report.contactOne}</Flex>
                  <Flex>{report.contactTwo}</Flex>
                </Td>
                <Td className="text-zinc-300">
                <Menu>
                    <MenuButton colorScheme="whatsapp" as={Button} rightIcon={<IoChevronDownCircleOutline />}>
                      Documentos
                    </MenuButton>
                    <MenuList bgColor="black" fontWeight="bold" overflowY="auto" w="100%" display="flex" flexDirection="column" textAlign="center">
                    {
                      report.document?.map((value, index) => (
                       
                      <MenuItem textAlign="center" bgColor="transparent" as="a" download fontWeight="bold" fontSize="2xl" href={`http://localhost:3333/dowload/${value}`} >Documento: {index}</MenuItem>
                      ))
                    }
                    </MenuList>
                  </Menu>
           
          
               

           
                
                </Td>
                <Td className="text-zinc-300">{report.leadNumber}</Td>
                <Td className="text-zinc-300">{report.guaranteeValue}</Td>
                <Td className="text-zinc-300">{report.status === "open" ? <Status color="yellow">ABERTO</Status> : <Status color="red">FECHADO</Status>}</Td>
                <Td className="text-zinc-300"><Button  onClick={()=> router.push(`/reports/${report.leadNumber}`)} colorScheme="teal" isDisabled={false} >PREENCHER</Button></Td>
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