import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPatient,
  getPatients,
  getPatientsByName,
} from "../Redux/AppReducer/action";
import { PatientCard } from "../Components/PatientCard";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("Male");
  const [patient, setPatient] = useState({});
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const urlGender = searchParams.get("gender");

  const [gender, setGender] = useState(urlGender || "");

  const urlSortBy = searchParams.get("_sort");
  const [sortBy, setSortBy] = useState(urlSortBy || "");

  const doctor = useSelector((state) => state.authReducer.doctor);

  const patients = useSelector((state) => state.appReducer.patients);
  // console.log("patients", patients);

  const totalPatients = useSelector((state) => state.appReducer.totalPatients);
  // console.log("total", totalPatients);

  let [medicines, setMedicines] = useState([]);

  //search by name
  const [searchName, setSearchName] = React.useState("");
  const handleSearchName = () => {
    //
    setPage(1);
    dispatch(
      getPatientsByName({ id: doctor.id, name: searchName.toLowerCase() })
    );
    setSearchName("");
  };

  const handleAddMedicine = () => {
    if (!(patient.medicine && patient.qty)) {
      alert("all fields are mandatory");
      return;
    }
    // medicines.push(patient.medicine);
    const payload = { medicine: patient.medicine, qty: patient.qty };
    setMedicines([...medicines, payload]);
    setPatient({
      ...patient,
      medicine: "",
      qty: "",
    });
    // console.log(medicines);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPatient({
      ...patient,
      [id]: value,
    });
  };

  //add a patient
  const handleAddPatient = () => {
    console.log("hello");
    if (
      !(patient.name && patient.age && medicines.length !== 0 && patient.img)
    ) {
      alert("Add details");
      return;
    }
    const payload = {
      doctor: doctor.id,
      name: patient.name.toLowerCase(),
      age: patient.age,
      medicines,
      gender: value,
      img: patient.img || "",
    };
    // console.log(payload);

    dispatch(addPatient(payload));
    //resetting the modal
    setPatient({});
    setMedicines([]);
  };

  useEffect(() => {
    dispatch(getPatients({ id: doctor.id, page }));
  }, []);

  useEffect(() => {
    let Gender = gender;
    // setPage(1);
    if (!gender) {
      Gender = "";
    }
    let getParams;
    if (Gender && sortBy) {
      getParams = {
        gender: Gender,
        _sort: "age",
        _order: sortBy,
      };
    } else if (Gender) {
      getParams = {
        gender: Gender,
      };
    } else if (sortBy) {
      getParams = {
        _sort: "age",
        _order: sortBy,
      };
    } else {
      setSearchParams("");
      // dispatch(getParams);
    }
    setSearchParams(getParams);
    dispatch(getPatients({ id: doctor.id, params: getParams, page }));
  }, [gender, sortBy, page]);
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Box>
          <Button onClick={onOpen} colorScheme="teal">
            Add Patient
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Patient</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="name"
                      id="name"
                      value={patient.name || ""}
                      onChange={handleChange}
                    />
                    <FormLabel>Age</FormLabel>
                    <Input
                      type="number"
                      id="age"
                      value={patient.age || ""}
                      onChange={handleChange}
                    />

                    <FormLabel>Profile Pic</FormLabel>
                    <Input
                      type="name"
                      id="img"
                      value={patient.img || ""}
                      onChange={handleChange}
                    />

                    <FormLabel>Gender</FormLabel>
                    <RadioGroup onChange={setValue} value={value}>
                      <Stack direction="row">
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                        <Radio value="Other">Other</Radio>
                      </Stack>
                    </RadioGroup>
                    <Flex>
                      <Input
                        w="40%"
                        placeholder="Medicine"
                        type="name"
                        id="medicine"
                        value={patient.medicine || ""}
                        onChange={handleChange}
                      />

                      <Input
                        w="40%"
                        placeholder="Quantity"
                        type="number"
                        id="qty"
                        value={patient.qty || ""}
                        onChange={handleChange}
                      />
                      <Button colorScheme={"teal"} onClick={handleAddMedicine}>
                        Add medicine
                      </Button>
                    </Flex>
                  </FormControl>
                </>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="teal" onClick={handleAddPatient}>
                  Add a Patient
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Box>
          <Select
            placeholder="Filter By Gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </Box>
        <Box>
          <Select
            placeholder="Sort By"
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Box>
        <Box>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search Name"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleSearchName}>
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>

      {patients?.length !== 0 && (
        <Box w="98%" m="auto" mt="2em">
          <SimpleGrid columns={3} gap={"2em"}>
            {patients?.map((el) => (
              <PatientCard key={el.id} data={el} />
            ))}
          </SimpleGrid>
          <Flex w="20em" m="auto" justifyContent={"space-between"} mt="2em">
            <Button
              mt="5px"
              colorScheme={"blue"}
              isDisabled={page <= 1}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Pre
            </Button>
            <Text fontSize={"2em"} pt="0">
              {`${page}/${Math.ceil(totalPatients / 3)} Pages`}
            </Text>
            <Button
              mt="5px"
              colorScheme={"blue"}
              isDisabled={page >= totalPatients / 3}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
