import React, { useEffect, useState } from "react";
import { getCurrentProductData } from "../redux/products/action";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  HStack,
  Button,
} from "@chakra-ui/react";
import Filter from "../components/Filter";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cart/action";

const ProductDetails = () => {
  const loading = useSelector((state) => state.product.loading);
  const currentProduct = useSelector((state) => state.product.currentProduct);
  const error = useSelector((state) => state.product.error);
  const [size, setSize] = useState(null);

  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getCurrentProductData(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <h1>loading..</h1>;
  }

  if (error) {
    return <h1>something went wrong...</h1>;
  }

  if (Object.keys(currentProduct).length === 0) {
    return <h1>Product {id} not found</h1>;
  }

  const handleCart = () => {
    let payload = {
      ...currentProduct,
      size,
    };

    // console.log(payload);
    dispatch(addToCart(payload));
  };

  return (
    <Flex justify="center" align="center">
      <Product Product2={currentProduct} />
      <Box>
        <Text>Chose Size</Text>
        <HStack>
          {currentProduct?.sizes.map((size) => {
            return (
              <Button key={size} onClick={() => setSize(size)}>
                {size}
              </Button>
            );
          })}
        </HStack>
        <Button bg="yellow" m={6} p={6} disabled={!size} onClick={handleCart}>
          {!size ? "Please Select a Size" : "Add to Cart"}
        </Button>
      </Box>
    </Flex>
  );
};

export default ProductDetails;
