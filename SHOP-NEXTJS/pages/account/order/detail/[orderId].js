// import OrderTracker from "@/components/Order/OrderTracker";
// import CustomerLayout from "@/layouts/CustomerLayout";
import React from "react";
import { API_URL, NEXT_API } from "@/config";
// import OrderAddressCard from "@/components/AddressCard/OrderAddressCard";
// import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CustomerLayout from "@/layouts/CustomerLayout";

function OrderDetails({ orders }) {
  const router = useRouter();
  console.log("Order detail is ", JSON.stringify(orders));

  const cancelOrder = async () => {
    //ver
    const resPut = await fetch(`${API_URL}/orders/cancel_order/${orders.orderId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const putData = await resPut.json();

    if (!resPut.ok) {
      toast.error(putData.message);
    } else {
      toast.success("Successfull");
    }

  };

  const steps = {
    NEW: "1",
    CONFIRM: "2",
    SHIPPED: "3",
    ON_THE_WAY: "4",
    DELIVERED: "5",
  };

  return (
    <div>Hello</div>
  );
}
export async function getServerSideProps(context) {
  const { params, req } = context;
  const { orderId } = params;

  // Fetch product details using productId and the user's authentication token
  const token = req.cookies.token;
  console.log("Cookie trong order detail ", token);
  const response = await fetch(`${API_URL}/orders/detail/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });n

  const orders = await response.json();

  console.log("Order detail in get server ", JSON.strigify(orders));

  return {
    props: {
      orders: orders, // Pass the orders data to the component via props
    },
  };
}

OrderDetails.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default OrderDetails;
