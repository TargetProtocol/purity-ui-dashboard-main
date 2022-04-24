// Chakra imports
import {
    Flex,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Modal,
    Text,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
    
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import IconBox from "components/Icons/IconBox";
  import React from "react";
 
  
  const NftBalancePop = ({ nftimage, title }) => {
    const iconTeal = useColorModeValue("teal.300", "teal.300");
    const textColor = useColorModeValue("gray.700", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();
    function buttonAlert () {
      alert("clicked");
    }

    
  
    return (
      <>
        <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> {title}
            <Card minH="83px">
                <img src={nftimage} alt="nft-image" />
              </Card>
              <Text fontSize='l' marginLeft={110}>
                Input Price
              </Text>
            </ModalHeader>
            
            <NumberInput
              height='45px'
              width='200px'
              marginLeft={90}
              defaultValue={2000}
              borderRadius="15%"
              >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
             <ModalBody>
              <Button
              size='md'
              height='48px'
              width='200px'
              border='2px'
              borderColor='green.500'
              marginLeft={69}
              >
               SELL
             </Button>
            </ModalBody>          
            <ModalCloseButton colorScheme="teal" />
          </ModalContent>
        </Modal>
        
            <Card width="100%">
                <CardBody width="100%">
                        <img src={nftimage} alt="nft-image" width="60" height="60" onClick={onOpen} />
                </CardBody>
            </Card>
       
      </>
    );
  };
  
  export default NftBalancePop;
  
  