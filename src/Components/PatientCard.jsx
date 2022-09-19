import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PatientCard = ({ data }) => {
  const navigate = useNavigate();
  const handleMoreInfo = () => {
    navigate(`/patients/${data.id}`);
  };
  return (
    <Box w={"20em"} boxShadow="inner" p="6" rounded="md" bg="white">
      <Box>
        <Image
          w={"15em"}
          h="15em"
          m="auto"
          src={
            data.img ||
            "https://tse4.mm.bing.net/th?id=OIP.Z5BlhFYs_ga1fZnBWkcKjQHaHz&pid=Api&P=0"
          }
        />
      </Box>
      <Box>
        <Text fontWeight={"bold"} mt="1em">
          {data.name.toUpperCase()}
        </Text>
      </Box>
      <Flex justifyContent={"space-between"} w="15em" m="auto">
        <Text fontWeight={"bold"} mt="1em">
          No.Of Medicines
        </Text>
        <Text fontWeight={"bold"} mt="1em">
          {data.medicines.length}
        </Text>
      </Flex>
      <Flex justifyContent={"space-between"} w="15em" m="auto">
        <Text fontWeight={"bold"} mt="1em">
          Age :
        </Text>
        <Text fontWeight={"bold"} mt="1em">
          {data.age}
        </Text>
      </Flex>
      <Flex justifyContent={"space-between"} w="10em" m="auto" mt="2em">
        <Button onClick={handleMoreInfo} colorScheme="teal">
          See More Info
        </Button>
      </Flex>
    </Box>
  );
};
