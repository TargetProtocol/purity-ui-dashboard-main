import React from 'react';

import { ClockIcon } from 'components/Icons/Icons';

// chakra imports
import {
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export function ItemContent(props) {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";
  return (
    <>
      <Flex direction="row">
        <Image
          name={props.aName}
          src={props.aSrc}
          borderRadius="12px"
          me="16px"
          width={70}
          height={70}
        />
        <Flex flexDirection="column">
          <Text fontSize="14px" mb="5px" color={notificationColor}>
            <Text fontWeight="bold" fontSize="14px" as="span">
              {props.boldInfo}
              {spacing}
            </Text>
            {props.info} <br />
            <Text fontWeight="bold" fontSize="14px" as="span" color="green">
              {props.boldInfoPrice}
            </Text>
          </Text>
          <Flex alignItems="center">
            <ClockIcon color={navbarIcon} w="13px" h="13px" me="3px" />
            <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
              {props.time}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <br />
    </>
  );
}
