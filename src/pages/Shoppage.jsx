import React, { useEffect } from "react";
import { getData } from "../redux/products/action";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";
import Filter from "../components/Filter";
import Product from "../components/Product";
import { Grid, GridItem } from "@chakra-ui/react";

const Shoppage = () => {
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);
  const error = useSelector((state) => state.product.error);
  // console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products?.length === 0) {
      dispatch(getData());
    }
  }, [dispatch, products.length]);

  return (
    <div>
      <Text>Shop All</Text>
      <Filter />
      {loading ? (
        <h1>loading...</h1>
      ) : error ? (
        <h1>something went wrong please refresh..</h1>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {products.length > 0 &&
            products.map((product) => {
              return <Product key={product.id} Product2={product} />;
            })}
        </Grid>
      )}
    </div>
  );
};

export default Shoppage;
