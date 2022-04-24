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
import {
  dashboardTableData,
  newestTransactions,
  olderTransactions,
  tablesTableData,
} from 'variables/general';

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
  alert("this clicked");
}

function Tables() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // getting customer's data from api endpoint

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

  const res = customerData.find(findUser);

  function findUser(person) {
    return person.userUid === user?.uid;
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
              amount={res?.money || "$0.00"}
              staked={"Staked: "}
              stakedCrypto={res?.stakedCrypto}
              stakedIcon={<LockIcon color="blue.500" />}
              stakedAmount={res?.staked || "$0.00"}
              icon={<CreditIcon color="blue.500" />}
              nftIcon={<TriangleUpIcon color="blue.500" />}
              nftAmount={res?.nftAmount || "No NFT hodlings..."}
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
              percentage={3873.45}
              chart={<LineChart />}
            />
            <ActiveUsers
              title={"Active Users"}
              percentage={62}
              chart={<BarChart />}
            />
            <div></div>
          </Grid>
          <Authors
            title={"Top 6 Users"}
            captions={["Users", "Function", "Status"]}
            data={tablesTableData}
          />
          <Projects
            title={"Top 6 NFTs"}
            captions={["NFT", "Price", "", "Completion"]}
            data={dashboardTableData}
          />
          <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }}>
            <Transactions
              title={"Your Transactions"}
              date={"23 - 30 March"}
              newestTransactions={newestTransactions}
              olderTransactions={olderTransactions}
            />
          </Grid>
        </Flex>
      </>
    );
  }
}

export default Tables;
