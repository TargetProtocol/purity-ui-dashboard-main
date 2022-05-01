import React, { useState } from 'react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import { onAuthStateChanged } from 'firebase/auth';
import swal from 'sweetalert';
import { auth } from 'views/Auth/firebase-config';

// Chakra imports
import {
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

const BuiltByDevelopers = ({ title, name, description, image }) => {
  const textColor = useColorModeValue("white", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  // getting user's  emails
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser?.email);
  });

  // sweet alert
  function testingSweetAlert() {
    swal({
      title: "Want to continue?",
      text: "Are you sure you want to Stake this amount?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You staking is successfull and will update soon", {
          icon: "success",
        });
        onClose();
      } else {
        swal("Come back later to stake", { icon: "error" });
      }
      onClose();
    });
  }

  const [btcStakeAmount, setBtcStakeAmount] = useState();
  const [btcStakePlan, setBtcStakePlan] = useState("");

  const [ethStakeAmount, setEthStakeAmount] = useState();
  const [ethStakePlan, setEthStakePlan] = useState("");

  const [ltcStakeAmount, setLtcStakeAmount] = useState();
  const [ltcStakePlan, setLtcStakePlan] = useState("");

  const [dogeStakeAmount, setDogeStakeAmount] = useState();
  const [dogeStakePlan, setDogeStakePlan] = useState("");

  const handleBtcSubmit = (e) => {
    const btcStakeDetails = { btcStakeAmount, btcStakePlan, user };

    swal({
      title: "Want to continue?",
      text: "Are you sure you want to Stake $" + btcStakeAmount,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You staking is successfull and will update soon", {
          icon: "success",
        });
        fetch("http://31.220.63.27:8080/api/staking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(btcStakeDetails),
        }).then(() => {
          console.log("new Staking added");
        });
        setBtcStakeAmount("");
        setBtcStakePlan("Select Plan");
        onClose();
      } else {
        swal("Come back later to stake", { icon: "error" });
      }
      setBtcStakeAmount("");
      setBtcStakePlan("Select Plan");
      onClose();
    });
  };

  const handleEthSubmit = (e) => {
    const ethStakeDetails = { ethStakeAmount, ethStakePlan, user };
    swal({
      title: "Want to continue?",
      text: "Are you sure you want to Stake $" + ethStakeAmount,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You staking is successfull and will update soon", {
          icon: "success",
        });
        fetch("http://31.220.63.27:8080/api/staking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ethStakeDetails),
        }).then(() => {
          console.log("new Staking added");
        });
        setEthStakeAmount("");
        setEthStakePlan("Select Plan");
        onClose();
      } else {
        swal("Come back later to stake", { icon: "error" });
      }
      setEthStakeAmount("");
      setEthStakePlan("Select Plan");
      onClose();
    });
  };

  const handleLtcSubmit = (e) => {
    const ltcStakeDetails = { ltcStakeAmount, ltcStakePlan, user };
    swal({
      title: "Want to continue?",
      text: "Are you sure you want to Stake $" + ltcStakeAmount,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You staking is successfull and will update soon", {
          icon: "success",
        });
        fetch("http://31.220.63.27:8080/api/staking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ltcStakeDetails),
        }).then(() => {
          console.log("new Staking added");
        });
        setLtcStakeAmount("");
        setLtcStakePlan("Select Plan");
        onClose();
      } else {
        swal("Come back later to stake", { icon: "error" });
      }
      setLtcStakeAmount("");
      setLtcStakePlan("Select Plan");
      onClose();
    });
  };

  const handleDogeSubmit = (e) => {
    const dogeStakeDetails = { dogeStakeAmount, dogeStakePlan, user };
    swal({
      title: "Want to continue?",
      text: "Are you sure you want to Stake $" + dogeStakeAmount,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You staking is successfull and will update soon", {
          icon: "success",
        });
        fetch("http://31.220.63.27:8080/api/staking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dogeStakeDetails),
        }).then(() => {
          console.log("new Staking added");
        });
        setDogeStakeAmount("");
        setDogeStakePlan("Select Plan");
        onClose();
      } else {
        swal("Come back later to stake", { icon: "error" });
      }
      setDogeStakeAmount("");
      setDogeStakePlan("Select Plan");
      onClose();
    });
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stake your favorite Cryptocurrency</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Bitcoin (BTC)</Tab>
                <Tab>Ethereum (ETH)</Tab>
                <Tab>Litecoin (LTC)</Tab>
                <Tab>Dogecoin (DOGE)</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex direction="column" gap={10}>
                    <Flex direction="row" gap={5}>
                      <Input
                        id="btcInput"
                        type="number"
                        placeholder="Amount (USD)"
                        color="white"
                        required
                        value={btcStakeAmount || ""}
                        onChange={(e) => setBtcStakeAmount(e.target.value)}
                        _placeholder={{ color: "grey" }}
                      />
                      <Select
                        value={btcStakePlan}
                        onChange={(e) => setBtcStakePlan(e.target.value) || ""}
                        placeholder="Select Plan"
                        width="300px"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Premium">Premium</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue" onClick={handleBtcSubmit}>
                      Confirm
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={10}>
                    <Flex direction="row" gap={5}>
                      <Input
                        type="number"
                        placeholder="Amount (USD)"
                        color="white"
                        required
                        value={ethStakeAmount || ""}
                        onChange={(e) => setEthStakeAmount(e.target.value)}
                        _placeholder={{ color: "grey" }}
                      />
                      <Select
                        value={ethStakePlan}
                        onChange={(e) => setEthStakePlan(e.target.value)}
                        placeholder="Select Plan"
                        width="300px"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Premium">Premium</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue" onClick={handleEthSubmit}>
                      Confirm
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={10}>
                    <Flex direction="row" gap={5}>
                      <Input
                        type="number"
                        placeholder="Amount (USD)"
                        color="white"
                        required
                        value={ltcStakeAmount || ""}
                        onChange={(e) => setLtcStakeAmount(e.target.value)}
                        _placeholder={{ color: "grey" }}
                      />
                      <Select
                        value={ltcStakePlan}
                        onChange={(e) => setLtcStakePlan(e.target.value)}
                        placeholder="Select Plan"
                        width="300px"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Premium">Premium</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue" onClick={handleLtcSubmit}>
                      Confirm
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={10}>
                    <Flex direction="row" gap={5}>
                      <Input
                        type="number"
                        placeholder="Amount (USD)"
                        color="white"
                        required
                        value={dogeStakeAmount || ""}
                        onChange={(e) => setDogeStakeAmount(e.target.value)}
                        _placeholder={{ color: "grey" }}
                      />
                      <Select
                        value={dogeStakePlan}
                        onChange={(e) => setDogeStakePlan(e.target.value)}
                        placeholder="Select Plan"
                        width="300px"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Premium">Premium</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue" onClick={handleDogeSubmit}>
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

      <Card minHeight="290.5px" p="1.2rem">
        <CardBody w="100%">
          <Flex flexDirection={{ sm: "column", lg: "column" }} w="100%">
            <Text fontSize="xl" color="gray.500" fontWeight="bold" pb=".3rem">
              {name}
            </Text>
            <Flex
              bg={textColor}
              align="center"
              justify="center"
              borderRadius="15px"
              width={{ lg: "100%" }}
              onClick={onOpen}
              minHeight={{ sm: "250px" }}
            >
              {image}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default BuiltByDevelopers;
