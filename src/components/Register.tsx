import { Button, Flex, FormControl, FormLabel, Heading, Icon, Select } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { IoReturnDownBack } from 'react-icons/io5'
import { Input } from './Input'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface IProps {
  setRegisterIsTrue: Dispatch<SetStateAction<boolean>>
}

interface IRegister{
  username: string;
  email: string;
  password: string;
  role: string;
}

const FormSchema = yup.object().shape({
  username: yup.string().required('Usuário Obrigatório'),
  email: yup.string().required('Email Obrigatório'),
  password: yup.string().required('Senha Obrigatório'),
  role: yup.string().required('Tipo de Usuário Obrigatório'),

})



export default function Register({ setRegisterIsTrue }: IProps) {
  const { register, handleSubmit, formState: {errors},} = useForm({
    resolver: yupResolver(FormSchema)
  })
  
  const  handleRegister: SubmitHandler<IRegister> = async (values) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role,
    }
    console.log(data)
  }
  return (
    <Flex mb="8" justify="space-between" align="center" direction="column">
      <Flex m="2" align="center" w="100%" justify='space-between'>
        <Heading className="text-zinc-300" size="lg" fontWeight="normal">Cadastro de Usúarios</Heading>
        <Button size="sm" fontSize="sm" onClick={ ()=> setRegisterIsTrue(true)} colorScheme="teal"
        leftIcon={<Icon as={IoReturnDownBack}/>}
        >
          Voltar
        </Button>
      </Flex>
      
      <FormControl as="form" onSubmit={handleSubmit(handleRegister as  SubmitHandler<FieldValues>)}>
        
        <Flex className='mx-32' p="12" gap="12" flexDirection="column">
          <Input
            placeholder="Digite o Usuário"
            label="Usuário"
            {...register('username')}
            name="username"
            id="username"
            error={errors.username}
          />
          <Input
            placeholder="exemplo@exemplo.com"
            label="Email"
            {...register('email')}
            name="email"
            id="email"
            error={errors.email}
          />
          <Input
              placeholder="Digite uma senha"
              label="Senha"
              {...register('password')}
              name="password"
              id="password"
              error={errors.password}
          />
          <FormLabel 
            className="text-zinc-300" 
            htmlFor="propertyType"
            marginRight={0}
            >
              Tipo de usuário{" "}
            <Select
              textAlign="center"
              marginTop={2}
              height={8}
              bgColor="gray.700" 
              className="text-slate-400"
              name="role"
              id="role"
            >
              <option className="!bg-slate-600" value="admin">Administrador</option>
              <option className="!bg-slate-600" value="user">Usuário</option>
            </Select>
          </FormLabel>
        </Flex>
        <Flex gap="6" justifyContent="center">
          <Button
            type="submit"
            colorScheme="whatsapp"
          >
            Cadastrar
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  )
}
