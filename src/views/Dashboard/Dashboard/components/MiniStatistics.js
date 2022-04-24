import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import IconBox from 'components/Icons/IconBox';
import { onAuthStateChanged } from 'firebase/auth';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import { auth } from 'views/Auth/firebase-config';

// Chakra imports
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

const MiniStatistics = ({
  nftimage,
  title,
  usdAmount,
  percentage,
  icon,
  owner,
}) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userBoughtNftId, setUserBoughtNftId] = useState();

  function buttonAlert() {
    const customersNftBalance = customer.nftBalanceUrl;

    console.log(nftPrice);
    convertBalanceToNumbers();
    console.log(nftAmount);
    console.log(customerAmount);
    // console.log(returnNftObject);
    console.log(returnNftObject);
    console.log(customersNftBalance);

    setUserBoughtNftId(returnNftObject.id);

    console.log(userBoughtNftId);

    // if ((customerAmount) => nftAmount) {
    //   console.log("customer is eligible to buy");
    // }
    // let voteable = customerAmount < nftAmount ? "you cant buy" : "you can buy";
    // console.log(voteable + " this nft");
    if (customerAmount > nftAmount) {
      document.getElementById("buyButton").disabled = true;
      triggerSuccess();
      nftDelete();
      setTimeout(waitBeforeReload, 3000);
    } else {
      triggerFailure();
    }
  }

  function waitBeforeReload() {
    location.reload();
  }

  // api delete function
  const nftDelete = () => {
    fetch("http://localhost:8000/nfts/" + userBoughtNftId, {
      method: "DELETE",
    });
  };

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  // getData();

  // nftDelete();

  const [sendData, setSendData] = useState({});

  const crappyData = {
    userId: "1",
    title: "crappy shit",
    body: "I just posted some crappy shits",
  };

  // setSendData(crappyData);

  function rendersPost() {
    setSendData(crappyData);
    useEffect(() => {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", sendData)
        .then((responses) => {
          console.log(responses);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  const [nftAmount, setNftAmount] = useState();
  const [customerAmount, setCustomerAmount] = useState();

  // this is only converthing $34,848 to 34848 for both the user balance and the nft cost
  function convertBalanceToNumbers() {
    let a = usdAmount;
    let b = customer.money;

    a = a.replace(/\,/g, "");
    a = a.replace(/\$/g, "");
    a = Number(a);
    setNftAmount(a);

    b = b.replace(/\,/g, "");
    b = b.replace(/\$/g, "");
    b = Number(b);
    setCustomerAmount(b);
  }

  const nftName = title;
  const nftPrice = usdAmount;

  // var a = usdAmount;
  // a = a.replace(/\,/g, "");
  // console.log(a);

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // getiing nft data from remote api
  const [nftData, setNftData] = useState([]);

  const nftUrl = "http://localhost:8000/nfts/";

  useEffect(() => {
    axios
      .get(nftUrl)
      .then((res) => {
        setNftData(res.data);
        getNftData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nftUrl]);

  function getNftData() {
    console.log(nftData);
  }

  const returnNftObject = nftData.find(findNFT);

  function findNFT(item) {
    return item.title === nftName;
  }

  // getting customer's data from api endpoint

  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/customers")
      .then((res) => {
        setCustomerData(res.data);
        activateCustomer();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //

  const customer = customerData.find(findUser);

  // const customerNftBalance = customer.nftBalanceUrl;

  function activateCustomer() {
    console.log(customer.nftBalanceUrl);
  }

  function findUser(person) {
    return person.userUid === user?.uid;
  }

  function triggerSuccess() {
    toast.success("success");
  }

  function triggerFailure() {
    toast.error("Insufficient Funds");
  }

  return (
    <>
      <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ToastContainer />
        <ModalContent>
          <ModalHeader>
            {title} ({usdAmount})
            <Card minH="83px">
              <img src={nftimage} alt="nft-image" />
            </Card>
          </ModalHeader>
          <ModalBody>
            <Button
              size="md"
              height="48px"
              width="200px"
              border="2px"
              id="buyButton"
              borderColor="green.500"
              marginLeft={81}
              onClick={buttonAlert}
            >
              CLICK TO BUY
            </Button>
          </ModalBody>
          <ModalFooter>Balance: {customer?.money}</ModalFooter>
          <ModalCloseButton colorScheme="teal" />
        </ModalContent>
      </Modal>

      <Card minH="83px">
        <img src={nftimage} alt="nft-image" p="15px" onClick={onOpen} />
        <CardBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                {title} <br /> owned by: {owner}
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor}>
                  {usdAmount}
                </StatNumber>
                <StatHelpText
                  alignSelf="flex-end"
                  justifySelf="flex-end"
                  m="0px"
                  color={percentage > 0 ? "green.400" : "red.400"}
                  fontWeight="bold"
                  ps="3px"
                  fontSize="md"
                >
                  {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
                </StatHelpText>
              </Flex>
            </Stat>
            <IconBox onClick={onOpen} h={"45px"} w={"45px"} bg={iconTeal}>
              {icon}
            </IconBox>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default MiniStatistics;
