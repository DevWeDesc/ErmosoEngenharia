import { useRouter } from 'next/router';
import { Box, Button, Flex, Text, SimpleGrid, HStack, TableContainer, Table, Tbody, Tr, Td, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { api } from "@/services/api";
import React, { useEffect, useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5'


interface ReportProps {
  id: number;
  customerName: string;
  address: string;
  district: string;
  cep: string;
  neighbour: string;
  state: string;
  contactOne: string;
  contactTwo: string;
  registration: string;
  iptu: string;
  leadNumber: string;
  guaranteeValue: string;
  status: string;
  leadNumberId: string;
  padrao: string;
  standardApparentAge: string;
  conservationState: string;
  usefulArea: string;
  homogenizedArea: string;
  landArea: string;
  parkingSpaces: string;
  dateReport: string;
  document: [];
}

export default function Forms() {
  
  const router = useRouter();
  const { leadNumber } = router.query;

  const [report, setReport] = useState<ReportProps>()
  const [renderReport, setRenderReport] = useState(false)

  async function getReport() {
    await api.get(`/report/${leadNumber}`).then((res)=> {
      setReport(res.data)
      setRenderReport(true)
    }).catch((err)=> {
      console.log(err)
    } )
  }

  useEffect (()=> {
    getReport()
    
  },[])
  return (
    
  <Flex w="75%" my="20" maxWidth={1480} mx="auto" px="6">
    <SimpleGrid flex='1' gap="4" alignItems="flex-start" >
      <Box
        p="6"
        textAlign="center"
        className="bg-slate-900 text-xs"
        rounded="8"
        m="2"
      >
      <Text mb="4" fontWeight="bold" className="text-base text-zinc-300">DETALHES DO LAUDO {leadNumber}</Text>
      <Text mb="4" mt="12" fontWeight="bold" className="text-zinc-300">DADOS DO CLIENTE</Text>
      {
        renderReport ?
          <TableContainer>
            <Table variant='simple'className='text-white' >
              <Tbody>
                <Tr>
                  <Td>NOME DO CLIENTE</Td>
                  <Td>{report?.customerName}</Td>
                </Tr>
                <Tr>
                  <Td>ENDEREÇO</Td>
                  <Td>{report?.address}</Td>
                </Tr>
                <Tr>
                  <Td>NOME DO CLIENTE</Td>
                  <Td>{report?.district}</Td>
                </Tr>
                <Tr>
                  <Td>CONTATO 01</Td>
                  <Td>{report?.contactOne}</Td>
                </Tr>
                <Tr>
                  <Td>CONTATO 02</Td>
                  <Td>{report?.contactTwo}</Td>
                </Tr>
                <Tr>
                  <Td>LEAD</Td>
                  <Td>{report?.leadNumber}</Td>
                </Tr>
                <Tr>
                  <Td>VALOR DA GARANTIA</Td>
                  <Td>{report?.guaranteeValue}</Td>
                </Tr>
                <Tr>
                  <Td>IDADE APARENTE</Td>
                  <Td>{report?.standardApparentAge}</Td>
                </Tr>
                <Tr>
                  <Td>PADRAO</Td>
                  <Td>{report?.padrao}</Td>
                </Tr>
                <Tr>
                  <Td>ESTADO DE CONSERVAÇÃO</Td>
                  <Td>{report?.conservationState}</Td>
                </Tr>
                <Tr>
                  <Td>ÁREA ÚTIL</Td>
                  <Td>{report?.usefulArea}</Td>
                </Tr>
                <Tr>
                  <Td>ÁREA HOMOGENEIZADA</Td>
                  <Td>{report?.homogenizedArea}</Td>
                </Tr>
                <Tr>
                  <Td>ÁREA DE TERRENO</Td>
                  <Td>{report?.landArea}</Td>
                </Tr>
                <Tr>
                  <Td>VAGAS DE GARAGEM</Td>
                  <Td>{report?.parkingSpaces}</Td>
                </Tr>
                <Tr>
                  <Td>DATA DO LAUDO</Td>
                  <Td>{report?.dateReport}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        : <div> <Text>Carregando...</Text> </div>
      }
   
      <HStack justify="center" spacing='25px' py="12">
        <Menu>
          <MenuButton colorScheme="yellow" as={ Button } rightIcon={ <IoChevronDownCircleOutline /> }>
            Download do PDF
          </MenuButton>
          <MenuList bgColor="black" fontWeight="bold" overflowY="auto" w="100%" display="flex" flexDirection="column" textAlign="center">
          {
            report?.document.map((value, index) => (
              <MenuItem textAlign="center" bgColor="transparent" as="a" download fontWeight="bold" fontSize="2xl" href={`http://localhost:3333/dowload/${value}`}>
                Documento: {index +1}
              </MenuItem>
            ))
          }
          </MenuList>
        </Menu>
        <Button colorScheme="teal" onClick={()=> router.push('/history') }>Voltar</Button>
      </HStack>

      </Box>
    </SimpleGrid>
  </Flex>    
  )
}




