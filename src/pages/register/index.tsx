'use client'
import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Input } from "@/components/Input";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from "../../../public/hermosoLogo.png";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button, Flex } from "@chakra-ui/react";

interface RegisterProps {
  email: string;
  password: string;
  username: string;
}

const RegisterSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatório').email('Digite um E-mail válido'),
  password: yup.string().required('Senha Obrigatória'),
  username: yup.string().required('Usuário Obrigatório'),
})



export default function Register() {

  const router = useRouter()
  
  const { register, handleSubmit, formState: {errors},} = useForm({
    resolver: yupResolver(RegisterSchema)
  })

async function handleRegisterUser(data: RegisterProps) {
  JSON.stringify(data)
    try {
      await api.post("/users", data).then((res) => {
        toast.success("Cadastro Realizado com sucesso!")
        router.push('/login')
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
  const  handleRegister: SubmitHandler<RegisterProps> = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
      username: values.username,
      roles: "['user']"
    }
    handleRegisterUser(data)
  }
  return (
    <main className="w-screen h-screen  flex justify-center items-center">
      <div className=" bg-gray-900 w-[38rem] h-[38rem] rounded-lg flex flex-col items-center ">
        <Image
          className=" mb-4 m-4 "
          src={logo}
          width={198}
          height={28}
          alt="Logo Image"
        />

        <form onSubmit={handleSubmit(handleRegister as  SubmitHandler<FieldValues>)} className="flex flex-col mt-8 gap-4">
        <Input
              placeholder="exemplo@exemplo.com"
              label="Email: "
              {...register('email')}
              name="email"
              id="email"
              error={errors.email}
          />
          <Input
              placeholder="Digite uma senha"
              label="Senha: "
              {...register('password')}
              name="password"
              id="password"
              error={errors.password}
          />
          <Input
              placeholder="Digite um usuário"
              label="Usuário: "
              {...register('username')}
              name="username"
              id="username"
              error={errors.username}
          />
          <Flex className="justify-center">
            <Button 
              type="submit"
              color="black"
              m="4" colorScheme="whatsapp">
              Cadastrar
            </Button>
            <Button 
              onClick={() => router.push('/login')}
              m="4" colorScheme="teal">
              Voltar
            </Button>
          </Flex>
        </form>
      </div>
    </main>
  );
}
