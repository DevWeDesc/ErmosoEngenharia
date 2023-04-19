import Image from "next/image";
import Link from "next/link";
import logo from "../../public/hermosoLogo.png";
export default function Login() {
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

        <form action="" className="flex flex-col mt-8 gap-4">
          <label className="text-zinc-300" htmlFor="email">
            Digite seu E-mail:{" "}
          </label>
          <input
            className="flex text-center p-1  w-80 rounded-md border-2 border-gray-300 bg-transparent text-zinc-400 "
            type="text"
            name="email"
            id="email"
          />

          <label className="text-zinc-300" htmlFor="password">
            Digite sua Senha:{" "}
          </label>
          <input
            className="flex text-center p-1  w-80 rounded-md border-2 border-gray-300 bg-transparent text-zinc-400 "
            type="text"
            name="password"
            id="password"
          />

          <div className="text-zinc-400 flex  gap-4 align-middle justify-center">
            <p>Lembrar de mim ?</p>
            <input
              type="checkbox"
              className="w-4 rounded-md   checked:bg-green-400-500  "
            />
          </div>
         
          <button
            className=" 
              bg-green-600
              h-8
              rounded-md
              font-semibold

              hover:bg-green-500
            "
          >
          <Link href="/">Entrar</Link>  
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
