import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
// Custom Icons
import {
  ProfileIcon,
  SettingsIcon,
} from 'components/Icons/Icons';
// Custom Components
import { ItemContent } from 'components/Menu/ItemContent';
import SidebarResponsive from 'components/Sidebar/SidebarResponsive';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import routes from 'routes.js';

// Chakra Icons
import { BellIcon } from '@chakra-ui/icons';
// Chakra Imports
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    axios
      .get("http://31.220.63.27:8080/api/notification")
      .then((res) => {
        setNotification(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  function logOn() {
    console.log(notification);
  }

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex
      pe={{ sm: "auto", md: "auto" }}
      w={{ sm: "auto", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      marginLeft="10px"
    >
      <NavLink to="/admin/dashboard">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "0px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <ProfileIcon color={navbarIcon} w="20px" h="20px" me="0px" />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <ProfileIcon color={navbarIcon} w="30px" h="30px" me="10px" />
            ) : (
              ""
            )
          }
        ></Button>
      </NavLink>

      <Menu>
        <MenuButton>
          <Flex direction="column" gap={-100}>
            <BellIcon color={navbarIcon} w="25px" h="25px" me="15px" />
          </Flex>
        </MenuButton>
        <MenuList p="16px 8px" overflow="scroll" height="400px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <Flex direction="column">
                {notification?.map((row) => {
                  return (
                    <ItemContent
                      time={row.time}
                      info={row.info}
                      boldInfo={row.boldInfo}
                      boldInfoPrice={row.boldInfoPrice}
                      aSrc={row.aSrc}
                    />
                  );
                })}
              </Flex>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "0px", xl: "0px" }}
        me="16px"
        ref={settingsRef}
        onClick={props.onOpen}
        color={navbarIcon}
        w="25px"
        h="25px"
      />

      <SidebarResponsive routes={routes} />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
