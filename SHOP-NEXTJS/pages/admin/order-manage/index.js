import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SpinTip from "@/components/loading/SpinTip";
import OrderDashboard from "@/components/Order/OrderDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import OrderContext from "@/context/OrderContext";
import DataContext from "@/context/DataContext";
import { Breadcrumb, Input } from "antd";
import { useSession } from "next-auth/react";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Orders() {
  const [value, setValue] = React.useState(0);

  const { searchOrderValue, setSearchOrderValue } =
    React.useContext(DataContext);

  const { Search } = Input;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const { data: session } = useSession();
  const token = session?.accessToken;


  useEffect(() => {

    if(session?.role == "CUSTOMER") {
      router.push("/unauthorized")
    }
  } , [session]);




  const { orderManagement, updateOrderManagement } =
    React.useContext(OrderContext);

  React.useEffect(() => {
    updateOrderManagement();
  }, []); // tạo ra hàm cập nhật giá trị cho state riêng

  const setUpData = (option) => {
    switch (option) {
      case "all":
        return orderManagement;
      case "NEW":
        return orderManagement.filter((order) => order.orderStatus == "NEW");

      case "CONFIRM":
        return orderManagement.filter(
          (order) => order.orderStatus == "CONFIRM"
        );

      case "SHIPPED":
        return orderManagement.filter(
          (order) => order.orderStatus == "SHIPPED"
        );

      case "ON THE WAY":
        return orderManagement.filter(
          (order) => order.orderStatus == "ON_THE_WAY"
        );

      case "DELIVERED":
        return orderManagement.filter(
          (order) => order.orderStatus == "DELIVERED"
        );

      case "CANCELED":
        return orderManagement.filter(
          (order) => order.orderStatus == "CANCELED"
        );
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 mt-4">
      <Breadcrumb
            className="mb-8"
            items={[
           
            
              {
                title: <a href="/admin/dashboard">Admin</a>,
              },
              {
                title: <a href="/admin/orders">Orders</a>,
              },
            ]}
          />

        <div className="flex justify-between items-center">
          <Search
            placeholder="find order based id/ username / address / status order"
            enterButton="Search"
            size="large"
            className="w-2/3 font-bold"
            value={searchOrderValue}
            onChange={(e) => setSearchOrderValue(e.target.value)}
          />
        </div>
      </div>
      {orderManagement.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All order" {...a11yProps(0)} />
              <Tab label="NEW" {...a11yProps(1)} />
              <Tab label="CONFIRM" {...a11yProps(2)} />
              <Tab label="SHIPPED" {...a11yProps(3)} />
              <Tab label="ON THE WAY" {...a11yProps(4)} />
              <Tab label="DELIVERED" {...a11yProps(5)} />
              <Tab label="CANCELED" {...a11yProps(6)} />
            </Tabs>
          </Box>
          <OrderDashboard
            value={value}
            index={0}
            data={setUpData("all")}
            option="all"
          >
            Item One
          </OrderDashboard>
          <OrderDashboard
            value={value}
            index={1}
            data={setUpData("NEW")}
            option="NEW"
          >
            Item Two
          </OrderDashboard>
          <OrderDashboard
            value={value}
            index={2}
            data={setUpData("CONFIRM")}
            option="CONFIRM"
          >
            Item Two
          </OrderDashboard>
          <OrderDashboard
            value={value}
            index={3}
            data={setUpData("SHIPPED")}
            option="SHIPPED"
          >
            Item Three
          </OrderDashboard>
          <OrderDashboard
            value={value}
            index={4}
            data={setUpData("ON THE WAY")}
            option="ON_THE_WAY"
          >
            Item Three
          </OrderDashboard>
          <OrderDashboard
            value={value}
            index={5}
            data={setUpData("DELIVERED")}
            option="DELIVERED"
          >
            Item Three
          </OrderDashboard>
          <OrderDashboard
            value={value}
            index={6}
            data={setUpData("CANCELED")}
            option="CANCELED"
          >
            Item Three
          </OrderDashboard>
        </Box>
      ) : (
        <SpinTip />
      )}
    </div>
  );
}

Orders.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
