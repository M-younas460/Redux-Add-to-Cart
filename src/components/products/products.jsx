import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../cartSlice";
const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "iPhone 16",
      price: "Rs 201,400",
      image: "/assets/i phone.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      price: "Rs 150,000",
      image: "/assets/sumsung.jpg",
    },
    {
      id: 3,
      name: "Google Pixel 7",
      price: "Rs 120,500",
      image: "/assets/google pixel.jpg",
    },
  ];
  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Arrange items in a row
          justifyContent: "space-between", // Space items evenly
          flexWrap: "wrap", // Wrap items if screen size is small
          mt: 2,
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              maxWidth: "250px",
              width: "100%", // Ensures responsive width
            }}
          >
            {/* Product Image */}
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: "100%", // Full width inside the container
                maxWidth: "250px", // Limit the max width
                height: "auto", // Maintain aspect ratio
                borderRadius: "5px",
                mb: 2,
              }}
            />

            {/* Product Name */}
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              {product.name}
            </Typography>

            {/* Product Price */}
            <Typography variant="h6" sx={{ color: "gray", mb: 2 }}>
              {product.price}
            </Typography>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
              onClick={() => handleAddToCart(product)}
              disabled={isProductInCart(product.id)}
            >
              {isProductInCart(product.id) ? "Added to Cart" : "Add to Cart"}
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Products;
