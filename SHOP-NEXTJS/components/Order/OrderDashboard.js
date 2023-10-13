import { Box, Chip, Grid, Typography } from "@mui/material";
import { Select, Table } from "antd";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { MdDeleteOutline, MdEmail } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import {
  BsCashCoin,
  BsCreditCard,
  BsEye,
  BsPhoneVibrateFill,
} from "react-icons/bs";
import OrderContext from "@/context/OrderContext";
import { NEXT_API } from "@/config";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OrderCard from "./OrderCard";
import { FaRegAddressBook } from "react-icons/fa";
import DataContext from "@/context/DataContext";

function OrderDashboard(props) {
  const { children, value, index, data, option, ...other } = props;

  const { orderManagement, updateOrderManagement } = useContext(OrderContext);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  // hỗ trợ cho việc lọc , searching input
  const [showOrder, setShowOrder] = useState(data);

  console.log("List order are" , JSON.stringify(showOrder));

  const { searchOrderValue, setSearchOrderValue } = useContext(DataContext);

  useEffect(() => {
    if (searchOrderValue) {
      console.log("Da vao day ne  ", JSON.stringify(data));
      setShowOrder(
        data.filter(
          (order) =>
            order.user.username.toLowerCase().includes(searchOrderValue) ||
            order.address.address.toLowerCase().includes(searchOrderValue) ||
            order.orderStatus.toLowerCase().includes(searchOrderValue) ||
            order.id.includes(searchOrderValue)
        )
      );
    } else setShowOrder(data);
  }, [searchOrderValue, data]);

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const handleStatus = async (chosenStatus, orderId) => {
    
    // ver

    const resPut = await fetch(`${API_URL}/admin/order/update_status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: orderId, status: chosenStatus }),
    });

    const putData = await resPut.json();

    
    if (!resPut.ok) {
      toast.error(putData.message);
    } else {
      updateOrderManagement();
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      sortOrder: "ascend",
        sorter: (a, b) => {
          // return a.id - b.id > 0 ? 1 : -1;
          return a.id.localeCompare(b.id)
        },
    },
    {
      title: "User",
      dataIndex: "enabled",
      key: "enabled",
      responsive: ["lg"],
      render: (_, record) => (
        <div className="flex items-center">
          <Image
            alt="avatar_user"
            src={
              record.user.imgURL
                ? record.user.imgURL
                : "https://th.bing.com/th/id/OIP.srdjU7JjdeYDjK46AQVGKwHaHa?pid=ImgDet&w=200&h=200&c=7&dpr=1.3"
            }
            width={50}
            height={50}
          />
          <h2 className="ml-4">{record.user.username}</h2>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["sm"],
      render: (_, record) => (
        <h2 className="ml-4">{`${record.address.address} ${record.address.city} ${record.address.country} `}</h2>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["sm"],
      render: (_, record) => <h2 className="ml-4">{record.orderDate}</h2>,
    },

    {
      title: "Total price",
      dataIndex: "price",
      key: "price",
      responsive: ["sm"],
      render: (_, record) => (
        <h2 className="ml-4">{`$ ${record.total.toFixed(2)}`}</h2>
      ),
    },
    {
      title: "Payment status",
      dataIndex: "payment",
      key: "payment",
      responsive: ["lg"],
      render: (_, record) =>
        record.methodPayment == "PAY_PAL" ? (
          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <span class="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
              Paid
            </span>
          </td>
        ) : (
          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <span class="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
              Wait for pay
            </span>
          </td>
        ),
    },
    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          {option == "all" && (
            <MdDeleteOutline
              className="text-red-400 hover:fill-primary-700 text-xl hover:cursor-pointer"
              // onClick={() => deleteCategory(record.id)}
            />
          )}
          <BsEye
            onClick={() => {
              setOpen(true);
              setSelectedOrder(record);
            }}
            className="hover:cursor-pointer hover:text-primary-900 font-bold ml-6"
          />
        </div>
      ),
    },
  ];

  if (option === "all") {
    const statusColumn = {
      title: "Status",
      dataIndex: "option",
      key: "option",
      responsive: ["sm"],
      render: (_, record) => (
        <Select
          defaultValue={record.orderStatus}
          style={{
            width: 120,
          }}
          onChange={(value) => handleStatus(value, record.id)}
          options={[
            {
              value: "NEW",
              label: "new",
            },
            {
              value: "CONFIRM",
              label: "confirm",
            },
            {
              value: "SHIPPED",
              label: "shipped",
            },
            {
              value: "ON_THE_WAY",
              label: "on the way",
            },
            {
              value: "DELIVERED",
              label: "delivered",
            },
          ]}
        />
      ),
    };

    const insertIndex = 4;

    columns.splice(insertIndex, 0, statusColumn);
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && data.length > 0 && (
        <Box sx={{ p: 3 }}>
          <div className="p-10">
            {showOrder && (
              <Table
                columns={columns}
                dataSource={showOrder}
                pagination={{
                  pageSizeOptions: ["50", "100"],
                  showSizeChanger: true,
                  pageSize: 6,
                }}
                rowKey={(record) => record.id}
              />
            )}
            <div></div>
          </div>
        </Box>
      )}

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
            <DialogContentText className="border border-solid border-gray-100 bg-white p-10">
              <h2 className="font-bold">Ordered items</h2>

              <hr className="border-1 border-gray-200 mt-2 mb-4" />

              {selectedOrder.orderDetails.map((detail) => (
                <OrderCard data={detail} />
              ))}
            </DialogContentText>

            <Box className="mt-4">
              <DialogContentText className="border border-solid border-gray-100 bg-white p-10 mt-4">
                <h2 className="font-bold">Customer details</h2>

                <hr className="border-1 border-gray-200 mt-2 mb-4" />

                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <MdEmail />
                        <span className="ml-4">{selectedOrder.user.email}</span>
                      </div>

                      <div className="flex items-center mt-4">
                        <BsPhoneVibrateFill />
                        <span className="ml-4">
                          {selectedOrder.address.phoneNumber}
                        </span>
                      </div>

                      <div className="flex items-center mt-4">
                        {selectedOrder.methodPayment == "PAY_PAL" ? (
                          <BsCreditCard />
                        ) : (
                          <BsCashCoin />
                        )}
                        <span className="ml-4">
                          {selectedOrder.methodPayment == "PAY_PAL"
                            ? "Credit card"
                            : "Pay in cash"}
                        </span>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div className="flex flex-col">
                      <FaRegAddressBook />
                      <p>{selectedOrder.address.address}</p>
                      <p>{selectedOrder.address.city}</p>
                      <p>{selectedOrder.address.country}</p>
                    </div>
                  </Grid>
                </Grid>
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
export default OrderDashboard;
