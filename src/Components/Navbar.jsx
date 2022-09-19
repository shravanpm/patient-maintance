import React from "react";
import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutDoctor } from "../Redux/AuthReducer/action";

export const Navbar = () => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const doctor = useSelector((state) => state.authReducer.doctor);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutDoctor());
  };
  return (
    <Flex
      justifyContent={"space-between"}
      boxShadow="outline"
      p="6"
      rounded="md"
      bg="rgb(192,197,206)"
      w="90%"
      m="auto"
      mb="2em"
    >
      <Flex w="50%">
        <Link to="/">
          <Heading>{doctor.name || "Doctor"}</Heading>
        </Link>
      </Flex>
      <Flex w="30%" justifyContent={"space-between"}>
        <Box>
          <Link to="/signup">
            <Button colorScheme={"blue"}>Signup</Button>
          </Link>
        </Box>
        <Box>
          <Link to="/login">
            <Button colorScheme={"blue"}>Login</Button>
          </Link>
        </Box>
        {isAuth && (
          <Box>
            <Button colorScheme={"blue"} onClick={logout}>
              Logout
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
