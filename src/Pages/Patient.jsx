import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getPatientById,
  getPatientByIdAndDelete,
  getPatientByIdAndUpdate,
} from "../Redux/AppReducer/action";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export const Patient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.appReducer.patient);
  const [medicines, setMedicines] = useState(patient.medicines);
  const navigate = useNavigate();

  const handleDelete = (index) => {
    let newArr = medicines.splice(index, 1);
    setMedicines(newArr);
    dispatch(getPatientByIdAndUpdate({ id, data: { medicines } }));
  };

  const handleDeletePatient = () => {
    dispatch(getPatientByIdAndDelete(id));
    navigate("/");
  };
  useEffect(() => {
    dispatch(getPatientById(id));
  }, []);
  useEffect(() => {
    setMedicines(patient.medicines);
  }, [patient]);
  return (
    <Box>
      {patient?.name && (
        <Box>
          <Heading color={"teal"}>{patient?.name.toUpperCase()}</Heading>
          <Text>Age : {patient?.age}</Text>
          <Text>Gender : {patient?.gender}</Text>
          <Box>
            <Button onClick={handleDeletePatient}>Delete Patient</Button>
          </Box>
          <TableContainer w="50em" m="auto" mt="2em">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Medicines</Th>
                  <Th>Quantity</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {patient.medicines.map((el, index) => (
                  <Tr key={index}>
                    <Td>{el.medicine}</Td>
                    <Td>{el.qty}</Td>
                    <Td>
                      <Button
                        colorScheme={"red"}
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};
