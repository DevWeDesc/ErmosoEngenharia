import { Button, Flex, FormControl, FormLabel, Select, Text  } from "@chakra-ui/react";
import { Input } from "@/components/Input"
import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import * as yup from 'yup'
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface IProps {
  setFormIsTrue: Dispatch<SetStateAction<boolean>>;
}

/*
rua/ av	
número	
complemento	andar	
bairro	
cidade	
estado	
CEP
tipo de imóvel	[apto cobertura	apto duplex	casa ]
	condicional condomínio
idade aparente	
padrão	
estado de conservação	
área útil	
área homogeneizada	
área de terreno	
vagas	
valor	
data do laudo
*/
interface FormProps {
  adress: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  propertyType: string;
  condominium: string;
  apparentAge: string;
  standard: string;
  conservationState: string;
  usefulArea: string;
  homogenizedArea: string;
  landArea: string;
  vacancies: string;
  value: string;
  reportDate: string;
}

const FormSchema = yup.object().shape({

  adress: yup.string().required('Rua / Av Obrigatório'),
  number: yup.number().required(' Número Obrigatório'),
  complement: yup.string().required('Complemento Obrigatório'),
  neighborhood: yup.string().required('Bairro Obrigatório'),
  city: yup.string().required('Cidade Obrigatória'),
  state: yup.string().required('Estado Obrigatório'),
  cep: yup.string().required('CEP Obrigatório'),
  propertyType: yup.string().required('Tipo de Propriedade Obrigatória'),
  condominium: yup.string().required('Condomínio  Obrigatório'),
  apparentAge: yup.string().required('Idade Aparente Obrigatória'),
  standard: yup.string().required('Padrão Obrigatório'),
  conservationState: yup.number().required('Estado de Conservação Obrigatório'),
  usefulArea: yup.string().required('Área Útil Obrigatória'),
  homogenizedArea: yup.string().required('Área Homogeneizada Obrigatória'),
  landArea: yup.string().required('Área de Terreno Obrigatório'),
  vacancies: yup.string().required('Vagas Obrigatória'),
  value:yup.string().required('Valor Obrigatório'),
  reportDate: yup.string().required('Data do Laudo Obrigatório'),
})

export default function Forms({ setFormIsTrue }: IProps) {

  const { register, handleSubmit, formState: {errors},} = useForm({
    resolver: yupResolver(FormSchema)
  })

  const  handleForm: SubmitHandler<FormProps> = async (values) => {
    const data = {
      adress: values.adress,
      number: values.number,
      complement: values.complement, 
      neighborhood: values.neighborhood,
      city:  values.city,
      state:  values.state,
      cep:  values.cep,
      propertyType:  values.propertyType,
      condominium:  values.condominium,
      apparentAge:  values.apparentAge,
      standard:  values.standard,
      conservationState:  values.conservationState,
      usefulArea:  values.usefulArea,
      homogenizedArea:  values.homogenizedArea,
      landArea:  values.landArea,
      vacancies:  values.vacancies,
      value:  values.value,
      reportDate:  values.reportDate
    }
    console.log(values)
  }

  return (
    <>
    <FormControl as="form" onSubmit={handleSubmit(handleForm as  SubmitHandler<FieldValues>)}>
      <Flex gap="4" p="4">
        <Input
          placeholder="Ex: Avenida Paulista"
          label="Endereço"
          {...register('adress')}
          name="adress"
          id="adress"
          error={errors.adress}
        />
        <Input
          placeholder="0001"
          label="Número"
          {...register('number')}
          name="number"
          id="number"
          error={errors.number}
        />
        <Input
          placeholder="Bloco 00 A"
          label="Complemento"
          {...register('complement')}
          name="complement"
          id="complement"
          error={errors.complement}
        />
      </Flex>
      <Flex gap="4" p="4">
      <Input
        placeholder="Centro"
        label="Bairro"
        {...register('neighborhood')}
        name="neighborhood"
        id="neighborhood"
        error={errors.neighborhood}
      />
      <Input
        placeholder="São Paulo"
        label="Cidade"
        {...register('city')}
        name="city"
        id="city"
        error={errors.city}
      />
      <Input
        placeholder="São Paulo"
        label="Estado"
        {...register('state')}
        name="state"
        id="state"
        error={errors.state}
      />
      </Flex>
      <Flex gap="4" p="4">
      <Input
        placeholder="00000-000"
        label="CEP"
        {...register('cep')}
        name="cep"
        id="cep"
        error={errors.cep}
      />
      
      <Flex flexDirection="column" flex="1" >

      <FormLabel className="text-zinc-300" htmlFor="propertyType">
            Selecione uma opção{" "}
      </FormLabel>
      <Select
        minWidth={320}
        height={8} 
        bgColor="gray.700" 
        color="white" 
        name="propertyType"
        id="propertyType"
      >
        <option value="apto cobertura">apto cobertura</option>
        <option value="cobertura">apto duplex</option>
        <option value="casa">casa</option>
      </Select>
      </Flex>

      </Flex>
      <Button
        type="submit"
        colorScheme="whatsapp"
      >
         Enviar
      </Button>
    </FormControl>

        <Flex m="6" gap="6" align="center" justify="center">
          <Flex>
            <FormLabel display="flex" gap="2" width="100%" height="100%" htmlFor="file">
            <AiOutlineCloudUpload fontSize="28px" color="white"/>
            <Input
              hidden
              name="file"
              id="file"
              className="bg-slate-500 text-slate-500 pt-1"
              placeholder=''
              type="file"
              />
              <Text width="100px" className="text-zinc-300">UPLOAD PDF</Text>
              </FormLabel>
            </Flex>
          </Flex>
      
      <Flex gap="6" justifyContent="center">
        <Button colorScheme="teal" onClick={()=> setFormIsTrue(true) }>VOLTAR</Button>
        <Button colorScheme="teal" isDisabled={false} >ENVIAR</Button>
      </Flex>

    </>
    
  )
}



