import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import dynamic from "next/dynamic";
import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
const Chart = dynamic(() => import  ('react-apexcharts'),{
  ssr: false
} )



const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: true
    },
    foreColor: theme.colors.gray[300]
  },
  grid: {
    show: false
    
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    
    enabled: false
    
  },
  xaxis: {
    categories: ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"],
    axisBorder: {
      color: theme.colors.gray[600]
    },
    
    
  }, 
  colors: [ '#00E396'],
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    
    },
  },
  
}

const series = [
  {
    name: "Laudos",
    data:  [10,7,5,8,6,9,11],


  },
  
  
]
















export default function Home() {

  return (
<Flex direction="column" h="80vh">
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar />
      <SimpleGrid flex='1' gap="4" minChildWidth="320px" alignItems="flex-start" >
        <Box
        p="8"
        textAlign="center"
        className="bg-slate-900"
        rounded="8"
        height="320px"
        m="2"
        >
          <Text fontSize="lg" mb="4" className="text-zinc-300">
            Laudos enviados na semana
          </Text>
          <Chart type="area" height={228} options={options}
            series={series}
          />
        </Box>

        <Box
        p="8"
        className="bg-slate-900"
        rounded="8"
        m="2"
        textAlign="center"
        height="320px"
        >
          <Text fontSize="lg" mb="4" className="text-zinc-300">
           Laudos Recebidos
          </Text>
          <Chart type="area" height={228} options={options}
            series={series}
          />
        </Box>
      </SimpleGrid>
    </Flex>
</Flex>
  
  )
}