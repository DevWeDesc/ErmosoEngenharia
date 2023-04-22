import { Box, Button, Stack } from "@chakra-ui/react";

export function Paginaton() {
  return (
    <Stack 
    direction="row"
    mt="8"
    justify="space-between"
    align="center"
    spacing="6"
    >
      <Box className="text-zinc-300">
        <strong>0</strong> - <strong>1</strong> de <strong>01</strong>
      </Box>
     <Stack direction="row" spacing="2">
     <Button size="sm" fontSize="xs"
      width="4"
      colorScheme="whatsapp"
      disabled
      _disabled={{
        bgColor:'green.200',
        cursos: 'default'
      }}
      >
        1
      </Button>
      <Button size="sm" fontSize="xs"
      width="4"
      colorScheme="whatsapp"
      bgColor="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      >
        2
      </Button>
      <Button size="sm" fontSize="xs"
      width="4"
      colorScheme="whatsapp"
      bgColor="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      >
        3
      </Button>
      <Button size="sm" fontSize="xs"
      width="4"
      colorScheme="whatsapp"
      bgColor="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      >
      4
      </Button>
     </Stack>
    </Stack>
  )
}