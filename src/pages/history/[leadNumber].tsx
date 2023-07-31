import { useRouter } from 'next/router';
import { Box, Button, Flex, Text, SimpleGrid, HStack, TableContainer, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { api } from "@/services/api";
import React, { useEffect, useState } from 'react';

interface CompletionReportData {
  id: number;
  leadNumberId: string;
  padrao: string;
  standardApparentAge: string;
  conservationState: string;
  usefulArea: string;
  homogenizedArea: string;
  landArea: string;
  parkingSpaces: string;
  dateReport: string;
}


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
  completionReport: CompletionReportData
}

export default function Forms() {
  
  const router = useRouter();
  const { leadNumber } = router.query;
  
  //@ts-ignore
  const [report, setReport] = useState<ReportProps>({})
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
                <Td>{report.customerName}</Td>
              </Tr>
              <Tr>
                <Td>ENDEREÇO</Td>
                <Td>{report.address}</Td>
              </Tr>
              <Tr>
                <Td>NOME DO CLIENTE</Td>
                <Td>{report.district}</Td>
              </Tr>
              <Tr>
                <Td>CONTATO 01</Td>
                <Td>{report.contactOne}</Td>
              </Tr>
              <Tr>
                <Td>CONTATO 02</Td>
                <Td>{report.contactTwo}</Td>
              </Tr>
              <Tr>
                <Td>LEAD</Td>
                <Td>{report.leadNumber}</Td>
              </Tr>
              <Tr>
                <Td>VALOR DA GARANTIA</Td>
                <Td>{report.guaranteeValue}</Td>
              </Tr>
              <Tr>
                <Td>IDADE APARENTE</Td>
                <Td>{report.completionReport.standardApparentAge}</Td>
              </Tr>
              <Tr>
                <Td>PADRAO</Td>
                <Td>{report.completionReport.padrao}</Td>
              </Tr>
              <Tr>
                <Td>ESTADO DE CONSERVAÇÃO</Td>
                <Td>{report.completionReport.conservationState}</Td>
              </Tr>
              <Tr>
                <Td>ÁREA ÚTIL</Td>
                <Td>{report.completionReport.usefulArea}</Td>
              </Tr>
              <Tr>
                <Td>ÁREA HOMOGENEIZADA</Td>
                <Td>{report.completionReport.homogenizedArea}</Td>
              </Tr>
              <Tr>
                <Td>ÁREA DE TERRENO</Td>
                <Td>{report.completionReport.landArea}</Td>
              </Tr>
              <Tr>
                <Td>VAGAS DE GARAGEM</Td>
                <Td>{report.completionReport.parkingSpaces}</Td>
              </Tr>
              <Tr>
                <Td>DATA DO LAUDO</Td>
                <Td>{report.completionReport.dateReport}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

          : <div>Teste</div>
        }
   

      <HStack justify="center" spacing='25px' py="12">
        <Button colorScheme="yellow">Download do PDF</Button>
        <Button colorScheme="teal" onClick={()=> router.push('/history') }>Voltar</Button>
      </HStack>

      </Box>
    </SimpleGrid>
  </Flex>    
  )
}




