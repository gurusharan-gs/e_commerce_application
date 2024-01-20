import React from "react";
import { Flex, Spacer, Image, Text, Icon, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { BsBasket3 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "../redux/cart/action";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const categories = [
    { label: "SHOP", link: "/collections/all" },
    { label: "WOMEN", link: "/collections/women" },
    { label: "MEN", link: "/collections/men" },
    { label: "NEW ARRIVALS", link: "/collections/new-arrivals" },
    { label: "ABOUT", link: "/about" },
    { label: "HELP", link: "/help" },
  ];

  const dispatch = useDispatch();

  const handleDecrease = (id, size, qty) => {
    if (qty > 1) {
      dispatch(decreaseQty({ id, size }));
    } else {
      dispatch(removeFromCart({ id, size }));
    }
  };

  const handleIncrease = (id, size) => {
    dispatch(increaseQty({ id, size }));
  };

  // const convertToNumber = (str) => {
  //   if (typeof str === "string") {
  //     if (Number(str)) {
  //       return Number(str);
  //     }
  //     let arr = str.includes(",") ? str.split(",") : [];
  //     let final_str = arr.reduce((a, c) => a + c, "");
  //     let result = Number(final_str);
  //     return result;
  //   } else {
  //     return Number(str);
  //   }
  // };

  // const convertToNumber = (value) => {
  //   if (typeof value === "number") {
  //     return value;
  //   }

  //   if (typeof value === "string") {
  //     const numericValue = parseFloat(value.replace(/,/g, ""));
  //     return isNaN(numericValue) ? 0 : numericValue;
  //   }

  //   if (Array.isArray(value)) {
  //     return value.reduce((acc, cur) => acc + convertToNumber(cur), 0);
  //   }

  //   return 0;
  // };

  const convertToNumber = (str) => {
    if (typeof str === "number") {
      return str;
    }

    if (typeof str === "string") {
      const cleanedStr = str.replace(/[^0-9.-]+/g, ""); // Remove non-numeric characters
      const result = parseFloat(cleanedStr);
      return isNaN(result) ? 0 : result;
    }

    return 0;
  };

  let total_original_price = 0;
  let total_final_price = 0;

  // cart.forEach((prod) => {
  //   total_original_price += convertToNumber(prod.original_price * prod.qty);
  // });

  cart.forEach((prod) => {
    const originalPrice = convertToNumber(prod.original_price);
    const totalPrice = originalPrice * prod.qty;
    total_original_price += totalPrice;
    total_final_price += convertToNumber(prod.final_price) * prod.qty;
  });

  return (
    <Flex
      bg="white"
      borderBottom="0.25px solid #b1b3b5"
      p="1px"
      align="center"
      w="1280px"
      mx="auto"
    >
      <Link to="/">
        <Image
          src="https://www.flatheads.in/cdn/shop/files/Logo_Horizontal.png?v=1698929502&width=170"
          alt="flat head logo"
          height="25px"
          m={5}
        />
      </Link>

      <Spacer />

      {/* Generate dynamic links */}
      {categories.map((category) => (
        <Link key={category.label} to={category.link}>
          <Text px={4} py={2} fontSize="xl">
            {category.label}
          </Text>
        </Link>
      ))}

      <Spacer />

      <Icon boxSize="20px" mx={6} as={FiSearch} alt="Search Icon" />
      <Icon boxSize="20px" mx={6} as={AiOutlineUser} alt="User Icon" />

      <Flex onClick={onOpen} ref={btnRef} align="center">
        <Icon boxSize="20px" mx={6} as={BsBasket3} alt="Basket Icon" />
        <Text>{cart ? cart.length : 0}</Text>
      </Flex>

      <Spacer />
      <Flex>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Cart ( {cart.length} )</DrawerHeader>

            <DrawerBody>
              {cart.length > 0 &&
                cart.map((item) => {
                  return (
                    <Flex>
                      <Image
                        boxSize="75px"
                        src={item.images[0]}
                        alt={item.name}
                      />

                      <Box>
                        <Text casing="lowercase">{`${item.name} | ${item.color} | ${item.gender}`}</Text>
                        <Text as="sup">{item.size}</Text>

                        <Flex align="center">
                          <Button
                            disabled={item.qty === 0}
                            onClick={() =>
                              handleDecrease(item.id, item.size, item.qty)
                            }
                          >
                            -
                          </Button>
                          <Text>{item.qty}</Text>
                          <Button
                            onClick={() => handleIncrease(item.id, item.size)}
                          >
                            +
                          </Button>
                        </Flex>
                        <Flex justify="space-between">
                          <Text as="s">Rs. {item.original_price}</Text>
                          <Text>Rs. {item.final_price}</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  );
                })}
            </DrawerBody>

            <Flex justify="space-between" align="center" m={6}>
              <Text>SUBTOTAL</Text>
              <Flex>
                <Text p={2} as="s">
                  Rs. {total_original_price}
                </Text>
                <Text p={2}>Rs. {total_final_price}</Text>
              </Flex>
            </Flex>

            <DrawerFooter>
              <Button colorScheme="yellow">PROCEED TO CHECKOUT</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
};

export default Navbar;
