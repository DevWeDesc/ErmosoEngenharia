import { useRouter } from 'next/router';
import { Box, Button, Flex, FormControl, FormLabel, Select, SimpleGrid, Text  } from "@chakra-ui/react";
import { Input } from "@/components/Input"
import { AiOutlineCloudUpload } from 'react-icons/ai'
import * as yup from 'yup'
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


interface FormProps {
  adress: string;
  number: number;
  complement: string;
  floor: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  propertyType: string;
  condominium: string;
  apparentAge: string;
  standard: string;
  conservationState: string;
  usefulArea: string;
  homogenizedArea: string;
  landArea: string;
  vacancies: string;
  value: string;
  reportDate: string;
}

const FormSchema = yup.object().shape({
  apparentAge: yup.string().required('Idade Aparente Obrigatória'),
  standard: yup.string().required('Padrão Obrigatório'),
  conservationState: yup.string().required('Estado de Conservação Obrigatório'),
  usefulArea: yup.string().required('Área Útil Obrigatória'),
  homogenizedArea: yup.string().required('Área Homogeneizada Obrigatória'),
  landArea: yup.string().required('Área de Terreno Obrigatório'),
  vacancies: yup.string().required('Vagas Obrigatória'),
  value:yup.string().required('Valor Obrigatório'),
  reportDate: yup.string().required('Data do Laudo Obrigatório'),
})

export default function Forms() {

  const router = useRouter();
  const { leadNumber } = router.query;

  const { register, handleSubmit, formState: {errors},} = useForm({
    resolver: yupResolver(FormSchema)
  })

  const  handleForm: SubmitHandler<FormProps> = async (values) => {
    const data = {
      apparentAge:  values.apparentAge,
      standard:  values.standard,
      conservationState:  values.conservationState,
      usefulArea:  values.usefulArea,
      homogenizedArea:  values.homogenizedArea,
      landArea:  values.landArea,
      vacancies:  values.vacancies,
      value:  values.value,
      reportDate:  values.reportDate
    }
    console.log(data)
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
            placeholder="14 anos"
            label="Idade aparente"
            {...register('apparentAge')}
            name="apparentAge"
            id="apparentAge"
            error={errors.apparentAge}
          />
          <Input
            placeholder="Comercial"
            label="Padrão"
            {...register('standard')}
            name="standard"
            id="standard"
            error={errors.standard}
          />
          <Input
            placeholder="Conservado"
            label="Estado de conservação"
            {...register('conservationState')}
            name="conservationState"
            id="conservationState"
            error={errors.conservationState}
          />
        </Flex>
        <Flex gap="4" p="4">
          <Input
            label="Área útil"
            {...register('usefulArea')}
            placeholder="110 m²"
            name="usefulArea"
            id="usefulArea"
            error={errors.usefulArea}
          />
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
            label="Vagas"
            {...register('vacancies')}
            placeholder="01"
            name="vacancies"
            id="vacancies"
            error={errors.vacancies}
          />
          <Input
            placeholder="R$ 300.000,00"
            label="Valor"
            {...register('value')}
            name="value"
            id="value"
            error={errors.value}
          />
          <Input
            placeholder="Data do laudo"
            label="Data do laudo"
            type="date"
            {...register('reportDate')}
            name="reportDate"
            id="reportDate"
            error={errors.reportDate}
          />
        </Flex>
        <Flex m="6" gap="6" align="center" justify="center">
          <FormLabel display="flex" htmlFor="file" width="200px">
            <AiOutlineCloudUpload className="w-[100px]" fontSize="80px" color="white" />
            <Input
              hidden
              name="file"
              id="file"
              className="bg-slate-500 text-slate-500 pt-1 !w-1"
              type="file"
              multiple
            />
            <Text width="400px" display="flex" alignItems="center" className="text-zinc-300">UPLOAD PDF</Text>
          </FormLabel>
        </Flex>
        <Flex gap="6" justifyContent="center">
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




