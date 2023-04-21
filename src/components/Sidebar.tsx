import {Box, Stack, Text, Link, Icon} from '@chakra-ui/react'
import {RiDashboardLine, RiContactsLine } from 'react-icons/ri'
export function Sidebar() {
  return (
      <Box as="aside"className='text-white w-64 h-48 bg-slate-900 rounded-sm first-letter:

       
      ' mr="8">
        <Stack spacing="12" align="flex-start">
          <Box>
            <Text className='font-bold text-zinc-400 text-sm'>GERAL</Text>
            <Stack spacing="4" className='mt-8' align="stretch">
            <Link display="flex" alignItems="center" color="green.300">
            <Icon as={RiDashboardLine} fontSize="20" />
            <Text ml='4'fontWeight="medium">Dashboard</Text>
            </Link>

            <Link display="flex" alignItems="center">
            <Icon as={RiContactsLine} fontSize="20" />
            <Text ml='4'fontWeight="medium">Usuários</Text>
            </Link>


            </Stack>
          </Box>
        </Stack>
      </Box>
  )
}