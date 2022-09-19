import { Box, Button, Container, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctor, regDoctor } from "../Redux/AuthReducer/action";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [doctor, setDoctor] = useState({});
  const [doctorReg, setDoctorReg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Input taking function
  const handleChange = (e) => {
    const { id, value } = e.target;
    setDoctor({
      ...doctor,
      [id]: value,
    });
  };

  //getting all doctors
  const doctors = useSelector((state) => state.authReducer.doctors);

  //To check user is already registered
  function check() {
    return doctors.find((el) => {
      if (el.name == doctor.name) {
        setDoctorReg(true);
        return true;
      }
    });
  }

  //Signup function
  const handleSubmit = () => {
    //
    if (!(doctor.name && doctor.password)) {
      alert("Enter user name and password");
      return;
    }
    setDoctorReg(false);
    let x = check();
    console.log("x", x);
    if (x) {
      return;
    }
    if (!x) {
      let res = dispatch(regDoctor(doctor)).then((r) => {
        navigate("/login");
      });
    } else {
      alert("user already registered");
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
          Submit
        </Button>
      </Container>
    </Box>
  );
};
