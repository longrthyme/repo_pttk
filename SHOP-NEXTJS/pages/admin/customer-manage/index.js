import SpinTip from "@/components/loading/SpinTip";
import { NEXT_API } from "@/config";
import DataContext from "@/context/DataContext";
import AdminLayout from "@/layouts/AdminLayout";
import { ExclamationCircleFilled, UserOutlined } from "@ant-design/icons";
import { Chip, Grid } from "@mui/material";

import {
  Breadcrumb,
  Image,
  Input,
  Modal,
  Select,
  Switch,
  Table,
  Tag,
} from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { MdWifiPassword } from "react-icons/md";
import { toast } from "react-toastify";


export default function Employee(req, res) {

  const [isLoading, setIsLoading] = useState(false);

  const { Search } = Input;

  const [searchValue, setSearchValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { employees, getAllCustomer } = useContext(DataContext);

  const [filterEmployees, setFilterEmployees] = useState(employees);

  
  const { data: session } = useSession();
  const token = session?.accessToken;

  const router = useRouter();

  
  useEffect(() => {

    if(session?.role == "CUSTOMER") {
      router.push("/unauthorized")
    }
  } , [session]);


  

  useEffect(() => {

    getAllCustomer();


  }, []);


  useEffect(() => {
    if (searchValue) {
      setFilterEmployees(
        employees.filter(
          (cate) =>
            (cate.email && cate.email.toLowerCase().includes(searchValue)) ||
            (cate.name && cate.name.toLowerCase().includes(searchValue)) ||
            (cate.phoneNumber &&
              cate.phoneNumber.toLowerCase().includes(searchValue))
        )
      );
    } else setFilterEmployees(employees);
  }, [searchValue, employees]);


  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sortOrder: "ascend",
      sorter: (a, b) => {
        return a.id - b.id > 0 ? 1 : -1;
      },
    },
    {
      title: "Full name",
      dataIndex: "",
      key: "name",
      responsive: ["lg"],
      render: (_, record) => (
        <div className="flex items-center ">
          <Image
            className="rounded-full border border-white border-solid"
            alt="avatar"
            src={
              record.imgURL
                ? record.imgURL
                : "https://th.bing.com/th/id/OIP.srdjU7JjdeYDjK46AQVGKwHaHa?pid=ImgDet&w=200&h=200&c=7&dpr=1.3"
            }
            height={40}
            width={40}
          />

          <p className="ml-2">{record.name}</p>
        </div>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      responsive: ["lg"],
    },
    {
      title: "Mobile | Email",
      dataIndex: "",
      key: "email",
      responsive: ["lg"],

      render: (_, record) => (
        <div className="flex flex-col items-center ">
          <p className="font-bold">{record.phoneNumber}</p>
          <p>{record.email}</p>
        </div>
      ),
    },

    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      responsive: ["lg"],
      render: (_, record) => (
        <Switch
          defaultChecked
          checked={record.enabled}
          onClick={() => {
            // showConfirm;
            // setUpdateUser(record)

            (async () => {
              const resGet = await fetch(
                `${NEXT_API}/api/user?action=update_status`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    customerId: record.id,
                    status: record.enabled ? "disabled" : "enabled",
                  }),
                }
              );

              const dataGet = await resGet.json();

              if (!resGet.ok) {
                toast.error(dataGet.message);
              } else {
                if (record.enabled) toast.error("Deactive account !");
                else toast.success("Active account!");
                setUpdate(!update);
              }
            })();
          }}
        />
      ),
    },


    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <BiSolidEdit

            className="hover:cursor-pointer text-xl hover:text-primary-700"
          />
        </div>
      ),
    },
  ];


  return (

    <Fragment>
      {isLoading ? (
        <SpinTip />
      ) : (
        <div className="p-4">
          <Breadcrumb
            className="mb-8"
            items={[
              {
                title: <a href="/admin/dashboard">Admin</a>,
              },
              {
                title: <a href="/admin/users">Users</a>,
              },
            ]}
          />

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <Search
                placeholder="search email / phone number / name"
                enterButton="Search"
                size="large"
                className="w-1/3"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          {filterEmployees ? (
            <Table
              columns={columns}
              dataSource={filterEmployees}
              pagination={{
                pageSizeOptions: ["50", "100"],
                showSizeChanger: true,
                pageSize: 6,
              }}
              rowKey={(record) => record.id}
            />
          ) : (
            <SpinTip />
          )}

        </div>
      )}

      <div>
      </div>
      {isLoading ? <SpinTip /> : ""}
    </Fragment>


  )


}

Employee.getLayout = (page) => <AdminLayout>{page}</AdminLayout>