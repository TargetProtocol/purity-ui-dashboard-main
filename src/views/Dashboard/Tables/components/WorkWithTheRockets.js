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
  dollarSign,
  stakedCutter,
}) => {
  const overlayRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // getting customer's data from remote api

  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    axios
      .get("http://31.220.63.27:8080/api/customer")
      .then((res) => {
        setCustomersData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(customersData);

  const res = customersData.find(findUser);

  function findUser(person) {
    return person.userUid === user?.uid;
  }
  const customerNftBalance = res?.nftBalanceUrl;

  // customerNftBalance is the displaced nfts on dashboard base on user holdings

  console.log(customerNftBalance);

  const textColor = useColorModeValue("gray.700", "white");

  // redirecting user to another page
  function redirect() {
    location.replace("billing");
  }

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [userWallet, setUserWallet] = useState("");
  const [withdrawalChain, setWithdrawalChain] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [usdTransferAmount, setUsdTransferAmount] = useState("");
  const [nftName, setNftName] = useState("");

  const handleUsdTransfer = (e) => {
    const senderEmail = user.email;
    const usdTransferDetails = { usdTransferAmount, userEmail, senderEmail };

    swal({
      title: "Want to continue?",
      text:
        "Are you sure you want to send $" +
        usdTransferAmount +
        " to " +
        userEmail,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your transfer is pending and will update soon", {
          icon: "success",
        });
        fetch("http://31.220.63.27:8080/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usdTransferDetails),
        }).then(() => {});
        setUsdTransferAmount("");
        setUserEmail("");
        onClose();
      } else {
        swal("Come back later to transfer", { icon: "error" });
      }
      setUsdTransferAmount("");
      setUserEmail("");
      onClose();
    });
  };

  const handleNftTransfer = (e) => {
    const senderEmail = user.email;
    const usdTransferNftDetails = { nftName, userEmail, senderEmail };

    swal({
      title: "Want to continue?",
      text: "Are you sure you want to send " + nftName + " to " + userEmail,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your transfer is pending and will update soon", {
          icon: "success",
        });
        fetch("http://31.220.63.27:8080/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usdTransferNftDetails),
        }).then(() => {});
        setUserEmail("");
        setNftName("");
        onClose();
      } else {
        swal("Come back later to transfer", { icon: "error" });
      }
      setUserEmail("");
      setNftName("");
      onClose();
    });
  };

  const handleWithdraw = (e) => {
    const senderEmail = user.email;
    const usdWithdrawalDetails = {
      withdrawAmount,
      userWallet,
      withdrawalChain,
      senderEmail,
    };
    console.log(usdWithdrawalDetails);

    swal({
      title: "Want to continue?",
      text: "Are you sure you want to Withdraw $" + withdrawAmount + "?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your transfer is pending and will update soon", {
          icon: "success",
        });
        fetch("http://31.220.63.27:8080/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usdWithdrawalDetails),
        }).then(() => {});
        setWithdrawalChain("Select Chain");
        setWithdrawAmount("");
        setUserWallet("");
        onClose();
      } else {
        swal("Come back later to transfer", { icon: "error" });
      }
      setWithdrawAmount("");
      setWithdrawalChain("Select Chain");
      setUserWallet("");
      onClose();
    });
  };

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
                    <Button
                      width={200}
                      height={110}
                      bg="transparent"
                      onClick={redirect}
                    >
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
                      onClick={redirect}
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
                      value={userWallet || ""}
                      onChange={(e) => setUserWallet(e.target.value)}
                      _placeholder={{ color: "grey" }}
                    />
                    <Flex direction="row" gap={5}>
                      <Input
                        placeholder="Amount (USD)"
                        color="white"
                        type="number"
                        value={withdrawAmount || ""}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        _placeholder={{ color: "grey" }}
                      />
                      <Select
                        placeholder="Select Chain"
                        width="300px"
                        value={withdrawalChain}
                        onChange={(e) =>
                          setWithdrawalChain(e.target.value) || ""
                        }
                      >
                        <option value="Doge">Doge</option>
                        <option value="Ethereum">Ethereum</option>
                        <option value="Litecoin">Litecoin</option>
                        <option value="Smart Chain">Smart Chain</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue" onClick={handleWithdraw}>
                      Confirm
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={5}>
                    <Input
                      placeholder="Enter User's Email Address"
                      color="white"
                      type="text"
                      value={userEmail || ""}
                      onChange={(e) => setUserEmail(e.target.value)}
                      _placeholder={{ color: "grey" }}
                    />
                    <Input
                      placeholder="Amount (USD)"
                      color="white"
                      type="number"
                      value={usdTransferAmount || ""}
                      onChange={(e) => setUsdTransferAmount(e.target.value)}
                      _placeholder={{ color: "grey" }}
                    />
                    <Button colorScheme="blue" onClick={handleUsdTransfer}>
                      Confirm
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={5}>
                    <Input
                      placeholder="Enter User's Email Address"
                      color="white"
                      type="text"
                      value={userEmail || ""}
                      onChange={(e) => setUserEmail(e.target.value)}
                      _placeholder={{ color: "grey" }}
                    />
                    <Input
                      placeholder="NFT Name"
                      color="white"
                      type="text"
                      value={nftName || ""}
                      onChange={(e) => setNftName(e.target.value)}
                      _placeholder={{ color: "grey" }}
                    />

                    <Button colorScheme="blue" onClick={handleNftTransfer}>
                      Confirm
                    </Button>
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
                  {dollarSign}
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
                  {dollarSign}
                </Text>

                <Text
                  fontSize="15px"
                  fontWeight="bold"
                  color="green.400"
                  pb=".3rem"
                >
                  {stakedAmount}
                </Text>
                <Text>{stakedCutter}</Text>
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
