import { Header } from "@/components/Header";
import { Paginaton } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { Flex, SimpleGrid, Box, Table, Thead, Th, Tr, Tbody, Td, Button, Heading, Icon, Link } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
export default function Users() {
  return (
<Flex direction="column"h="80vh">
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
        <Flex mb="8" justify="space-between" align="center" direction="column">
          <Flex m="2" align="center" w="100%" justify='space-between'>
          <Heading className="text-zinc-300" size="lg" fontWeight="normal">Usúarios</Heading>
            <Link href='/users'>
              <Button as="a"size="sm" fontSize="sm" colorScheme="green"
              leftIcon={<Icon as={RiAddLine}/>}
              >
                  Criar novo
              </Button>
            </Link>
          </Flex>
             
              
            
        <Table colorScheme="whatsapp">
          <Thead  >
            <Tr >
              <Th color="gray.300" >Usuário</Th>
              <Th color="gray.300" >Email</Th>
              <Th color="gray.300" >LAUDOS FINALIZADOS</Th>
              <Th color="gray.300" >TIPO DE USUÁRIO</Th>
              <Th color="gray.300" >ATUALIZAR</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td className="text-zinc-300"  >DILAN</Td>
              <Td className="text-zinc-300"  >Dilanlopez009@gmail.com</Td>
              <Td className="text-zinc-300"  >25</Td>
              <Td className="text-zinc-300"  >ADMINISTRADOR</Td>
              <Td className="text-zinc-300"  ><Button colorScheme="teal" isDisabled={false} leftIcon={<Icon as={RiPencilLine} fontSize="16" />}> Editar</Button></Td>
            </Tr>

          </Tbody>
        </Table>

        </Flex>
        <Paginaton/>
        </Box>
       
      </SimpleGrid>
      
    </Flex>
</Flex>
  
  )
}