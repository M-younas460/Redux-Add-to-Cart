import React from "react";
import { useSelector } from "react-redux";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";

const formatCurrency = (amount) => {
  return `Rs ${amount.toLocaleString()}`;
};

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);

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
        <TextField label="Name" variant="outlined" fullWidth required />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          required
        />
        <TextField
          label="Address"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Buy Now
        </Button>
      </Box>
    </Box>
  );
}

export default Checkout;
