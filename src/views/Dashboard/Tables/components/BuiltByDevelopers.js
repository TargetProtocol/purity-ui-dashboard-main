import React from 'react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';

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
                        type="number"
                        placeholder="Amount (USD)"
                        color="white"
                        _placeholder={{ color: "grey" }}
                      />
                      <Select placeholder="Select Plan" width="300px">
                        <option value="option1">Basic</option>
                        <option value="option2">Intermediate</option>
                        <option value="option3">Premium</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue">Confirm</Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={10}>
                    <Flex direction="row" gap={5}>
                      <Input
                        placeholder="Amount (USD)"
                        color="white"
                        type="number"
                        _placeholder={{ color: "grey" }}
                      />
                      <Select placeholder="Select Plan" width="300px">
                        <option value="option1">Basic</option>
                        <option value="option2">Intermediate</option>
                        <option value="option3">Premium</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue">Confirm</Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={10}>
                    <Flex direction="row" gap={5}>
                      <Input
                        placeholder="Amount (USD)"
                        color="white"
                        type="number"
                        _placeholder={{ color: "grey" }}
                      />
                      <Select placeholder="Select Plan" width="300px">
                        <option value="option1">Basic</option>
                        <option value="option2">Intermediate</option>
                        <option value="option3">Premium</option>
                      </Select>
                    </Flex>
                    <Button colorScheme="blue">Confirm</Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" gap={10}>
                    <Flex direction="row" gap={5}>
                      <Input
                        placeholder="Amount (USD)"
                        color="white"
                        type="number"
                        _placeholder={{ color: "grey" }}
                      />
                      <Select placeholder="Select Plan" width="300px">
                        <option value="option1">Basic</option>
                        <option value="option2">Intermediate</option>
                        <option value="option3">Premium</option>
                      </Select>
                    </Flex>
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
