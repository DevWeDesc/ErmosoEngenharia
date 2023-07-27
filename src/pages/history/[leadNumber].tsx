import { useRouter } from 'next/router';
import { Box, Button, Flex, Text, SimpleGrid, HStack } from "@chakra-ui/react";
import React from 'react';
import { Input } from '@/components/Input';

export default function Forms() {

  const router = useRouter();
  const { leadNumber } = router.query;

  return (
  <Flex w="75%" my="20" maxWidth={1480} mx="auto" px="6">
    <SimpleGrid flex='1' gap="4" alignItems="flex-start" >
      <Box
        p="6"
        textAlign="center"
        className="bg-slate-900 text-xs"
        rounded="8"
        m="2"
      >
      <Text mb="4" fontWeight="bold" className="text-base text-zinc-300">DETALHES DO LAUDO {leadNumber}</Text>
      <Text mb="4" mt="12" fontWeight="bold" className="text-zinc-300">DADOS DO CLIENTE</Text>
      <Flex gap="4" p="4">
        <Input
          label="Nome"
          name="name"
          id="name"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Endereço do cliente"
          name="adressClient"
          id="adressClient"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Flex gap="4" p="4">
        <Input
          label="Contato 01"
          name="contactOne"
          id="contactOne"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Contato 02"
          name="contactTwo"
          id="contactTwo"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Flex gap="4" p="4">
        <Input
          label="Matricula"
          name="registration"
          id="registration"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="IPTU"
          name="iptu"
          id="iptu"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Flex gap="4" p="4" >
        <Input
          label="Número do lead"
          name="leadNumber"
          id="leadNumber"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Valor de garantia"
          name="guaranteeValue"
          id="guaranteeValue"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Text mb="4" mt="12" fontWeight="bold" className="text-zinc-300">DADOS DO IMÓVEL</Text>
      <Flex gap="4" p="4">
        <Input
          label="Endereço"
          name="address"
          id="address"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Número"
          name="number"
          id="number"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Flex gap="4" p="4">     
        <Input
          label="Complemento"
          name="complement"
          id="complement"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Andar"
          name="floor"
          id="floor"
          value="preencher API"
          isDisabled={true}
        />   
      </Flex>
      <Flex gap="4" p="4">
        <Input
          label="Bairro"
          name="neighborhood"
          id="neighborhood"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Cidade"
          name="city"
          id="city"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Estado"
          name="state"
          id="state"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Flex gap="4" p="4">
        <Input
          label="CEP"
          name="cep"
          id="cep"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Tipo de Propriedade"
          name="propertyType"
          id="propertyType"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Condominío"
          name="condominium"
          id="condominium"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Flex gap="4" p="4">
        <Input
          label="Idade aparente"
          name="apparentAge"
          id="apparentAge"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Padrão"
          name="standard"
          id="standard"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Estado de conservação"
          name="conservationState"
          id="conservationState"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Flex gap="4" p="4">
        <Input
          label="Área útil"
          name="usefulArea"
          id="usefulArea"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Área homogeneizada"
          name="homogenizedArea"
          id="homogenizedArea"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Área de terreno"
          name="landArea"
          id="landArea"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <Flex gap="4" p="4">
        <Input
          label="Vagas"
          name="vacancies"
          id="vacancies"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Valor"
          name="value"
          id="value"
          value="preencher API"
          isDisabled={true}
        />
        <Input
          label="Data do laudo"
          name="reportDate"
          id="reportDate"
          value="preencher API"
          isDisabled={true}
        />
      </Flex>
      <HStack justify="center" spacing='25px' py="12">
        <Button colorScheme="yellow">Download do PDF</Button>
        <Button colorScheme="teal" onClick={()=> router.push('/history') }>Voltar</Button>
      </HStack>

      </Box>
    </SimpleGrid>
  </Flex>    
  )
}




