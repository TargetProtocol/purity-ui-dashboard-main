import React, { useState } from 'react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'views/Auth/firebase-config';

// Chakra imports
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

const NftBalancePop = ({ nftimage, title }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  function buttonAlert() {
    alert("clicked");
  }

  // getting user's  emails
  const [sellerEmail, setSellerEmail] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setSellerEmail(currentUser?.email);
  });

  const nftName = title;

  const [nftSellPrice, setNftSellPrice] = useState("");
  const sellNft = (e) => {
    const nftSell = { nftName, nftSellPrice, sellerEmail };

    swal({
      title: "Want to continue?",
      text:
        "Are you sure you want to Sell " +
        title +
        " for $" +
        nftSellPrice +
        "?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Confirmed! Order pending", {
          icon: "success",
        });
        fetch("http://31.220.63.27:8080/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nftSell),
        }).then(() => {
          console.log("new Staking added");
        });
        setNftSellPrice("");
        onClose();
      } else {
        swal("Keep Hodling " + nftName + ".", { icon: "error" });
      }
      setNftSellPrice("");
      onClose();
    });
  };

  // sweet alert

  return (
    <>
      <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {" "}
            {title}
            <Card minH="83px">
              <img src={nftimage} alt="nft-image" />
            </Card>
            <Text fontSize="l" marginLeft={110}>
              Input Price
            </Text>
          </ModalHeader>

          <Input
            type="number"
            placeholder="Amount (USD)"
            color="white"
            required
            width="50%"
            marginLeft="25%"
            value={nftSellPrice || ""}
            onChange={(e) => setNftSellPrice(e.target.value)}
            _placeholder={{ color: "grey" }}
          />
          <ModalBody>
            <br />
            <Button
              size="md"
              height="48px"
              width="200px"
              border="2px"
              borderColor="green.500"
              marginLeft={69}
              onClick={sellNft}
            >
              SELL
            </Button>
            <br />
            <br />
          </ModalBody>

          <ModalCloseButton colorScheme="teal" />
        </ModalContent>
      </Modal>

      <Card width="100%">
        <CardBody width="100%">
          <img
            src={nftimage}
            alt="nft-image"
            width="60"
            height="60"
            onClick={onOpen}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default NftBalancePop;
