import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../cartSlice";
import axios from "axios"; // or use fetch if you prefer

const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mt: 2,
        }}
      >
        {products.map((product) => (
          <Box
            key={product._id}
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
              width: "100%",
            }}
          >
            {/* Product Image */}
            <Box
              component="img"
              src={product.image} // Ensure image URL is correct
              alt={product.name}
              sx={{
                width: "100%",
                maxWidth: "250px",
                height: "auto",
                borderRadius: "5px",
                mb: 2,
              }}
            />

            {/* Product Name */}
            <Typography variant="h5" sx={{ fontWeight: "normal", mb: 1 }}>
              {product.title}
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
              disabled={isProductInCart(product._id)}
            >
              {isProductInCart(product._id) ? "Added to Cart" : "Add to Cart"}
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Products;
