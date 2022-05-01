import React from 'react';

import btcIcon from 'assets/img/bitcoin.png';
import dogeIcon from 'assets/img/dogecoin.png';
import etherIcon from 'assets/img/ethereum.png';
import litecoinIcon from 'assets/img/litecoin.png';
import { Moralis } from 'moralis';

// Chakra imports
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Image,
} from '@chakra-ui/react';

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
      <Grid templateColumns={{ sm: "100%", lg: "100%" }} templateRows="1fr">
        <Box>
          <PaymentMethod
            title={"Payment Method"}
            bitcoin={{
              icon: (
                <Image
                  src={btcIcon}
                  // onClick={stakeClicked}
                />
              ),
              number: "bc1q5vcm4wes90jaj6kjscp5zap8xugfth5fq8dl74",
            }}
            ether={{
              icon: (
                <Image
                  src={etherIcon}
                  // onClick={stakeClicked}
                />
              ),
              number: "0x7621078b4D9B159F6B64e033db98D309722Fe01B",
            }}
            doge={{
              icon: (
                <Image
                  src={dogeIcon}
                  // onClick={stakeClicked}
                />
              ),
              number: "DPSCABKezHJwdLsgM1n34pVueV4rQkvdpY",
            }}
            litecoin={{
              icon: (
                <Image
                  src={litecoinIcon}
                  // onClick={stakeClicked}
                />
              ),
              number: "ltc1q3ksu7gfhqmunfvd3a8ylgs6hp6ljddntyvf0ul",
            }}
          />
        </Box>
      </Grid>
      <br />

      <br />
      <Button
        width="100%"
        onClick={iframefiat}
        id="buttonbuy"
        size="md"
        height="48px"
        border="1px"
        borderColor="green.600"
      >
        Buy with Credit Card
      </Button>
      <br />

      <div>
        <AspectRatio maxW="560px" ratio={0.6}>
          <iframe title="Onramp" src="" allowFullScreen id="myIframe" />
        </AspectRatio>
      </div>
    </Flex>
  );
}

export default Billing;
