import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
// Custom icons
import {
  CartIcon,
  StatsIcon,
  WalletIcon,
} from 'components/Icons/Icons.js';

// Chakra imports
import {
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import ChartStatistics from '../../Tables/components/ChartStatistics';

const ActiveUsers = ({ title, percentage, chart }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");

  // Setting Active User Section
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    axios
      .get("http://31.220.63.27:8080/api/activeusersection")
      .then((res) => {
        setActiveUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Card p="16px">
      <CardBody>
        <Flex direction="column" w="100%">
          {chart}
          <Flex direction="column" mt="24px" mb="36px" alignSelf="flex-start">
            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
              {title}
            </Text>
            <Text fontSize="md" fontWeight="medium" color="gray.400">
              <Text
                as="span"
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight="bold"
              >
                {percentage > 0 ? `+${percentage}%` : `-${percentage}%`}
              </Text>{" "}
              than last week
            </Text>
          </Flex>
          <SimpleGrid gap={{ sm: "12px" }} columns={3}>
            <ChartStatistics
              title={"Users"}
              amount={activeUser[0]?.users}
              percentage={20}
              icon={<WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />

            <ChartStatistics
              title={"Sales"}
              amount={activeUser[0]?.sales}
              percentage={30}
              icon={<CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Items"}
              amount={activeUser[0]?.items}
              percentage={40}
              icon={<StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
