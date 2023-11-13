import SpinTip from "@/components/loading/SpinTip";
import { API_URL } from "@/config";
import DataContext from "@/context/DataContext";
import AdminLayout from "@/layouts/AdminLayout";


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
import { BiSolidEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function Employee(req, res) {
  const [isLoading, setIsLoading] = useState(false);

  const { Search } = Input;

  const [searchValue, setSearchValue] = useState("");

  const MySwal = withReactContent(Swal);

  const { employees, getAllCustomer } = useContext(DataContext);

  const [filterEmployees, setFilterEmployees] = useState(employees);

  const router = useRouter();

  const { data: session , status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login")
    },
  });
  const token = session?.accessToken;


  console.log("Ds filterEmployees " + JSON.stringify(filterEmployees));


  useEffect(() => {
    if(token) {
      getAllCustomer();
    }
  }, [token]);

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
      title: "No.Orders",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <p className=" text-center hover:cursor-pointer text-xl hover:text-primary-700" >{record.orders.length}</p>
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
            const update = async () => {
              const resGet = await fetch(
                `${API_URL}/admin/customers/${record.id}/${
                  record.enabled ? "disabled" : "enabled"
                }`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const dataGet = await resGet.json();

              if (!resGet.ok) {
                toast.error(dataGet.message);
              } else {
                getAllCustomer();
              }
            };

            MySwal.fire({
              title: "Are you sure?",
              text: "You want to update ",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, update it!",
            }).then((result) => {
              if (result.isConfirmed) {
                update();
                MySwal.fire(
                  "Updated!",
                  "Customer has been update status ",
                  "success"
                );
              }
            });
          }}
        />
      ),
    }
  
  ];

  
  if(status === "loading") {
    return <SpinTip />
  } else 


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

      <div></div>
      {isLoading ? <SpinTip /> : ""}
    </Fragment>
  );
}

Employee.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
