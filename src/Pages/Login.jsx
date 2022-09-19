import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctor, loginDoctor } from "../Redux/AuthReducer/action";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [doctor, setDoctor] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Taking the input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setDoctor({
      ...doctor,
      [id]: value,
    });
  };

  //getting all doctors
  const doctors = useSelector((state) => state.authReducer.doctors);

  //is user authentication
  function check() {
    return doctors.find((el) => {
      if (el.name == doctor.name) {
        return true;
      }
    });
  }

  //login function
  const handleSubmit = () => {
    if (!(doctor.name && doctor.password)) {
      alert("Enter user name and password");
      return;
    }
    let userVerification = check();
    // console.log(userVerification);
    if (userVerification) {
      let res = dispatch(loginDoctor(doctor)).then((r) => {
        // console.log(r);
        navigate("/");
      });
    } else {
      alert("wrong credentials");
    }
  };

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(getAllDoctor());
    }
  }, []);

  return (
    <Box>
      <Container>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="name" id="name" onChange={handleChange} />
          <FormLabel>Password</FormLabel>
          <Input type="password" id="password" onChange={handleChange} />
        </FormControl>
        <Button colorScheme={"teal"} onClick={handleSubmit} mt="1em">
          Login
        </Button>
      </Container>
    </Box>
  );
};
