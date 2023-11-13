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
  Rating,
} from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsEye } from "react-icons/bs";
import OrderAddressCard from "../AddressCard/OrderAddressCard";
import OrderTracker from "./OrderTracker";
import { deepPurple } from "@mui/material/colors";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { API_URL, NEXT_API } from "@/config";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Textarea } from "@mui/joy";
import { useSession } from "next-auth/react";
import { CloseCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function UserOrderCard(props) {
  const { children, data } = props;

  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { confirm } = Modal;

  const { data: session } = useSession();
  const token = session?.accessToken;

  const MySwal = withReactContent(Swal);

  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");

  const [selectedDetail, setSelectedDetail] = useState({
    orderId: null,
    productId: null,
    selectedIndex: null,
  });

  const [reviewContent, setReviewContent] = useState("");

  const [rating, setRating] = useState(1);

  const steps = {
    NEW: "1",
    CONFIRM: "2",
    SHIPPED: "3",
    ON_THE_WAY: "4",
    DELIVERED: "5",
  };

  const onChange = (e) => {
    setReviewContent(e.target.value);
  };

  const cancelOrder = (orderId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order ?" + orderId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder()
          .then((result) => {
            if (result.ok) {
                MySwal.fire("Success!", "Order has been canceled ", "success");
            } else {
                MySwal.fire("Failure!", result.message, "error");
            } 
          })
          .catch((err) => {
            console.log("error is " + err);
          });
      }
    });

    // handle cancel order fetch
    const cancelOrder = async () => {
      const res = await fetch(`${API_URL}/orders/cancel-order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        return response.json();
      });

      return res;
    };
  };

  // post review

  const submitReview = async () => {
    if (reviewContent == "") {
      toast.error("Write your review first");
      return;
    }

    const postReview = {
      comment: reviewContent,
      rating: rating,
      productId: selectedDetail.productId,
      orderCode: selectedDetail.orderId,
    };
    // ver
    const resGet = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postReview),
    });

    const dataGet = await resGet.json();
    if (!resGet.ok) {
      toast.error(dataGet.message);
    } else {
      toast.success("Review successful !");
      router.push(`/product/detail/${selectedDetail.productId}`);
    }
  };

  return (
    <div className="shadow-sm p-2 hover:shadow-sm shadow-black mt-8">
      <Grid container spacing={2} className="flex items-center">
        <Grid item xs={6}>
          <div className="flex items-center">
            {data.orderDetails.map((product) => (
              <div className="h-[2rem] w-[2rem]">
                <Image
                  // className=" cursor-pointer rounded-full"
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

        <Grid item xs={2} className="flex items-center justify-center">
          <BsEye
            onClick={() => {
              setOpen(true);
              setSelectedOrder(data);
            }}
            title="view detail"
            className="hover:cursor-pointer hover:text-blue-600 font-bold ml-6"
          />

          <CloseCircleOutlined
            className="hover:cursor-pointer hover:text-red-600 font-bold ml-6"
            onClick={() => cancelOrder(data.id)}
            title="Cancel order"
          />
        </Grid>
      </Grid>
      {open && selectedOrder && (
        <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open}>
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
                    </Grid>
                  </div>
                  <Grid container>
                    {selectedOrder.orderDetails.map((detail, index) => (
                      <Grid
                        item
                        container
                        className="shadow-sm border p-4 mb-4 hover:shadow-md hover:shadow-gray-400"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item xs={6} className="flex">
                          <div className="h-[2rem] w-[2rem] hover:cursor-pointer">
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
                          <Box
                            sx={{ color: deepPurple[500] }}
                            className="hover:cursor-pointer"
                            onClick={() =>
                              setSelectedDetail({
                                orderId: selectedOrder.id,
                                productId: detail.product.id,
                                selectedIndex: index,
                              })
                            }
                          >
                            <StarOutlineIcon
                              sx={{ fontSize: "2rem" }}
                              className="px-2 text-xl h-[2rem] w-[2rem]"
                            />
                            <span className="hover:text-blue-600">
                              Rate & Review Product
                            </span>
                          </Box>
                        </Grid>

                        {/* start review part */}
                        {selectedDetail.selectedIndex != null &&
                        selectedDetail.selectedIndex == index ? (
                          <Grid item xs={7} className="mt-10">
                            <div className="w-1/2">
                              <h2 className="font-bold mb-2">
                                Write your review{" "}
                              </h2>
                              <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                  setRating(newValue);
                                }}
                              />
                              <Textarea
                                maxLength={100}
                                style={{
                                  height: 120,
                                  resize: "none",
                                }}
                                onChange={onChange}
                                placeholder="write some your feelings about this product"
                              />
                              <button
                                className="px-4 py-1.5 bg-primary-600 text-white hover:bg-primary-800 text-semibold rounded-md mt-4"
                                onClick={submitReview}
                              >
                                {" "}
                                Review{" "}
                              </button>
                            </div>
                          </Grid>
                        ) : (
                          ""
                        )}

                        {/* end review part */}
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
