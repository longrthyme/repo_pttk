import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaUserTag } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { BiSolidCategory, BiSolidReport } from "react-icons/bi";
import { TbBrandEnvato } from "react-icons/tb";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";
import { GiBeachBag } from "react-icons/gi";

import {
  BarChartOutlined,
  ContainerOutlined,
  FileImageOutlined,
  FileTextOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
  TagsOutlined,
  TeamOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import AuthContext from "@/context/AuthContext";
import Image from "next/image";
import logo1 from "../public/images/logo1.png";

const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = {
    "/": "1",
    "/admin/dashboard": "2",
    "/admin/product-manage": "3",
    "/admin/user-manage": "4",
    "/admin/category-manage": "5",
    "/admin/brand-manage": "6",
    "/admin/order-manage": "7",
    "/admin/customer-manage": "8",
    "/admin/import-manage": "9",
  };

  const router = useRouter();

  const { pathname } = useRouter();

  const [current, setCurrent] = useState([menuItems[pathname]]);

  const { user, logout } = useContext(AuthContext);

  function getItem(label, key, icon, pathroute) {
    return {
      key,
      icon,
      pathroute,
      label,
    };
  }

  const countStyle = {
    right: 24,
  };

  const items = [
    getItem("", "1", <Image src={logo1} width={80} height={80} className="object-cover cursor-pointer" />, "/"),
    getItem("Dashboard", "2", <AiFillDashboard />, "/admin/dashboard"),
    getItem("Product", "3", <HiTemplate />, "/admin/product-manage"),
    getItem("User", "4", <FaUserTag />, "/admin/user-manage"),
    getItem("Category", "5", <BiSolidCategory />, "/admin/category-manage"),
    getItem("Brand", "6", <TbBrandEnvato />, "/admin/brand-manage"),
    getItem("Order", "7", <GiBeachBag />, "/admin/order-manage"),
    getItem("Customer", "8", <GiBeachBag />, "/admin/customer-manage"),
    getItem("Import", "9", <GiBeachBag />, "/admin/import-manage")
  ];

  const handleClick = ({ item, key }) => {
    setCurrent(key);
    router.push(item.props.pathroute);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[menuItems[pathname]]}
          selectedKeys={[menuItems[pathname]]}
          items={items}
          onClick={handleClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          
        >
          <div className="">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              // height: 64,
            }}
          />
          <Button className="mr-0" onClick={logout}>Logout</Button>
          </div>
        </Header>

        <Content
          style={{
            margin: "0px 16px",
            padding: 5,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;