import {Flex} from "@chakra-ui/react"
import logo from "../../public/hermosoLogo.png";
import Image from "next/image";

export function Header() {
  return (
<Flex className="w-full max-w-screen-xl h-20
  mx-auto
  mt-4
  px-6
  items-center  
  " >
    <Image
          className=" mb-4 m-4 "
          src={logo}
          width={198}
          height={28}
          alt="Logo Image"
        />
  

</Flex>
  )
}