'use client'
import { HStack, Button, Flex, Text, Icon } from '@chakra-ui/react'
import logo from '../../public/hermosoLogo.png'
import Image from 'next/image'
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export function Header() {
  
  const {asPath, pathname} = useRouter()
  if(pathname === "/" || pathname === "/login") {
    return null;
  }
  const{push} = useRouter()  
   const handleLogOut = () => {
      push('/')
      toast.warning('Saindo !!',{ theme: 'dark'})
  }
  return (
    <Flex
    h="10vh"
      className="w-full max-w-screen-xl 
  mx-auto
  mt-4
  px-6
  items-center  
  "
    >
      <Image
        className=" mb-4 m-4 "
        src={logo}
        width={198}
        height={28}
        alt="Logo Image"
      />

      <Flex
        p="4"
        textAlign="center"
        className="bg-slate-900
        "
        rounded="8"
        maxHeight="48px"
        width="100%"
        m="4"
        align="center"
        justify="space-between"
      >
        <Flex m="2" p="2" direction="column">
          <Text fontSize="sm" className="text-zinc-200">
          Dilan
          </Text>
          <Text fontSize="sm" className="text-zinc-200">
            dilan@dilan.com.br
          </Text>
        </Flex>

        <Flex m="2" p="2" direction="row" gap="2">
          <HStack spacing="2" gap="2">
            <Icon as={RiNotificationLine} color="whatsapp.200"  fontSize={20} />
            <Icon as={RiUserAddLine} color="whatsapp.200" 
            fontSize={20} />
          </HStack>
          <Button 
            onClick={() => handleLogOut()}
          m="2" colorScheme="teal" maxHeight="28px">
            Sair
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
