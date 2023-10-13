import React, { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsEye } from "react-icons/bs";
import OrderAddressCard from "../AddressCard/OrderAddressCard";
import OrderTracker from "./OrderTracker";
import { deepPurple } from "@mui/material/colors";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { NEXT_API } from "@/config";
import { toast } from "react-toastify";
import { Modal } from "antd";
function UserOrderCard(props) {
  const { children, data } = props;

  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);

  
  const { confirm } = Modal;


  console.log("Data order detail is ", JSON.stringify(data));

  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");

  const steps = {
    NEW: "1",
    CONFIRM: "2",
    SHIPPED: "3",
    ON_THE_WAY: "4",
    DELIVERED: "5",
  };

  const cancelOrder = async () => {
    const resPut = await fetch(
      `${NEXT_API}/api/user/order?action=cancel_order`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: data.id }),
      }
    );

    const putData = await resPut.json();

    if (!resPut.ok) {
      toast.error(putData.message);
    } else {
      toast.success("Cancel successfully !");
    }
  };

  
  const showDeleteConfirm = (productId) => {
    confirm({
      title: 'Are you sure delete this cart item?',
      icon: <ExclamationCircleFilled />,
      content: 'Delete this cart item',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // const deleteCartItem = async () => {
        //   const resDel = await fetch(
        //     `${NEXT_API}/api/cart/${productId}`,
        //     {
        //       method: "DELETE",
        //     }
        //   );

        //   const delData = await resDel.json();

        //   if (!resDel.ok) {
        //     toast.error(delData.message);
        //   } else {
        //     getCart();
        //     toast.success("Xoá thành công");
        //   }
        // };

        // deleteCartItem();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  return (
    <div className="shadow-sm p-2 hover:shadow-sm hover:cursor-pointer shadow-black mt-8">
      <Grid container spacing={2} className="flex items-center">
        <Grid item xs={6}>
          <div className="flex items-center">
            {data.orderDetails.map((product) => (
              <div className="h-[5rem] w-[5rem]">
                <Image
                  className=" cursor-pointer rounded-full"
                  src={product.product.primaryImage}
                  width={150}
                  height={150}
                  alt="ordered_product_image"
                />
              </div>
            ))}
          </div>
        </Grid>

        <Grid item xs={2}>
          <p className="text-black font-semibold ">$ {data.total.toFixed(2)}</p>
        </Grid>

        <Grid item xs={2}>
          {true && (
            <div className="">
              <AdjustIcon className="text-green-600 mr-2 text-sm" />
              <span className=" font-semibold">
                Ordered on {data.orderDate}
              </span>
              <p className="font-extralight">
                Your item has been on the waiting line
              </p>
            </div>
          )}
        </Grid>

        <Grid item xs={2}>
          <BsEye
            onClick={() => {
              setOpen(true);
              setSelectedOrder(data);
            }}
            className="hover:cursor-pointer hover:text-primary-900 font-bold ml-6"
          />
        </Grid>
      </Grid>
      {open && selectedOrder && (
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          // onClose={() => setOpen(false)}
        >
          <DialogTitle>
            Order
            <span className="text-primary-600 ml-4">#{selectedOrder.id}</span>
            <p className="text-sm opacity-70">{selectedOrder.orderDate}</p>
          </DialogTitle>

          <DialogContent>
            <Box className="mt-4">
              <DialogContentText className="border border-solid border-gray-100 bg-white p-10 mt-4">
                <h2 className="font-bold">Customer details</h2>

                <div className="p-8">
                  <div>
                    <h1 className="font-semibold text-xl">Delivery address</h1>
                    <OrderAddressCard data={selectedOrder.address} />
                  </div>

                  <div className="py-20">
                    <h2 className="mb-8">
                      <span className="font-semibold opacity-70">
                        Payment status{" "}
                      </span>{" "}
                      {selectedOrder.methodPayment == "PAY_PAL" ? (
                        <span className="text-primary-400">Paid</span>
                      ) : (
                        "Wait for paid"
                      )}
                    </h2>
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        <OrderTracker
                          activeStep={[steps[selectedOrder.orderStatus]]}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <button
                          className="bg-primary-400 text-white px-3 py-2 rounded-sm hover:bg-primary-600 ml-4"
                          onClick={cancelOrder}
                        >
                          Cancel order
                        </button>
                      </Grid>
                    </Grid>
                  </div>
                  <Grid container>
                    {selectedOrder.orderDetails.map((detail) => (
                      <Grid
                        item
                        container
                        className="shadow-sm border p-4 mb-4 hover:shadow-md hover:shadow-gray-400"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item xs={6} className="flex">
                          <div className="h-[5rem] w-[5rem] hover:cursor-pointer">
                            <img src={detail.product.primaryImage} alt="" />
                          </div>

                          <div className="space-y-2 ml-5">
                            <p
                              className="hover:cursor-pointer font-semibold"
                              onClick={() =>
                                router.push(
                                  `/product/detail/${detail.product.id}`
                                )
                              }
                            >
                              {detail.product.name.toUpperCase()}
                            </p>
                           
                          </div>
                        </Grid>
                        <Grid item>
                          <Box sx={{ color: deepPurple[500] }} className="hover:cursor-pointer" onClick={() => router.push(
                                  `/product/detail/${detail.product.id}`
                                )}>
                            <StarOutlineIcon
                              sx={{ fontSize: "2rem" }}
                              className="px-2 text-xl h-[2rem] w-[2rem]"
                            />
                            <span>Rate & Review Product</span>
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </DialogContentText>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default UserOrderCard;
