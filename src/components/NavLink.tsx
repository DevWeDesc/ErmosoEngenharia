import { Text, Link, Icon, LinkProps } from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from './ActiveLink'

interface NavLinkProps extends LinkProps {
  icon: ElementType
  title: string
  href: string;
}

export function NavLink({ icon, title, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref >
      <Link {...rest}  display="flex" alignItems="center" color="green.300">
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {title}
      </Text>
      </Link>
    </ActiveLink>
  )
}
