import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";

const formatCurrency = (amount) => `Rs ${amount.toLocaleString()}`;

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2}>
        {orders.map((order, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ borderRadius: "12px", p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Customer: {order.customer.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Email: {order.customer.email}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Address: {order.customer.address}
                </Typography>
                <Typography variant="h5">Products</Typography>

                <Box sx={{ mt: 2 }}>
                  {order.products.map((product, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                     
                      <Typography>
                        {product.productName} (x{product.quantity})
                      </Typography>
                      <Typography>{formatCurrency(product.price)}</Typography>
                    </Box>
                  ))}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                  Total:{" "}
                  {formatCurrency(
                    order.products.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
