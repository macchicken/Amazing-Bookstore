import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    Text
} from "@chakra-ui/react"
import { FaShoppingBasket, FaRegCheckCircle, FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";
import { orderService } from "../../services/orderService";

const { useDisclosure } = require("@chakra-ui/hooks");

let message = "Thank you for your payment!";
let headerText = "Checkout complete";
let bgColour = "#2F855A";
let success = true;

function MessageIcon(props) {
    if (props.success) {
        return <FaRegCheckCircle color={props.bgColour} size={"5rem"}/>;
    }
    return <FaBan color={props.bgColour} size={"5rem"}/>;
}

export default function Checkout() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleCheckout() {
        return new Promise(resolve => {
            orderService.addOrder()
            .then(result => {
                console.log(JSON.stringify(result));
                bgColour = "#2F855A";
                headerText = "Checkout complete";
                message = "Thank you for your payment!";
                success = true;
                onOpen();
            }, e => {
                bgColour = "#ff0000";
                headerText = "Checkout error";
                message = e.errors[0].message;
                success = false;
                onOpen();
            });
            resolve();
        });
    }

    return (
        <>
            <Button
                onClick={handleCheckout}
                color={"white"}
                bg={"#2F855A"}
                _hover={{
                    bg: "#48BB78"
                }}
            >
                <FaShoppingBasket />&nbsp;&nbsp;Continue Checkout
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        bg={bgColour}
                        color={"white"}
                        align={"center"}
                    >
                        <b>{headerText}</b>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack padding={"20px"} align={"center"}>
                            <MessageIcon success={success} bgColour={bgColour}/>
                            <Text fontSize="xl">{"\n"}{message}</Text>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Stack width={"100%"}>
                            <Link to={'/user'}>
                            <Button
                                width={"100%"}
                                color={"white"}
                                bg={bgColour}
                                _hover={{
                                    bg: "#48BB78"
                                }}
                                mr={3}
                                onClick={onClose}
                            >
                                View order
                            </Button>
                            </Link>
                            <Link to={'/search'}>
                            <Button
                                width={"100%"}
                                mr={3}
                                color={"gray"}
                                variant="link"
                            >
                                Back to homepage
                            </Button>
                            </Link>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}