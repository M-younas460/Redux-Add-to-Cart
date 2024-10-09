import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import axios from "axios"; 

const formatCurrency = (amount) => {
  return `$ ${amount.toLocaleString()}`;
};

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  
  
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      const order = {
        products: cartItems.map((item) => ({
          productName: item.title,
          price: item.price,
          quantity: item.quantity, 
        })),
        customer,
      };

     
      const response = await axios.post("http://localhost:5000/api/checkout", order);
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to place order", error);
      alert("Failed to place order");
    }
  };

  const grandTotal = cartItems.reduce((total, item) => {
    const itemPrice =
      typeof item.price === "string"
        ? parseInt(item.price.replace(/Rs\s?|,/g, ""))
        : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Checkout Form
      </Typography>

      <Box>
        <Typography variant="h6">Order Summary</Typography>
        {cartItems.map((item) => {
          const itemPrice =
            typeof item.price === "string"
              ? parseInt(item.price.replace(/Rs\s?|,/g, ""))
              : item.price;
          const totalPrice = itemPrice * item.quantity;

          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: "contain",
                  borderRadius: "5px",
                  mr: 2,
                }}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography>
                  {item.title} (x{item.quantity})
                </Typography>
              </Box>

              <Typography>{formatCurrency(totalPrice)}</Typography>
            </Box>
          );
        })}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Grand Total: {formatCurrency(grandTotal)}
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          required
          value={customer.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          fullWidth
          required
          value={customer.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Address"
          name="address"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          required
          value={customer.address}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleCheckout}
        >
          Buy Now
        </Button>
      </Box> 
    </Box>
  );
}

export default Checkout;
