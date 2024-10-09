import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementItem,
  decrementItem,
  removeItemFromCart,
} from "../../cartSlice";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const formatCurrency = (amount) => {
    return `$ ${amount.toLocaleString()}`;
  };

  const grandTotal = cartItems.reduce((total, item) => {
    const itemPrice =
      typeof item.price === "string"
        ? parseInt(item.price.replace(/$\s?|,/g, ""))
        : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <img
        src="assets/empty.svg"
        alt=""
        style={{ width: "50%", marginLeft: "327px", marginTop: "35px" }}
      />
    );
  }

  const handleCartClick = () => {
    navigate("/checkout");
  };

  return (
    <Box sx={{ padding: 2 }}>
      {cartItems.map((item) => {
        const itemPrice =
          typeof item.price === "string"
            ? parseInt(item.price.replace(/$\s?|,/g, ""))
            : item.price;
        const totalPrice = itemPrice * item.quantity;

        return (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              borderBottom: "1px solid #ccc",
              paddingBottom: 2,
            }}
          >
            <Box sx={{ width: "80px", marginRight: 2 }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "5px",
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item.title}
              </Typography>
              <Box display={"flex"}>
                <Typography
                  variant="body1"
                  sx={{ color: "gray", display: "flex" }}
                >
                  {formatCurrency(itemPrice)}
                  <Typography sx={{ mx: 2 }}> X {item.quantity}</Typography>
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: "gray" }}>
                Total: {formatCurrency(totalPrice)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => dispatch(decrementItem(item.id))}>
                <Remove />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
              <IconButton onClick={() => dispatch(incrementItem(item.id))}>
                <Add />
              </IconButton>
            </Box>

            <IconButton
              sx={{ marginLeft: 2 }}
              onClick={() => dispatch(removeItemFromCart(item.id))}
            >
              <Delete />
            </IconButton>
          </Box>
        );
      })}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Grand Total: {formatCurrency(grandTotal)}
        </Typography>
        <Button variant="contained" onClick={handleCartClick}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
