import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import {
  BsClock,
  BsCashCoin,
  BsFillPinMapFill,
  BsTelephone,
  BsArrowRightSquare,
} from "react-icons/bs";

import { useDataProvider } from "../components/data-provider";
import { PAYMENT_METHODS } from "../utils/constants";
import moment from "moment";

export const Info = () => {
  const { restaurantInfo } = useDataProvider();
  const openingTime = new Date();
  openingTime.setHours(8, 0, 0, 0); // 8 AM

  const closingTime = new Date();
  closingTime.setHours(21, 0, 0, 0); // 9 PM

  if (!restaurantInfo) return null;

  const items = [
    {
      icon: <BsClock />,
      label: "Opening Hours",
      children: (
        <Flex px={4} py={2} justify="space-between">
          <Text>Everyday</Text>
          <Text>
            {moment(
              restaurantInfo.openingTime.toDate().setHours(8, 30, 0, 0)
            ).format("LT")}{" "}
            -{" "}
            {moment(
              restaurantInfo.closingTime.toDate().setHours(21, 0, 0, 0)
            ).format("LT")}
          </Text>
        </Flex>
      ),
    },
    {
      icon: <BsCashCoin />,
      label: "Payment Methods",
      children: (
        <Flex px={4} py={2} direction="column">
          <List spacing={3}>
            {restaurantInfo.paymentMethods.map((method, index) => (
              <ListItem key={index}>
                <ListIcon as={BsArrowRightSquare} color="gray.600" />
                {PAYMENT_METHODS.find((m) => m.id === method)?.name}
              </ListItem>
            ))}
          </List>
        </Flex>
      ),
    },
    {
      icon: <BsFillPinMapFill />,
      label: "Address",
      children: (
        <Flex px={4} py={2} direction="column">
          <Text>{restaurantInfo.address}</Text>
        </Flex>
      ),
    },
    {
      icon: <BsTelephone />,
      label: "Phone",
      children: (
        <Flex px={4} py={2} direction="column">
          <Text>{restaurantInfo.phone}</Text>
        </Flex>
      ),
    },
  ];

  return (
    <Box>
      <Image src="shop.jpg" w="100%" maxH={280} mb={4} />
      {items.map((item, index) => (
        <Flex direction="column" mb={4} key={index}>
          <Flex
            px={4}
            py={2}
            gap={2}
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            {item.icon}
            <Heading as="h2" fontSize={16}>
              {item.label}
            </Heading>
          </Flex>
          {item.children}
        </Flex>
      ))}
    </Box>
  );
};
