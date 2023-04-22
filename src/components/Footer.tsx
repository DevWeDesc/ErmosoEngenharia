import { HStack, Button, Flex, Text, Icon, } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { AiOutlineExclamation } from 'react-icons/ai'

export function Footer() {
  const {asPath, pathname} = useRouter()
  if(pathname === "/") {
    return null;
  }
  return (
    <Flex 
    justify="space-evenly"
    w="full" className="bg-slate-900" h="10vh" align="center" p="4">
     
     <Text
     fontWeight="bold"
     opacity="0.8"
     className='text-zinc-300'
     >Copyright © 2023 - Ermoso Engenharia. Todos os direitos reservados</Text>
  <Flex
  align="center"
  direction="row"
  as={Link}
    href="https://www.descti.com.br"
  >
    
  <Text
     fontWeight="bold"
     opacity="0.8"
     className='text-zinc-200'
     >Powered By Desc T.I</Text>
     <Icon as={AiOutlineExclamation} color="cyan.300" fontSize={20}/>
   
  </Flex>

  <Flex gap="2">
    <Text  className='text-zinc-300 underline'>
      Termos de Uso
    </Text>
    <Text  className='text-zinc-300  underline'>
      Politicas de Privacidade
    </Text>
  </Flex>
  
    </Flex>
  )
}