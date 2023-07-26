import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react'
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider>
    { router.pathname !== '/register' &&  <Header />} 
    <Component {...pageProps} />
    <Footer />
    <ToastContainer  autoClose={3000}/>
  </ChakraProvider>
  
  )
}
