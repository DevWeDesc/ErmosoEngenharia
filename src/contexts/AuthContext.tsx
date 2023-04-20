import { createContext, ReactNode } from "react";
import { toast } from "react-toastify";



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

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProvideProps) {
  const isAuthenticated = false
  async function signIn ({email, password}: SignInCredentials) {
    toast.success('LOGADO COM SUCESSO.')
    console.log({email, password})
  }
   return (
    <AuthContext.Provider value={{isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}