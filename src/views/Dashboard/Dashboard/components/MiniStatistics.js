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
import swal from 'sweetalert';
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

    console.log(nftAmount);
    console.log(customerAmount);
    // console.log(returnNftObject);
    console.log(returnNftObject);
    console.log(customersNftBalance);

    setUserBoughtNftId(returnNftObject.id);

    console.log(userBoughtNftId);

    const customerEmail = user.email;

    const nftBuy = { title, usdAmount, customerEmail };

    if (customer?.money > nftAmount) {
      document.getElementById("buyButton").disabled = true;

      swal({
        title: "Want to continue?",
        text: "Buy " + title + " for " + usdAmount,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          fetch("http://31.220.63.27:8080/api/buynft", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nftBuy),
          }).then(() => {
            console.log(nftBuy);
            console.log("new Staking added");
          });
          triggerSuccess();
          onClose();
          swal("You successfully bought " + title, {
            icon: "success",
          });
        } else {
          onClose();
          swal("Goodbye!", { icon: "error" });
        }
      });
    } else {
      triggerFailure();
      document.getElementById("buyButton").disabled = true;
    }
  }

  function waitBeforeReload() {
    location.reload();
  }

  // api delete function
  const nftDelete = () => {
    fetch("http://31.220.63.27:8080/api/nftmarket" + userBoughtNftId, {
      method: "DELETE",
    });
  };

  // getData();

  // nftDelete();

  const [sendData, setSendData] = useState({});

  const crappyData = {
    data1: {
      name: "We Move",
    },
    data2: {
      name: "Lets moon",
      age: "350",
      money: "1",
      staked: "1",
    },
  };

  function testingSweetAlert() {
    swal({
      title: "Want to continue?",
      text: "Are you sure you wan to buy this NFT?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        triggerSuccess();
        onClose();
        swal("You successfully bought this NFT", {
          icon: "success",
        });
      } else {
        onClose();
        swal("Goodbye!", { icon: "error" });
      }
    });
  }

  // Trying PUT with fetch
  function updateData() {
    fetch("http://31.220.63.27:8080/api/savenft", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data1: {
          name: "Kufre Move",
        },
        data2: {
          name: "You gon be fine my bro",
          age: "25",
          money: "8930238",
          staked: "7023983",
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("PUT REQUEST SUCCESSFUL");
        } else {
          console.log("PUT request not successful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
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

  // this will call two functions.. one to change the price and the other to open modell
  function executeOnopen() {
    onOpen();
    convertBalanceToNumbers();
  }

  // var a = usdAmount;
  // a = a.replace(/\,/g, "");
  // console.log(a);

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // getiing nft data from remote api
  const [nftData, setNftData] = useState([]);

  const nftUrl = "http://31.220.63.27:8080/api/nftmarket";

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
      .get("http://31.220.63.27:8080/api/customer")
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
          <ModalFooter>Wallet Balance: $ {customer?.money}</ModalFooter>
          <ModalCloseButton colorScheme="teal" />
        </ModalContent>
      </Modal>

      <Card minH="83px">
        <img src={nftimage} alt="nft-image" p="15px" onClick={executeOnopen} />
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
            <IconBox
              onClick={executeOnopen}
              h={"45px"}
              w={"45px"}
              bg={iconTeal}
            >
              {icon}
            </IconBox>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default MiniStatistics;
