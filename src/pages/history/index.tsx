'use client'
import { Sidebar } from "@/components/Sidebar";
import { api } from "@/services/api";
import { Flex, SimpleGrid, Box, Text,  Table, Thead, Th, Tr, Tbody, Td, Button, Menu, MenuButton, MenuList, MenuItem, Input } from "@chakra-ui/react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
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
document: [];
}

export default function History() {

  const router = useRouter()

  const [filteredReports, setFilteredReports] = useState<ReportsProps[]>([])
  const [allReports, setAllReports] = useState<ReportsProps[]>([]);

  async function GetCloseReports() {
    await api.get("/closereports").then((res)=> {
      setFilteredReports(res.data)
      setAllReports(res.data);
    }).catch((err)=> {
      console.log(err)
    } )
  }

  useEffect(() => {
    GetCloseReports()
  },[])

  
  async function handleFilterReports(event: string) {
    if (event.length === 0) {
      setFilteredReports(allReports);
      return;
    }
    setFilteredReports(allReports.filter((report) => 
      report.leadNumber.includes(event) || report.customerName.toLowerCase().includes(event.toLowerCase()))
    );
  }


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
        minHeight="320px"
        maxHeight="420px"
        overflowY={'auto'}
        m="2"
        >
        <Text mb="4" fontWeight="bold" className="text-zinc-300">LAUDOS CONCLUÍDOS</Text>
        <Input 
          color={"white"}
          placeholder="Digite o código do LEAD ou nome do cliente para pesquisar..."
          marginBottom={12}
          onChange={(event)=> handleFilterReports(event.target.value)}
        />

        <Table colorScheme="whatsapp">
          <Thead  >
            <Tr >
              <Th color="gray.300" >NOME DO CLIENTE</Th>
              <Th color="gray.300" >ENDEREÇOS</Th>
              <Th color="gray.300" >DOCUMENTOS</Th>
              <Th color="gray.300" >LEAD</Th>
              <Th color="gray.300" >STATUS</Th>
              <Th color="gray.300" >DETALHES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              filteredReports.map((report)=> (
                <Tr key={ report.id}>
                  <Td className="text-zinc-300">{report.customerName}</Td>
                  <Td className="text-zinc-300">{report.address}</Td>
                  <Td className="text-zinc-300">
                <Menu>
                    <MenuButton colorScheme="whatsapp" as={Button} rightIcon={<IoChevronDownCircleOutline />}>
                      Documentos
                    </MenuButton>
                    <MenuList bgColor="black" fontWeight="bold" overflowY="auto" w="100%" display="flex" flexDirection="column" textAlign="center">
                    {
                      report.document?.map((value, index) => (
                       
                      <MenuItem textAlign="center" bgColor="transparent" as="a" download fontWeight="bold" fontSize="2xl" href={`http://localhost:3333/dowload/${value}`} >Documento: {index +1}</MenuItem>
                      ))
                    }
                    </MenuList>
                  </Menu>
                </Td>
                  <Td className="text-zinc-300">{report.leadNumber}</Td>
                  <Td className="text-zinc-300"><Status color="green">FECHADO</Status></Td>
                  <Td className="text-zinc-300"><Button colorScheme="yellow" onClick={ ()=> router.push(`/history/${report.leadNumber}`)} >VER DETALHES</Button></Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
        </Box>
      </SimpleGrid>
    </Flex>
  </Flex>
  )
}