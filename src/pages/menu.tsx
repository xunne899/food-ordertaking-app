import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Link,
  textDecoration,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


import { Outlet } from "react-router-dom";
import { useDataProvider } from "../components/data-provider";

export const Menu = () => {
  const navigate = useNavigate();
  const { categories, getItemsCategory } = useDataProvider();
  return (
    <Accordion  m={3} borderColor={'transparent'} defaultIndex={categories.map((_, index) => index)} allowMultiple>
      {categories.map((category) => (
        <AccordionItem>
          <AccordionButton bg="gray.100">
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h2" fontSize={20}>
                {category.title}
              </Heading>
              {category.description && (
                <Text fontSize={14} color="gray.600">
                  {category.description}
                </Text>
              )}
            </Box>
          </AccordionButton>

          <AccordionPanel p={1}>
            <Image src={category.image.src} objectFit="cover" w="100%" maxH={150}/>
            
            {getItemsCategory(category.id).map((item) => (
                 <Link key ={item.id} onClick={()=> navigate(`/item/${item.id}`)} _hover={{textDecoration:'none'}}>
              <Flex px={4} py={2} justify="space-between" borderBottom={"1px solid"} borderColor={"gray.100"} _hover={{backgroundColor : "gray.100"}} >
                <Flex gap={2} >
                  <Image
                    width="40px"
                    height="40px"
                    objectFit="cover"
                    src={item.image.src}
                  />
                  <Box>
                  <Heading as="h3" fontSize="14px">
                    {item.label}
                  </Heading>
                  <Text>{item.description}</Text>
                  </Box>
          
                 
                </Flex>
                <Text>${item.price.toFixed(2)}</Text>
              </Flex>
                 </Link>
           
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
