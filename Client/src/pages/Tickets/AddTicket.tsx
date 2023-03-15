import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Textarea,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AddTicket() {
  const navigate = useNavigate();
  const token = cookies.get("TOKEN");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted!");
    const res = await axios.post(
      "http://localhost:3000/ticket",
      {
        image: image,
        event: title,
        availableQty: quantity,
        location: location,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res);
    if (res.status == 200) {
      navigate("/tickets");
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <Navbar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Add New Ticket
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="image" isRequired>
                  <FormLabel>Ticket Image Link</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FormControl>
                <HStack>
                  <Box>
                    <FormControl id="title" isRequired>
                      <FormLabel>Event Title</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="quantity" isRequired>
                      <FormLabel>Availabel Quantity </FormLabel>
                      <Input
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="location" isRequired>
                  <FormLabel>Location</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel>Desciption</FormLabel>
                  <Textarea
                    rows={5}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Add Ticket
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
