import React from 'react';

import SidebarHelpImage from 'assets/img/SidebarHelpImage.png';
import IconBox from 'components/Icons/IconBox';

import { QuestionIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';

export function SidebarHelp(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;
  return (
    <Flex
      borderRadius="15px"
      flexDirection="column"
      bgImage={SidebarHelpImage}
      justifyContent="flex-start"
      alignItems="start"
      boxSize="border-box"
      p="16px"
      h="170px"
      w="100%"
    >
      <IconBox width="35px" h="35px" bg="white" mb="auto">
        <QuestionIcon color="teal.300" h="18px" w="18px" />
      </IconBox>
      <Text fontSize="sm" color="white" fontWeight="bold">
        Need help?
      </Text>
      <Text fontSize="xs" color="white" mb="10px">
        Please check our docs
      </Text>
      <Link
        w="100%"
        href="https://plutoexchange.org/plutoexchange/otherfiles/PlutoExchangeWhitepaper.pdf"
        target="_blank"
      >
        <Button
          fontSize="10px"
          fontWeight="bold"
          w="100%"
          bg="white"
          _hover="none"
          _active={{
            bg: "white",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
          color="black"
        >
          DOCUMENTATION
        </Button>
      </Link>
    </Flex>
  );
}
