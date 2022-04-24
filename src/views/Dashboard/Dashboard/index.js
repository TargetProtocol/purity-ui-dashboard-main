import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
// Custom icons
import { CartIcon } from 'components/Icons/Icons.js';
import { onAuthStateChanged } from 'firebase/auth';
import { Moralis } from 'moralis';
import { useMoralis } from 'react-moralis';
import { ToastContainer } from 'react-toastify';

// Chakra imports
import {
  Flex,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

import { auth } from '../../Auth/firebase-config';
import MiniStatistics from './components/MiniStatistics';

export default function Dashboard(props) {
  const iconBoxInside = useColorModeValue("white", "white");
  const {
    variant,
    children,
    fixed,
    secondary,
    brandText,
    onOpen,
    ...rest
  } = props;

  // user represent particular user

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  // const res = game.find(findUser);

  function findUser(person) {
    return person.userUid === user?.uid;
  }

  const [posts, setPosts] = useState([]);

  const nftUrl = "http://localhost:8000/nfts/";

  useEffect(() => {
    axios
      .get(nftUrl)
      .then((res) => {
        console.log(res.data);

        setPosts(res.data);
        logResponse();
        setIsPending(false);
        console.log("url came");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nftUrl]);

  // useEffect(() => {
  //   axios
  //     .get(nftUrl)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [nftUrl]);

  const { authenticate } = useMoralis();

  (async function () {
    Moralis.initPlugins();
  })();

  const [isPending, setIsPending] = useState(true);

  const sendNftObject = () => {
    fetch(
      "https://data.mongodb-api.com/app/data-bqahq/endpoint/data/beta/action/insertOne",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "nenBCF99Xojo8qli5IbxdtbcEswPNBjdr7ofVdywpPSEFWFes5ed80vxWv8BFyuS",
        },
        body: {
          dataSource: "Cluster0",
          database: "household",
          collection: "pets",
          document: { name: "Sheep", breed: "Gaaa", age: 2 },
        },
      }
    );
  };

  // handing received data from api endpoint

  const [customerData, setcustomerData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/customers")
      .then((res) => {
        setcustomerData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // console.log(customerData.nftBalanceUrl);

  // this gives the objec of an nft using any of the nft parameter
  const getUserNft = customerData.find(userNft);
  console.log(customerData);

  function userNft(item) {
    return item.nftBalanceUrl;
  }

  console.log(getUserNft?.nftBalanceUrl);
  console.log(posts);

  // returnFunc holds the complete object of the NFT

  const returnFunc = posts.find(findNFT);

  function findNFT(item) {
    return item.id === posts.id;
  }

  function logResponse() {
    console.log(returnFunc);
  }

  // const notify = () => {
  //   toast("Basic Notification", { position: toast.POSITION.TOP_LEFT });
  //   toast("Basic Notification", { position: toast.POSITION.TOP_CENTER });
  // };

  // testing toastify

  // useEffect(() => {
  //   toast.success("success");
  // }, []);

  console.log(user);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <div>
        <h1>{brandText}</h1>
      </div>
      {isPending && <div>Loading...</div>}
      <div>
        <ToastContainer theme="dark" />
      </div>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        {posts?.map((postz) => (
          <MiniStatistics
            key={postz?.id}
            title={postz?.title}
            owner={postz?.owner}
            // nftimg = {"IMG_9442.GIF"}
            usdAmount={postz?.usdAmount}
            percentage={postz?.percentage}
            nftimage={postz?.imageURL}
            icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
