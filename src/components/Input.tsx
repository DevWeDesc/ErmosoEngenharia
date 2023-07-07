import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction} from 'react'
import { FieldError } from "react-hook-form/dist/types"

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | any
} 

const InputBase: ForwardRefRenderFunction<HTMLInputElement,InputProps> = ({name, label, error = null, ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error} >
        { !!label && <FormLabel className="text-zinc-300" htmlFor={name}>{label}</FormLabel>}
        <ChakraInput 
        name={name}
        id={name}
        minWidth={320}
        height={8}
        focusBorderColor="green.200"
        className="flex text-center p-1 rounded-md border-2 border-gray-300 bg-transparent text-zinc-400
        "
        ref={ref}
        {...rest}
        /> 
       { !!error && (
         <FormErrorMessage>
          {error.message}
         </FormErrorMessage>
       )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)