import { Button, Flex, FormControl, FormLabel, Select, Text  } from "@chakra-ui/react";
import { Input } from "@/components/Input"
import React, { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import * as yup from 'yup'
import { useForm, SubmitHandler, FieldValues, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from 'react-datepicker';
interface IProps {
  setFormIsTrue: Dispatch<SetStateAction<boolean>>;
}


interface FormProps {
  adress: string;
  number: number;
  complement: string;
  floor: string;
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
  address: yup.string().required('Rua / Av Obrigatório'),
  number: yup.number().required('Número Obrigatório').typeError('Número Obrigatório'),
  complement: yup.string().required('Complemento Obrigatório'),
  floor: yup.string().required('Andar Obrigatório'),
  neighborhood: yup.string().required('Bairro Obrigatório'),
  city: yup.string().required('Cidade Obrigatória'),
  state: yup.string().required('Estado Obrigatório'),
  cep: yup.string().required('CEP Obrigatório'),
  propertyType: yup.string().required('Tipo de Propriedade Obrigatória'),
  condominium: yup.string(),
  apparentAge: yup.string().required('Idade Aparente Obrigatória'),
  standard: yup.string().required('Padrão Obrigatório'),
  conservationState: yup.string().required('Estado de Conservação Obrigatório'),
  usefulArea: yup.string().required('Área Útil Obrigatória'),
  homogenizedArea: yup.string().required('Área Homogeneizada Obrigatória'),
  landArea: yup.string().required('Área de Terreno Obrigatório'),
  vacancies: yup.string().required('Vagas Obrigatória'),
  value:yup.string().required('Valor Obrigatório'),
  reportDate: yup.string().required('Data do Laudo Obrigatório'),
})

export default function Forms({ setFormIsTrue }: IProps) {

  const [ condIsTrue, setCondIsTrue ] = useState<boolean>(true)

  const { register, handleSubmit, control  , formState: {errors},} = useForm({
    resolver: yupResolver(FormSchema)
  })

  const  handleForm: SubmitHandler<FormProps> = async (values) => {
    const data = {
      address: values.adress,
      number: values.number,
      complement: values.complement,
      floor: values.floor, 
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

  const mostrarCampo = (value: string)=> {
    if(value !== 'casa'){
      setCondIsTrue(false)
    }else{
      setCondIsTrue(true)
    }
  }

  return (
    <>
    <FormControl as="form" onSubmit={handleSubmit(handleForm as  SubmitHandler<FieldValues>)}>
    <Flex gap="4" p="4">
    <Input
          placeholder="Ex: Avenida Paulista"
          label="Endereço"
          {...register('address')}
          name="address"
          id="address"
          error={errors.address}
        />
        <Input
          placeholder="0001"
          label="Número"
          {...register('number')}
          name="number"
          id="number"
          error={errors.number}
        />
      </Flex>
      <Flex gap="4" p="4">     
        <Input
          placeholder="Bloco 00 A"
          label="Complemento"
          {...register('complement')}
          name="complement"
          id="complement"
          error={errors.complement}
        />
        <Input
          placeholder="Andar"
          label="Andar"
          {...register('floor')}
          name="floor"
          id="floor"
          error={errors.floor}
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
          className="text-slate-400"
          name="propertyType"
          id="propertyType"
          onChange={ (event)=> mostrarCampo(event.target.value)}
        >
          <option className="!bg-slate-600" value="casa">casa</option>
          <option className="!bg-slate-600" value="apto cobertura">apto cobertura</option>
          <option className="!bg-slate-600" value="cobertura">apto duplex</option>
        </Select>
        </Flex>
        <Input
          placeholder="Paulista Garden"
          label="Condominío"
          {...register('condominium')}
          name="condominium"
          id="condominium"
          isDisabled={ condIsTrue }
          error={errors.condominium}
        />
      </Flex>
      <Flex gap="4" p="4">
        <Input
          placeholder="14 anos"
          label="Idade aparente"
          {...register('apparentAge')}
          name="apparentAge"
          id="apparentAge"
          error={errors.apparentAge}
        />
        <Input
          placeholder="Comercial"
          label="Padrão"
          {...register('standard')}
          name="standard"
          id="standard"
          error={errors.standard}
        />
        <Input
          placeholder="Conservado"
          label="Estado de conservação"
          {...register('conservationState')}
          name="conservationState"
          id="conservationState"
          error={errors.conservationState}
        />
      </Flex>
      <Flex gap="4" p="4">
      <Input
        label="Área útil"
        {...register('usefulArea')}
        placeholder="110 m²"
        name="usefulArea"
        id="usefulArea"
        error={errors.usefulArea}
      />
      <Input
        placeholder="150 m²"
        label="Área homogeneizada"
        {...register('homogenizedArea')}
        name="homogenizedArea"
        id="homogenizedArea"
        error={errors.homogenizedArea}
      />
      <Input
        placeholder="300 m²"
        label="Área de terreno"
        {...register('landArea')}
        name="landArea"
        id="landArea"
        error={errors.landArea}
      />
    </Flex>
    <Flex gap="4" p="4">
      <Input
        label="Vagas"
        {...register('vacancies')}
        placeholder="01"
        name="vacancies"
        id="vacancies"
        error={errors.vacancies}
      />
      <Input
        placeholder="R$ 300.000,00"
        label="Valor"
        {...register('value')}
        name="value"
        id="value"
        error={errors.value}
      />
      <Input
        placeholder="Data do laudo"
        label="Data do laudo"
        type="date"
        {...register('reportDate')}
        name="reportDate"
        id="reportDate"
        error={errors.reportDate}
      />
    </Flex>
    <Flex m="6" gap="6" align="center" justify="center">
      <FormLabel display="flex" htmlFor="file" width="200px">
        <AiOutlineCloudUpload className="w-[100px]" fontSize="80px" color="white" />
        <Input
          hidden
          name="file"
          id="file"
          className="bg-slate-500 text-slate-500 pt-1 !w-1"
          type="file"
          multiple
        />
        <Text width="400px" display="flex" alignItems="center" className="text-zinc-300">UPLOAD PDF</Text>
      </FormLabel>
    </Flex>
    <Flex gap="6" justifyContent="center">
        <Button
          type="submit"
          colorScheme="whatsapp"
        >
          Enviar
        </Button>
        <Button colorScheme="teal" onClick={()=> setFormIsTrue(true) }>Voltar</Button>
      </Flex>
    </FormControl>
  </>
    
  )
}



