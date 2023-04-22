import {Box, Stack, Text, Flex} from '@chakra-ui/react'
import {RiDashboardLine, RiContactsLine, RiChatHistoryLine} from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
import { NavLink } from './NavLink'
export function Sidebar() {
  return (
      <Flex justify="center" m="2" p="4" borderRadius='8' className='text-white w-64 h-80 bg-slate-900 rounded-sm first-letter:
    
      ' mr="8">
        <Stack spacing="12" align="flex-start">
          <Box>
            <Text className='font-bold text-zinc-300 text-sm'>GERAL</Text>
            <Stack spacing="4" className='mt-8' align="stretch">
              <NavLink href='/home' title='Dashboard' icon={RiDashboardLine} />

              <NavLink href='/users' title='Usuários' icon={RiContactsLine} />

              <NavLink href='/reports' title='Laudos' icon={TbReportSearch} />

              <NavLink href='/history' title='Histórico' icon={RiChatHistoryLine} />
            </Stack>
          </Box>
        </Stack>
      </Flex>
  )
}