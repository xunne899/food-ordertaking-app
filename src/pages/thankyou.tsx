import { Box, Container, Heading, Icon, VStack, Text } from "@chakra-ui/react";
import { useDataProvider } from "../components/data-provider";
import { Outlet } from "react-router-dom";
import {
  MdHourglassBottom,
  MdOutlineCelebration,
  MdCancel,
} from "react-icons/md";

const ThankyouContent = () => {
  const { order } = useDataProvider();

  if (!order) return null;

  if (order.status === "pending") {
    return (
      <>
        <Icon as={MdHourglassBottom} w={24} h={24} color="gray.700" />
        <Heading textAlign="center">Waiting for a confirmation</Heading>
        <Text>
          Your order has been placed. Please wait for a confirmation restaurant
        </Text>
      </>
    );
  }
  if (order.status === "cancelled") {
    return (
      <>
        <Icon as={MdCancel} w={24} h={24} color="gray.700" />
        <Heading textAlign="center">Waiting for a confirmation</Heading>
        <Text>
          Your order has been placed. Please wait for a confirmation restaurant
        </Text>
      </>
    );
  }

  return (
    <>
      <Icon as={MdOutlineCelebration} w={24} h={24} color="gray.700" />
      <Heading textAlign="center">Order Confirmed</Heading>
      <Text>
        Order has been confirmed. Please contact us if you have other questions
      </Text>
    </>
  );
};

export const ThankYou = () => {
  return (
    <VStack gap={4} mt={4} mx={4}>
      <ThankyouContent />
    </VStack>
  );
};
