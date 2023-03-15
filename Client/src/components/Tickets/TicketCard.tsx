import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export type Ticket = {
  id: string;
  image: string;
  event: string;
  availableQty: Number;
  location: string;
  description: string;
};
interface Props {
  ticket: Ticket;
  rootProps?: StackProps;
}

export const TicketCard = (props: Props) => {
  const navigate = useNavigate();
  const role = cookies.get("ROLE");
  const email = cookies.get("Email");
  const token = cookies.get("TOKEN");

  const { ticket, rootProps } = props;
  const { id, image, event, availableQty, location, description } = ticket;

  const handleReservation = async (id: string) => {
    if (!token) {
      navigate("/signin");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/reserve",
        {
          ticketId: id,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      if (res.status == 201) {
        Swal.fire(
          "Good job!",
          "You have Successfully reserved this event!",
          "success"
        );
      } else {
        Swal.fire("Error!", "Something went wrong!", "error");
      }
    } catch (err) {
      Swal.fire("Sorry!", "You have Already reserved this ticket!", "error");
    }
  };
  return (
    <Stack spacing={{ base: "4", md: "5" }} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image}
            alt={event}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={{ base: "md", md: "xl" }}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Text color="teal.600" textTransform="uppercase">
          {location}
        </Text>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            {event}
          </Text>
        </Stack>
        <HStack>
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            {description}
          </Text>
        </HStack>
        <HStack>
          <Text
            fontSize="md"
            fontWeight="bold"
            color={useColorModeValue("gray.600", "gray.400")}
            variant="span"
            display="inline-block"
          >
            Qty:
          </Text>
          <Text
            fontSize="md"
            display="inline-block"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            <>{availableQty}</>
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button
          colorScheme="blue"
          width="full"
          onClick={() => handleReservation(id)}
        >
          Book Event
        </Button>
      </Stack>
    </Stack>
  );
};
