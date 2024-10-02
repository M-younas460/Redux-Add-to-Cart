import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../cartSlice";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
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

  if (loading) {
    return (
      <img
        src="assets/loader.gif"
        alt=""
        style={{
          display: "block",
          margin: "auto",
          paddingTop: "200px",
          width: "50px",
        }}
      />
    );
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
            
            <Box
              component="img"
              src={product.image} 
              alt={product.name}
              sx={{
                width: "100%",
                maxWidth: "250px",
                height: "auto",
                borderRadius: "5px",
                mb: 2,
              }}
            />

           
            <Typography variant="h5" sx={{ fontWeight: "normal", mb: 1 }}>
              {product.title}
            </Typography>

           
            <Typography variant="h6" sx={{ color: "gray", mb: 2 }}>
              {product.price}
            </Typography>

            
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
