import {Box, Stack, Text, Link, Icon, Flex} from '@chakra-ui/react'
import { ElementType } from 'react'
import {RiDashboardLine, RiContactsLine, RiChatHistoryLine} from 'react-icons/ri'

interface NavLinkProps {
  icon: ElementType
  title: string;
}

export function NavLink({icon, title} : NavLinkProps) {
  return (
    <Link display="flex" alignItems="center" color="green.300">
    <Icon as={icon} fontSize="20" />
    <Text ml='4'fontWeight="medium">{title}</Text>
    </Link>
  )
}