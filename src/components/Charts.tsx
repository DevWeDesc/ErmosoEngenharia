import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
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

export function Charts() {
    return (
        <>
          <Chart type="area" height={228} options={options}
            series={series}
          />
        </>
    )
}