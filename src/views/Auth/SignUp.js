import React, { useState } from 'react';

// Assets
import BgSignUp from 'assets/img/BgSignUp.png';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { auth } from './firebase-config';

function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const { isOpen, onOpen, onClose } = useDisclosure();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      let catchError = error.message;
      let emailAlreadyInUse = catchError.includes("email-already-in-use");
      let invalidEmail = catchError.includes("invalid-email");
      let weakPassword = catchError.includes("auth/weak-password");

      if (emailAlreadyInUse) {
        alert("Email Already Registered");
      }
      if (invalidEmail) {
        alert("Provide a Valid Email Address");
      }
      if (weakPassword) {
        alert("Password field should be more than 6 Characters");
      }
    }
  };
  function checkUser() {
    if (user?.email) {
      location.replace("/admin/dashboard");
    } else {
      console.log(user);
    }
  }
  checkUser();

  // const signWithGoogle = getAuth();
  function signGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        //
      });
  }

  function redirect() {
    location.replace("/auth/signin");
  }

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
  return (
    <>
      <Flex
        direction="column"
        alignSelf="center"
        justifySelf="center"
        overflow="hidden"
      >
        <Box
          position="absolute"
          minH={{ base: "70vh", md: "50vh" }}
          w={{ md: "calc(100vw - 50px)" }}
          borderRadius={{ md: "15px" }}
          left="0"
          right="0"
          bgRepeat="no-repeat"
          overflow="hidden"
          zIndex="-1"
          top="0"
          bgImage={BgSignUp}
          bgSize="cover"
          mx={{ md: "auto" }}
          mt={{ md: "14px" }}
        ></Box>
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          align="center"
          mt="6.5rem"
          mb="30px"
        >
          <Text fontSize="4xl" color="white" fontWeight="bold">
            Welcome to Pluto Exchange
          </Text>
          <Text
            fontSize="l"
            color="white"
            fontWeight="normal"
            mt="10px"
            mb="26px"
            w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
          >
            THE FUTURE OF DECENTRALIZED FINANCE
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
          <Flex
            direction="column"
            w="500px"
            background="transparent"
            borderRadius="15px"
            p="50px"
            mx={{ base: "100px" }}
            bg={bgColor}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Register With
            </Text>
            <HStack spacing="15px" justify="center" mb="22px">
              <Flex
                justify="center"
                align="center"
                w="75px"
                h="75px"
                borderRadius="15px"
                transition="all .25s ease"
              ></Flex>
              <Flex
                justify="center"
                align="center"
                w="75px"
                h="75px"
                borderRadius="15px"
                border="1px solid lightgray"
                cursor="pointer"
                transition="all .25s ease"
                _hover={{ filter: "brightness(120%)", bg: bgIcons }}
              >
                <Link href="#">
                  <Icon
                    as={FaGoogle}
                    w="30px"
                    h="30px"
                    onClick={signGoogle}
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Link>
              </Flex>
              <Flex
                justify="center"
                align="center"
                w="75px"
                h="75px"
                borderRadius="15px"
                transition="all .25s ease"
              ></Flex>
            </HStack>
            <Text
              fontSize="lg"
              color="gray.400"
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              or
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Full Name
              </FormLabel>
              <Input
                // fontSize='sm'
                ms="4px"
                borderRadius="15px"
                type="text"
                required
                placeholder="Your full name"
                mb="24px"
                size="lg"
                onChange={(e) => {
                  setRegisterName(e.target.value);
                }}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                // fontSize='sm'
                ms="4px"
                borderRadius="15px"
                type="email"
                placeholder="Your email address"
                mb="24px"
                size="lg"
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                // fontSize='sm'
                ms="4px"
                borderRadius="15px"
                type="password"
                placeholder="Your password"
                mb="24px"
                size="lg"
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
              />
              <Text>
                <div>Password Requirements:</div>
                <div> at least 8 characters</div>
              </Text>
              <br />
              <FormControl display="flex" alignItems="center" mb="24px">
                <Switch id="remember-login" colorScheme="teal" me="10px" />
                <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                type="submit"
                bg="teal.300"
                fontSize="10px"
                color="white"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                onClick={register}
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                SIGN UP
              </Button>
              <div id="errorDiv"></div>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Already have an account?
                <Link
                  color={titleColor}
                  as="span"
                  ms="5px"
                  href="#"
                  onClick={redirect}
                  fontWeight="bold"
                >
                  Sign In
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default SignUp;
