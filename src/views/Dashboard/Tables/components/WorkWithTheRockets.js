import React, {
  useEffect,
  useState,
} from 'react';

import creditCardIcon from 'assets/img/IMG_9850.JPG';
import cryptoIcon from 'assets/img/IMG_98512.jpg';
import axios from 'axios';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'views/Auth/firebase-config';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import NftBalancePop from './nftBalancePop';

function copyCryptoAddress() {
  alert("address copied");
}

const WorkWithTheRockets = ({
  title,
  description,
  amount,
  nftAmount,
  nameValue,
  icon,
  nftIcon,
  staked,
  stakedAmount,
  stakedCrypto,
  stakedIcon,
}) => {
  const overlayRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // getting customer's data from remote api

  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/customers")
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(customerData);

  const res = customerData.find(findUser);

  function findUser(person) {
    return person.userUid === user?.uid;
  }
  const customerNftBalance = res?.nftBalanceUrl;

  // customerNftBalance is the displaced nfts on dashboard base on user holdings

  console.log(customerNftBalance + "here is customers nfts");

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dashboard Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Deposit</Tab>
                <Tab>Withdraw</Tab>
                <Tab>Transfer (USD)</Tab>
                <Tab>Transfer (NFT)</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex direction="row">
                    <Button width={200} height={110} bg="transparent">
                      <img
                        src={creditCardIcon}
                        alt="nft-image"
                        height={110}
                        width={200}
                      />
                    </Button>
                    <Button
                      width={200}
                      height={110}
                      bg="transparent"
                      onClick={copyCryptoAddress}
                    >
                      <img
                        src={cryptoIcon}
                        alt="nft-image"
                        height={110}
                        width={200}
                      />
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap="6">
                    <Input
                      placeholder="Enter Wallet Address"
                      color="white"
                      type="text"
                      _placeholder={{ color: "grey" }}
                    />
                    <Flex direction="row" gap={5}>
                      <Input
                        placeholder="Amount (USD)"
                        color="white"
                        type="number"
                        _placeholder={{ color: "grey" }}
                      />
                      <Select placeholder="Select Chain" width="300px">
                        <option value="option1">Doge</option>
                        <option value="option2">Ethereum</option>
                        <option value="option3">Litecoin</option>
                        <option value="option4">Smart Chain</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue">Confirm</Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={5}>
                    <Input
                      placeholder="Enter User's Email Address"
                      color="white"
                      type="text"
                      _placeholder={{ color: "grey" }}
                    />
                    <Input
                      placeholder="Amount (USD)"
                      color="white"
                      type="number"
                      _placeholder={{ color: "grey" }}
                    />
                    <Button colorScheme="blue">Confirm</Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={5}>
                    <Input
                      placeholder="Enter User's Email Address"
                      color="white"
                      type="text"
                      _placeholder={{ color: "grey" }}
                    />
                    <Input
                      placeholder="NFT Name"
                      color="white"
                      type="text"
                      _placeholder={{ color: "grey" }}
                    />

                    <Button colorScheme="blue">Confirm</Button>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Text color="grey">Pluto Exchange</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Card maxHeight="500px" p="0.5rem">
        <CardBody
          p="0px"
          bgPosition="center"
          bgRepeat="no-repeat"
          w="100%"
          h={{ sm: "300px", lg: "300px" }}
          bgSize="cover"
          position="relative"
          borderRadius="15px"
        >
          <Box
            w="100%"
            position="absolute"
            h="inherit"
            borderRadius="inherit"
            ref={overlayRef}
          ></Box>
          <Portal containerRef={overlayRef}>
            <Flex
              flexDirection="column"
              color="white"
              p="1.5rem 1.2rem 0.3rem 1.2rem"
              lineHeight="1.6"
            >
              <Text fontSize="xl" color="gray.500" fontWeight="bold" pb=".3rem">
                {title}
              </Text>
              <br />
              <Flex flexDirection="row" gap={1}>
                <Text fontSize="l" color={textColor} pb=".3rem">
                  {icon} {nameValue}
                </Text>
                <Text
                  fontSize="15px"
                  fontWeight="bold"
                  color="green.400"
                  pb=".3rem"
                >
                  {amount}
                </Text>
              </Flex>
              <br />
              <Flex direction="row" gap={1}>
                <Text fontSize="l" color={textColor} pb=".3rem">
                  {stakedIcon} {staked}
                </Text>

                <Text
                  fontSize="15px"
                  fontWeight="bold"
                  color="green.400"
                  pb=".3rem"
                >
                  {stakedAmount}
                </Text>
                <Text
                  fontSize="15px"
                  fontWeight="bold"
                  color="green.400"
                  pb=".3rem"
                >
                  {stakedCrypto}
                </Text>
              </Flex>
              <br />

              <Flex flexDirection="row" gap={2}>
                <Text fontSize="l" color={textColor}>
                  {nftIcon} {description}
                </Text>
                <Text fontSize="l" fontWeight="bold" color="green.400">
                  {nftAmount}
                </Text>
              </Flex>

              <CardBody height="25" width="25">
                {customerNftBalance?.map((post) => (
                  <NftBalancePop
                    key={post.id}
                    title={post?.title}
                    nftimage={post.image}
                  />
                )) || (
                  <Text marginTop="30px" marginLeft="15px" color="blue.200">
                    Your NFTs holdings Will Appear here!
                  </Text>
                )}

                {/* <NftBalancePop 
                  title={res?.name}
                  nftimage={res?.nftBalanceUrl[0]}
                  
                  /> */}
              </CardBody>
            </Flex>
          </Portal>
        </CardBody>
        <br />

        <Button
          size="md"
          height="48px"
          width="100%"
          border="1px"
          borderColor="green.600"
          marginLeft={0}
          onClick={onOpen}
        >
          Dashboard Options
        </Button>
        <br />
      </Card>
    </>
  );
};

export default WorkWithTheRockets;
