import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUserTag } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { AiFillDashboard } from "react-icons/ai";

const { Sider, Content } = Layout;

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Information from "@/components/Account/accountSetting";
import UserOrder from "@/components/Account/orders";

function Homepage(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const { pathname } = useRouter();

  const [current, setCurrent] = useState("2");

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
    getItem("Dashboard", "1", <AiFillDashboard />, "/account"),
    getItem("Account settings", "2", <HiTemplate />, "/account"),
    getItem("Orders", "3", <FaUserTag />, "/account/order"),
  ];

  const handleClick = (e) => {
    setCurrent(e.key.toString());
  };

  return (
    <div>
      <Header />
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
            defaultSelectedKeys={["2"]}
            selectedKeys={[current]}
            items={items}
            onClick={handleClick}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Breadcrumb
              className="mb-8"
              items={[
                {
                  title: <a href="/">Home</a>,
                },
                {
                  title: <a href="/account">Account</a>,
                },
              ]}
            />
            {current == 2 && <Information />}

            {current == 3 && <UserOrder />}
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </div>
  );
}
export default Homepage;
