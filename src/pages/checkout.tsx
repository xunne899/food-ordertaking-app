import { Accordion, AccordionItem, AccordionButton, Box, Container, AccordionPanel, VStack, FormControl, FormLabel, Textarea, Input, FormErrorMessage, RadioGroup, Radio } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { IOrder } from "../models";
import { useForm } from "react-hook-form";
import { BottomButton } from "../components/bottom-button";
import { calculateOrderTotal } from "../utils/calculations";
import { useDataProvider } from "../components/data-provider";
import { PAYMENT_METHODS } from "../utils/constants";


export const Checkout = () => {
    const navigate = useNavigate();
    const { lines, restaurantInfo,checkout } = useDataProvider();

  const { register, handleSubmit,formState } = useForm<IOrder>();
 

  const onSubmit = async (data:IOrder) =>{
      
    await checkout(data);
    navigate("/thankYou")
  }

  if(!restaurantInfo) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Accordion defaultIndex={[0,1,2]} allowMultiple>
        <AccordionItem>
            <AccordionButton bg="gray.200">
               Contact
            </AccordionButton>
            <AccordionPanel>
             <VStack mt={4}>
             <FormControl isInvalid={!!formState?.errors?.firstName?.type}>
             <FormLabel> First Name</FormLabel>
             <Input placeholder="First Name"
             {...register('firstName', {required:true})}
             />
             <FormErrorMessage>Required</FormErrorMessage>
             </FormControl>

             <FormControl isInvalid={!!formState?.errors?.lastName?.type}>
             <FormLabel> Last Name</FormLabel>
             <Input placeholder="Last Name"
             {...register('lastName', {required:true})}
             />
             <FormErrorMessage>Required</FormErrorMessage>
             </FormControl>

             <FormControl isInvalid={!!formState?.errors?.email?.type}>
             <FormLabel> Email</FormLabel>
             <Input placeholder="Email"
             {...register('email', {required:true})}
             />
             <FormErrorMessage>Required</FormErrorMessage>
             </FormControl>

             <FormControl isInvalid={!!formState?.errors?.phone?.type}>
             <FormLabel> Phone</FormLabel>
             <Input placeholder="Phone"
             {...register('phone', {required:true})}
             />
             <FormErrorMessage>Required</FormErrorMessage>
             </FormControl>
             </VStack>
            </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <AccordionButton bg="gray.200">
               Payment Method
            </AccordionButton>
            <AccordionPanel>
            <VStack>
                <FormControl isInvalid={!!formState?.errors?.paymentMethod?.type}>
                    <FormLabel>PaymentMethod</FormLabel>
                    <RadioGroup>
                        <VStack alignItems="flex-start">

                  {restaurantInfo.paymentMethods.map(method =>(
                    <Radio value={method}
                    {...register('paymentMethod',{required:true})}>
                        {PAYMENT_METHODS.find((m)=> m.id === method)?.name}
                    </Radio>
                  ))}
                        </VStack>
                        </RadioGroup>
                    <FormErrorMessage>Required</FormErrorMessage>
                </FormControl>
            </VStack>
            </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <AccordionButton bg="gray.200">
            Comments
            </AccordionButton>
            <AccordionPanel>
            <VStack mt={4}>
<FormControl>
    <FormLabel>Comments</FormLabel>
    <Textarea placeholder="Comments ..." {...register('comments')}></Textarea>
</FormControl>
            </VStack>
            </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <BottomButton label="Place pickup order" total={calculateOrderTotal(lines,13).toFixed(2)}/>
    </form>
  );
};
