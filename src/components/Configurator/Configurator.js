import React, { useState } from 'react';

import { Separator } from 'components/Separator/Separator';
import { signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import {
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';
import { auth } from 'views/Auth/firebase-config';

// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Configurator(props) {
  const { secondary, isOpen, onClose, fixed, ...rest } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let fixedDisplay = "flex";
  if (props.secondary) {
    fixedDisplay = "none";
  }

  const logout = async () => {
    await signOut(auth);
    location.reload();
  };

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  const settingsRef = React.useRef();
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Settings
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <br />

              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
                <Text fontSize="xl" fontWeight="600" mb="4px">
                  Theme:
                </Text>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </Button>
              </Flex>
              <Box mt="24px">
                <Box w="100%">
                  <Text mb="6px" textAlign="center">
                    Visit our Social Accounts
                  </Text>
                  <Flex justifyContent="center" alignContent="center">
                    <Link
                      isExternal="true"
                      href="https://twitter.com/plutoexchange_"
                    >
                      <Button
                        colorScheme="twitter"
                        leftIcon={<FaTwitter />}
                        me="10px"
                      >
                        <Text>Twitter</Text>
                      </Button>
                    </Link>
                    <Link
                      isExternal="true"
                      href="https://www.instagram.com/plutoexchange_"
                    >
                      <Button
                        colorScheme="facebook"
                        leftIcon={<FaInstagram />}
                        me="10px"
                      >
                        <Text>Instagram</Text>
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Box>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Button
                type="submit"
                size="md"
                height="48px"
                width="50%"
                border="1px"
                borderColor="green.600"
                w="100%"
                h="45"
                mb="24px"
                onClick={logout}
              >
                Logout
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
};
