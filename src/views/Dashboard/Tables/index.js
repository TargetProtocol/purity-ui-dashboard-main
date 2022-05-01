import React, {
  useEffect,
  useState,
} from 'react';

import logoChakra from 'assets/img/IMG_9104.GIF';
import axios from 'axios';
import BarChart from 'components/Charts/BarChart';
import LineChart from 'components/Charts/LineChart';
import { CreditIcon } from 'components/Icons/Icons.js';
import img1 from 'components/images/images';
import { onAuthStateChanged } from 'firebase/auth';
import { tablesTableData } from 'variables/general';

import {
  LockIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
// Chakra imports
import {
  Flex,
  Grid,
  Image,
} from '@chakra-ui/react';

import { auth } from '../../Auth/firebase-config';
import Transactions from '../Billing/components/Transactions';
import ActiveUsers from './components/ActiveUsers';
import Authors from './components/Authors';
import BuiltByDevelopers from './components/BuiltByDevelopers';
import Projects from './components/Projects';
import SalesOverview from './components/SalesOverview';
import WorkWithTheRockets from './components/WorkWithTheRockets';

console.log(img1);

function stakeClicked() {
  console.log(tablesTableData);
}

function Tables() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // getting Top 6 users data
  const [top6Data, setTop6Data] = useState([]);

  useEffect(() => {
    axios
      .get("http://31.220.63.27:8080/api/topsixusers")
      .then((res) => {
        setTop6Data(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    axios
      .get("http://31.220.63.27:8080/api/topsixnfts")
      .then((res) => {
        setTopSixNfts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get("http://31.220.63.27:8080/api/activeusersection")
      .then((res) => {
        setActiveUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    axios
      .get("http://31.220.63.27:8080/api/customer")
      .then((res) => {
        setCustomerData(res.data);
        setNewestTransactions(res?.data[0].userNewTranaction);
        setOlderTransactions(res?.data[0].userOldTransaction);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [activeUser, setActiveUser] = useState("");

  // getting Top 6 users Nft
  const [topSixNfts, setTopSixNfts] = useState([]);

  const [newestTransactions, setNewestTransactions] = useState([]);
  const [olderTransactions, setOlderTransactions] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://31.220.63.27:8080/api/topsixnfts")
  //     .then((res) => {
  //       setTopSixNfts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  // getting customer's data from api endpoint

  const [customerData, setCustomerData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://31.220.63.27:8080/api/customer")
  //     .then((res) => {
  //       setCustomerData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  const res = customerData.find(findUser);

  function callUserData() {
    console.log(newestTransactions);
  }

  function findUser(person) {
    return person.userUid === user?.uid;
  }

  function runthis() {
    console.log(customerData);
  }
  function sendUserWelcome() {
    const [userEmailAddress, setUserEmailAddress] = useState("");
  }

  if (!user) {
    location.replace("/auth/signin");
    // window.location.origin()
  } else {
    return (
      <>
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <Grid
            templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
            templateRows={{ md: "1fr auto", lg: "1fr" }}
            my="26px"
            gap="24px"
          >
            <WorkWithTheRockets
              title={"Balance Overview"}
              nameValue={"Total USD: "}
              amount={res?.money || "0.00"}
              staked={"Staked: "}
              stakedCrypto={res?.stakedCrypto}
              stakedIcon={<LockIcon color="blue.500" />}
              stakedAmount={res?.staked}
              icon={<CreditIcon color="blue.500" />}
              nftIcon={<TriangleUpIcon color="blue.500" />}
              description={"NFT Holdings: "}
            />
            <BuiltByDevelopers
              name={"Stake and Earn"}
              image={
                <Image
                  src={logoChakra}
                  alt="chakra image"
                  minWidth={{ sm: "350px", md: "300px", lg: "auto" }}
                  // onClick={stakeClicked}
                />
              }
            />
          </Grid>
          <Grid
            templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
            templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
            gap="24px"
            mb={{ lg: "26px" }}
          >
            <SalesOverview
              title={"Trades Overview"}
              percentage={activeUser[0]?.percentage}
              chart={<LineChart />}
            />
            <ActiveUsers
              title={"Active Users"}
              percentage={activeUser[0]?.percentage}
              chart={<BarChart />}
            />
            <div></div>
          </Grid>
          <Authors
            title={"Top 6 Users"}
            captions={["Users", "Function", "Status"]}
            data={top6Data}
          />
          <Projects
            title={"Top 6 NFTs"}
            captions={["NFT", "Price", "", "Completion"]}
            data={topSixNfts}
          />
          <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }}>
            <Transactions
              title={"Transactions History"}
              date={""}
              newestTransactions={res?.userNewTranaction}
              olderTransactions={res?.userOldTransaction}
            />
          </Grid>
        </Flex>
      </>
    );
  }
}

export default Tables;
