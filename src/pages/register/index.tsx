import { Button, Flex, FormControl, FormLabel, Heading, Icon, Select, SimpleGrid, Box } from '@chakra-ui/react'
import { IoReturnDownBack } from 'react-icons/io5'
import { Input } from '@/components/Input'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { api } from '@/services/api'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'


interface IRegister {
  email: string;
  password: string;
  username: string;
  roles: string;
}

const FormSchema = yup.object().shape({
  username: yup.string().required('Usuário Obrigatório'),
  email: yup.string().email('Digite um email válido exemplo@exemplo.com').required('Email Obrigatório'),
  password: yup.string().required('Senha Obrigatório'),
  roles: yup.string().required('Tipo de Usuário Obrigatório'),

})

export default function Register() {

  const [isAccess, setIsAccess ] = useState(true);

  async function handleVerifyRole(){
    try {
      const token = Cookies.get('token');
      const response = await api.post("/decodetoken", { token });
  
      if (response.data.role[0].includes('admin')) {
        router.push('/register');
      } else {
        setIsAccess(false)
        toast.error("Você não tem acesso");
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    handleVerifyRole()
  },[])

  const router = useRouter()

  const { register, handleSubmit, formState: {errors},} = useForm({
    resolver: yupResolver(FormSchema)
  })
  
  async function handleRegistrationSubmission(data: IRegister){
    JSON.stringify(data)
    try {
      await api.post("/users", data).then((res) => {
        toast.success("Cadastro Realizado com sucesso!")
        router.push('/users')
      })
    } catch (error: any) {
        if(error.response.status === 400){
          toast.error("Usuário já cadastrado")
        }else if(error.response.data.message.includes('email')){
          toast.error("Email Inválido")
        }else{
          toast.error("Falha ao cadastrar o usuário")
        }
     }
  }

  const  handleRegister: SubmitHandler<IRegister> = async (values) => {

    const data = {
      email: values.email,
      password: values.password,
      username: values.username,
      roles: `['${values.roles}']`,
    };
    handleRegistrationSubmission(data)
  }
  return (

    <Flex direction="column" minH="80vh">
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <SimpleGrid flex='1' gap="4" minChildWidth="320px" alignItems="flex-start" >
        <Box
        p="8"
        textAlign="center"
        className="bg-slate-900
        "
        rounded="8"
        minHeight="320px"
        m="2"
        >
          <Flex mb="8" justify="space-between" align="center" direction="column">
      <Flex m="2" align="center" w="100%" justify='space-between'>
        <Heading className="text-zinc-300" size="lg" fontWeight="normal">Cadastro de Usúarios</Heading>
        <Button size="sm" fontSize="sm" onClick={ ()=> router.push('/users')} colorScheme="teal"
        leftIcon={<Icon as={IoReturnDownBack}/>}
        >
          Voltar
        </Button>
      </Flex>
      
      {
        isAccess ?
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
              {...register('roles')}
              id="roles"
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
      :
      <Flex className="text-zinc-300 text-lg" >
        VOCE NÃO TEM ACESSO!
      </Flex>
      }
    </Flex>
      </Box>
       
      </SimpleGrid>
      
    </Flex>
</Flex>


    
  )
}