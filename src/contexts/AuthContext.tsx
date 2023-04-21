import { api } from "@/services/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
signIn(credentials: SignInCredentials): Promise<void>
isAuthenticated: boolean
}

type AuthProvideProps = {
children: ReactNode
}

type UserProps = {
  email: string;
  password: string;
  username: string;
  roles: "admin" | "user"
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProvideProps) {
const [users, setUsers] = useState<UserProps[]>([])
const router = useRouter()
useEffect(() => {
 async function getAllUsers() {
  const users = await api.get('users')
  setUsers(users.data)
 } 
 getAllUsers()
},[])

  const isAuthenticated = false
  async function signIn ({email, password}: SignInCredentials) {
      const validateUser = users.find(user => user.email === email && user.password === password) 
          if(validateUser) {
            toast.success('usuário valido', {theme: 'dark'}); router.push('/home')
          } else if(!validateUser) toast.error("Usuário não encontrado", {theme: 'dark'});router.push('/')
  }


   return (
    <AuthContext.Provider value={{isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}