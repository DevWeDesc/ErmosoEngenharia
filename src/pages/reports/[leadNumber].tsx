import { useRouter } from 'next/router';
import { Box, Button, Flex, FormControl, SimpleGrid, Text  } from "@chakra-ui/react";
import { Input } from "@/components/Input"
import * as yup from 'yup'
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { api } from '@/services/api';


interface RequestCompletionReport {
  apparentAge: string;
  padrao: string;
  conservationState: string;
  usefulArea: string;
  homogenizedArea: string;
  landArea: string;
  parkingSpaces: string;
}

const FormSchema = yup.object().shape({
  apparentAge: yup.string().required('Idade Aparente Obrigatória'),
  padrao: yup.string().required('Padrão Obrigatório'),
  conservationState: yup.string().required('Estado de Conservação Obrigatório'),
  usefulArea: yup.string().required('Área Útil Obrigatória'),
  homogenizedArea: yup.string().required('Área Homogeneizada Obrigatória'),
  landArea: yup.string().required('Área de Terreno Obrigatório'),
  parkingSpaces: yup.string().required('Vagas Obrigatória'),
  // value:yup.string().required('Valor Obrigatório'),
})

export default function Forms() {

  const router = useRouter();
  const { leadNumber } = router.query;

  const { register, handleSubmit, formState: {errors},} = useForm({
    resolver: yupResolver(FormSchema)
  })


  async function handleLogin(data: RequestCompletionReport) {
    try{
      await api.post(`/completionreport/${leadNumber}`, data).then((res) => {
        if(res.status === 201) {
          toast.success("Formulário enviado com sucesso")
          router.push("/home")
        }
      })          
    } catch (error){
      toast.error("Falha ao enviar o formulário")
    }
  }

  const  handleForm: SubmitHandler<RequestCompletionReport> = async (values) => {
    const newDate = new Date()
    const data = {
      apparentAge:  values.apparentAge,
      padrao:  values.padrao,
      conservationState:  values.conservationState,
      usefulArea:  values.usefulArea,
      homogenizedArea:  values.homogenizedArea,
      landArea:  values.landArea,
      parkingSpaces:  values.parkingSpaces,
      // value:  values.value,
    }
    handleLogin(data)
  }

  return (
  <Flex w="75%" my="20" maxWidth={1480} minHeight="62vh" mx="auto" px="6">
    <SimpleGrid flex='1' gap="4" alignItems="flex-start" >
      <Box
        p="6"
        textAlign="center"
        className="bg-slate-900 text-xs"
        rounded="8"
        m="2"
      >
      <Text mb="4" fontWeight="bold" className="text-zinc-300">LAUDO {leadNumber}</Text>
      <FormControl as="form" onSubmit={handleSubmit(handleForm as  SubmitHandler<FieldValues>)}>
        <Flex gap="4" p="4">
          <Input
            placeholder="Qual a idade aparente do imóvel?"
            label="Idade aparente"
            {...register('apparentAge')}
            name="apparentAge"
            id="apparentAge"
            error={errors.apparentAge}
          />
          <Input
            placeholder="Qual o padrão?"
            label="Padrão"
            {...register('padrao')}
            name="padrao"
            id="padrao"
            error={errors.padrao}
          />
        </Flex>
        <Flex gap="4" p="4">
          <Input
            placeholder="Qual o estado de conservação?"
            label="Estado de conservação"
            {...register('conservationState')}
            name="conservationState"
            id="conservationState"
            error={errors.conservationState}
          />
          <Input
            label="Área útil"
            {...register('usefulArea')}
            placeholder="110 m²"
            name="usefulArea"
            id="usefulArea"
            error={errors.usefulArea}
          />
        </Flex>
        <Flex gap="4" p="4">
          <Input
            placeholder="150 m²"
            label="Área homogeneizada"
            {...register('homogenizedArea')}
            name="homogenizedArea"
            id="homogenizedArea"
            error={errors.homogenizedArea}
          />
          <Input
            placeholder="300 m²"
            label="Área de terreno"
            {...register('landArea')}
            name="landArea"
            id="landArea"
            error={errors.landArea}
          />
        </Flex>
        <Flex gap="4" p="4">
          <Input
            maxWidth="49%"
            label="Quantas vagas de garagem?"
            {...register('parkingSpaces')}
            placeholder="01"
            name="parkingSpaces"
            id="parkingSpaces"
            error={errors.parkingSpaces}
            />
            
            
        </Flex>
          {/* <Input
            placeholder="R$ 300.000,00"
            label="Valor"
            {...register('value')}
            name="value"
            id="value"
            error={errors.value}
          /> */}
        <Flex gap="6" paddingTop={8} justifyContent="center">
          <Button
            type="submit"
            colorScheme="whatsapp"
          >
            Enviar
          </Button>
          <Button colorScheme="teal" onClick={()=> router.push('/reports') }>Voltar</Button>
        </Flex>
      </FormControl>
      </Box>
    </SimpleGrid>
  </Flex>    
  )
}




