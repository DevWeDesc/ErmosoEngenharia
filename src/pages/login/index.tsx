'use client'
import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Input } from "@/components/Input";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
//@ts-ignore
import logo from "../../../public/hermosoLogo.png";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface SignInProps {
  email: string;
  password: string;
}

const SignInSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatório').email(),
  password: yup.string().required('Senha Obrigatória')
})



export default function Login() {
  
  const { register, handleSubmit, formState: {errors},} = useForm({
    resolver: yupResolver(SignInSchema)
  })
  const route = useRouter()


async function handleLogin(data: SignInProps) {
  
  try {
    await api.post("/login", data).then((res) => {
   if(res.status === 200) {
    console.log(res.data, 'result')
    Cookies.set("token", res.data.token, {expires: 1})
    toast.success("Realizando login")
    route.push("/home")
   } else {
    toast.error("Falha ao fazer login")
   }
})
} catch (error) {
  toast.error("Falha ao fazer Login")
}

 
  }
  const  handleSignIn: SubmitHandler<SignInProps> = async (values) => {
    const data = {
      email: values.email,
      password: values.password
    }
    handleLogin(data)
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

        <form onSubmit={handleSubmit(handleSignIn as  SubmitHandler<FieldValues>)} className="flex flex-col mt-8 gap-4">
          <label className="text-zinc-300" htmlFor="email">
            Digite seu E-mail:{" "}
          </label>
          <Input
            {...register('email')}
            name="email"
            id="email"
            error={errors.email}
          />

          <label className="text-zinc-300" htmlFor="password">
            Digite sua Senha:
          </label>
          <Input
          {...register('password')}
            name="password"
          error={errors.password}
      
          />

          <div className="text-zinc-400 flex items-center  gap-4 align-middle justify-center  ">
            <p>Lembrar de mim ?</p>
            <input
              type="checkbox"
              className="  
              appearance-none
              w-4
              h-4
              border-2
              rounded-sm
              border-gray-300
               checked:bg-green-500"
            />
          </div>
         
          <button
          type="submit"
            className=" 
              bg-green-500
              h-8
              rounded-md
              font-semibold
              hover:bg-green-400
            "
          >
         Entrar
          </button>
      

          <div className="text-zinc-400 flex flex-col items-center m-4 ">
            <p className="underline">Esqueceu sua senha ?</p>
            <p className="underline">Não tem conta? Cadastre Aqui!</p>
          </div>
        </form>
      </div>
    </main>
  );
}
