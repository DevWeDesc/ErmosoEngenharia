import {Box, Stack, Text, Link, Icon, Flex} from '@chakra-ui/react'
import {RiDashboardLine, RiContactsLine, RiChatHistoryLine} from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
export function Sidebar() {
  return (
      <Flex justify="center" m="2" p="4" borderRadius='8' className='text-white w-64 h-80 bg-slate-900 rounded-sm first-letter:
    
      ' mr="8">
        <Stack spacing="12" align="flex-start">
          <Box>
            <Text className='font-bold text-zinc-300 text-sm'>GERAL</Text>
            <Stack spacing="4" className='mt-8' align="stretch">
            <Link href='/home' display="flex" alignItems="center" color="green.300">
            <Icon as={RiDashboardLine} fontSize="20" />
            <Text ml='4'fontWeight="medium">Dashboard</Text>
            </Link>

            <Link  href='/users' display="flex" alignItems="center">
            <Icon as={RiContactsLine} fontSize="20" />
            <Text ml='4'fontWeight="medium">Usuários</Text>
            </Link>

            <Link  href='/reports' display="flex" alignItems="center">
            <Icon as={TbReportSearch} fontSize="20" />
            <Text ml='4'fontWeight="medium">Laudos</Text>
            </Link>

            <Link href='/history'  display="flex" alignItems="center">
            <Icon as={RiChatHistoryLine} fontSize="20" />
            <Text ml='4'fontWeight="medium">Histórico</Text>
            </Link>


            </Stack>
          </Box>
        </Stack>
      </Flex>
  )
}