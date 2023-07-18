import { Header } from "@/components/Header";
import { Paginaton } from "@/components/Pagination";
import Register from "@/components/Register";
import { Sidebar } from "@/components/Sidebar";
import { Flex, SimpleGrid, Box, Table, Thead, Th, Tr, Tbody, Td, Button, Heading, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "@/services/api"
import { RiAddLine, RiPencilLine } from "react-icons/ri";

interface ListUsers {
  id: number;
  email: string;
  username: string;
  roles: string[];
}

export default function Users() {

  const [ registerIsTrue, setRegisterIsTrue ] = useState<boolean>(true)
  const [ listUsers, setListUsers ] = useState<ListUsers[]>([])

  async function getAllUsers(){
    await api.get("/users").then((res)=> {
      setListUsers(res.data)
    }).catch((err)=> {
      console.log(err)
    })
  }

  async function handleVerifyRole(){
    setRegisterIsTrue(false)
  }

  useEffect(() => {
    getAllUsers()
  },[])

  return (

<Flex direction="column" minH="80vh">
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
    {registerIsTrue ?
      <>
        <Flex mb="8" justify="space-between" align="center" direction="column">
          <Flex m="2" align="center" w="100%" justify='space-between'>
            <Heading className="text-zinc-300" size="lg" fontWeight="normal">Usúarios</Heading>
              <Button size="sm" fontSize="sm" onClick={ ()=> handleVerifyRole()} colorScheme="green"
              leftIcon={<Icon as={RiAddLine}/>}
              >
                Criar novo
              </Button>
          </Flex> 
        <Table colorScheme="whatsapp">
          <Thead  >
            <Tr >
              <Th color="gray.300" >Usuário</Th>
              <Th color="gray.300" >Email</Th>
              <Th color="gray.300" >TIPO DE USUÁRIO</Th>
              <Th color="gray.300" >ATUALIZAR</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              listUsers.map((user)=> (
              <Tr key={ user.id }>
                <Td className="text-zinc-300"  >{ user.username }</Td>
                <Td className="text-zinc-300"  >{ user.email }</Td>
                <Td className="text-zinc-300"  >{ user.roles.find((role)=> role.includes('admin')) ? 'ADMINITRADOR' : 'USUARIO' }</Td>
                <Td className="text-zinc-300"  ><Button colorScheme="teal" isDisabled={false}   leftIcon={<Icon as={RiPencilLine} fontSize="16" />}> Editar</Button></Td>
              </Tr>

              ))
            }
          </Tbody>
        </Table>
        </Flex>
        <Paginaton/>
      </>
    : <Register setRegisterIsTrue={setRegisterIsTrue} /> }
      </Box>
       
      </SimpleGrid>
      
    </Flex>
</Flex>
  
  )
}