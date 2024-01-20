import React from "react";
import { Box, Image, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ Product2 }) => {
  if (!Product2) {
    return <div>Product data not available</div>;
  }

  const { id, name, color, gender, original_price, final_price, images } =
    Product2;
  const [img, setImg] = useState(images[0]);

  const navigate = useNavigate();

  const showOtherImage = () => {
    setImg(images[1]);
  };
  const showOriginalImage = () => {
    setImg(images[0]);
  };

  return (
    <Box
      onMouseEnter={showOtherImage}
      onMouseLeave={showOriginalImage}
      onClick={() => navigate(`/collections/all/${id}`)}
    >
      {images && images.length > 0 && <Image src={img} alt={name + "shoe"} />}
      <Text>{name + " | " + color + " | " + gender}</Text>
      <HStack>
        <Text>{final_price}</Text>
        <Text color="grey" as="s">
          {original_price}
        </Text>
      </HStack>
    </Box>
  );
};

export default Product;
