import React from 'react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import IconBox from 'components/Icons/IconBox';

// Chakra imports
import {
  Button,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const PaymentMethod = ({ title, bitcoin, ether, doge, litecoin }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  return (
    <Card p="16px" mt="24px" width="100%">
      <CardHeader>
        <Flex justify="space-between" align="center" minHeight="60px" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Button bg={bgButton} color="white" fontSize="xs" variant="no-hover">
            Prefered BTC
          </Button>
        </Flex>
      </CardHeader>
      <CardBody overflow="scroll">
        <Flex
          direction={{ sm: "column", md: "row" }}
          align="center"
          w="100%"
          justify="center"
          py="1rem"
        >
          <Text>Bitcoin (BTC)</Text>
          <Flex
            p="1rem"
            marginLeft={{ md: "700" }}
            bg="transparent"
            borderRadius="15px"
            width="100%"
            border="1px solid"
            borderColor={borderColor}
            align="center"
            mb={{ sm: "24px", md: "0px" }}
            me={{ sm: "0px", md: "24px" }}
          >
            <IconBox me="10px" w="25px" h="22px">
              {bitcoin.icon}
            </IconBox>
            <Text
              color="gray.400"
              fontSize="md"
              fontWeight="semibold"
              overflow="scroll"
            >
              {bitcoin.number}
            </Text>
            <Spacer />
          </Flex>
          <Text>Ethereum (ETH)</Text>
          <Flex
            p="1rem"
            bg="transparent"
            borderRadius="15px"
            width="100%"
            border="1px solid"
            borderColor={borderColor}
            align="center"
            mb={{ sm: "24px", md: "0px" }}
            me={{ sm: "0px", md: "24px" }}
          >
            <IconBox me="10px" w="25px" h="22px">
              {ether.icon}
            </IconBox>
            <Text
              color="gray.400"
              fontSize="md"
              fontWeight="semibold"
              overflow="scroll"
            >
              {ether.number}
            </Text>
          </Flex>
          <Text>Dogecoin (DOGE)</Text>
          <Flex
            p="1rem"
            bg="transparent"
            borderRadius="15px"
            width="100%"
            border="1px solid"
            borderColor={borderColor}
            align="center"
            mb={{ sm: "24px", md: "0px" }}
            me={{ sm: "0px", md: "24px" }}
          >
            <IconBox me="10px" w="25px" h="22px">
              {doge.icon}
            </IconBox>
            <Text
              color="gray.400"
              fontSize="md"
              fontWeight="semibold"
              overflow="scroll"
            >
              {doge.number}
            </Text>
          </Flex>
          <Text>Litecoin (LTC)</Text>
          <Flex
            p="16px"
            bg="transparent"
            borderRadius="15px"
            width="100%"
            border="1px solid"
            borderColor={borderColor}
            align="center"
          >
            <IconBox me="10px" w="25px" h="25px">
              {litecoin.icon}
            </IconBox>
            <Text
              color="gray.400"
              fontSize="md"
              fontWeight="semibold"
              overflow="scroll"
            >
              {litecoin.number}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PaymentMethod;
