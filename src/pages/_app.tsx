import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react'

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>


    
      <Header />
      <Component {...pageProps} />
      <Footer />
      

    </ChakraProvider>
  
  )
}
