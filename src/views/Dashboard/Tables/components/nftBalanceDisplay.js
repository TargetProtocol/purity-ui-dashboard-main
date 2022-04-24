// Chakra imports
import {
    Flex,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import React from "react";
  
  const nftBalanceDisplay = ({ nftimage }) => {
    const iconTeal = useColorModeValue("teal.300", "teal.300");
    const textColor = useColorModeValue("gray.700", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Card>
          <img src={nftimage} alt="nft-image" p="15px" />
        </Card>
      </>
    );
  };
  
  export default nftBalanceDisplay;
  
  