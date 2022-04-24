import React from 'react';

// Assets
import BackgroundCard1 from 'assets/img/BackgroundCard1.png';
import {
  MastercardIcon,
  VisaIcon,
} from 'components/Icons/Icons';
import { Moralis } from 'moralis';
import { RiMastercardFill } from 'react-icons/ri';

// Chakra imports
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
} from '@chakra-ui/react';

import CreditCard from './components/CreditCard';
import PaymentMethod from './components/PaymentMethod';

(async function () {
  Moralis.initPlugins();
})();

async function iframefiat() {
  let result = await Moralis.Plugins.fiat.buy({}, { disableTriggers: true });
  document.getElementById("myIframe").src = result.data;
  // console.log(result);
}

function Billing() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1.2fr" }} templateRows="1fr">
        <Box>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              xl: "1fr 1fr 1fr 1fr",
            }}
            templateRows={{ sm: "auto auto auto", md: "1fr auto", xl: "1fr" }}
            gap="26px"
          >
            <CreditCard
              backgroundImage={BackgroundCard1}
              title={"VISA"}
              number={"7812 2139 0823 XXXX"}
              validity={{
                name: "VALID THRU",
                data: "05/24",
              }}
              cvv={{
                name: "CVV",
                code: "09x",
              }}
              icon={
                <Icon
                  as={RiMastercardFill}
                  w="48px"
                  h="auto"
                  color="gray.400"
                />
              }
            />
          </Grid>
          <PaymentMethod
            title={"Payment Method"}
            mastercard={{
              icon: <MastercardIcon w="100%" h="100%" />,
              number: "7812 2139 0823 XXXX",
            }}
            visa={{
              icon: <VisaIcon w="100%" h="100%" />,
              number: "7812 2139 0823 XXXX",
            }}
          />
        </Box>
      </Grid>
      <Button
        width={410}
        onClick={iframefiat}
        id="buttonbuy"
        size="md"
        height="48px"
        border="1px"
        borderColor="green.600"
      >
        Click Here to start process
      </Button>
      <br />
      <br />
      <div>
        <Text color="red.400">
          Send Exact amount in BTC to this address: "Random Address"
        </Text>
        <AspectRatio maxW="560px" ratio={1}>
          <iframe title="Onramp" src="" allowFullScreen id="myIframe" />
        </AspectRatio>
      </div>
    </Flex>
  );
}

export default Billing;
