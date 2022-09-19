import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "../Components/PrivateRoutes";
import { Home } from "./Home";
import { Patient } from "./Patient";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Navbar } from "../Components/Navbar";

export const AllRoutes = () => {
  return (
    <Box>
      <Navbar />
      <Box w="88%" m="auto" bg="rgb(192,197,206)">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PrivateRoutes>
                <Patient />
              </PrivateRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Box>
    </Box>
  );
};
