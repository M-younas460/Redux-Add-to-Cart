import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementItem,
  decrementItem,
  removeItemFromCart,
} from "../../cartSlice";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const grandTotal = cartItems.reduce((total, item) => {
    const itemPrice = parseInt(item.price.replace(/Rs\s?|,/g, ""));
    return total + itemPrice * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return <Typography variant="h6">Your cart is empty</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      {cartItems.map((item) => {
        const itemPrice = parseInt(item.price.replace(/Rs\s?|,/g, ""));
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
                alt={item.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "5px",
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item.name}
              </Typography>
              <Box display={"flex"}>
                <Typography
                  variant="body1"
                  sx={{ color: "gray", display: "flex" }}
                >
                  Price: Rs {itemPrice.toLocaleString()}
                  <Typography sx={{ mx: 2 }}> X {item.quantity}</Typography>
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: "gray" }}>
                Total: Rs {totalPrice.toLocaleString()}
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

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Grand Total: Rs {grandTotal.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Cart;
