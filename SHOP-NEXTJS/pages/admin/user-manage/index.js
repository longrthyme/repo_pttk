import SpinTip from "@/components/loading/SpinTip";
import { API_URL } from "@/config";
import DataContext from "@/context/DataContext";
import AdminLayout from "@/layouts/AdminLayout";
import { ExclamationCircleFilled, UserOutlined } from "@ant-design/icons";
import { Grid } from "@mui/material";
import { Breadcrumb, Image, Input, Modal, Switch, Table, Tag } from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { MdWifiPassword } from "react-icons/md";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import errorCodes from "@/constant/ErrorCode";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import {
  EmailRounded,
  PasswordRounded,
  PhoneAndroid,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
const options = [
  {
    value: "ROLE_ADMIN",
    label: "Quản trị viên",
  },
  {
    value: "ROLE_EMPLOYEE",
    label: "Nhân viên",
  },
];

function Products(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accounts, getAllUser, isLoading } = useContext(DataContext);

  const [isAdding, setIsAdding] = useState(false);

  const MySwal = withReactContent(Swal);

  let {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm();

  const { confirm } = Modal;

  const [searchValue, setSearchValue] = useState("");

  const [showUsers, setShowUsers] = useState(accounts);

  const { Search } = Input;

  const [imagePreview, setImagePreview] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

  const [lock, setLock] = useState({
    isModalOpen: false,
    accountId: null,
    accountStatus: null,
  });

  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login");
    },
  });
  const token = session?.accessToken;

  const [error, setError] = useState();

  const [updatedUser, setUpdatedUser] = useState();

  const [imageUser, setImageUser] = useState(null);

  useEffect(() => {
    if (isUpdating) {
      reset(updatedUser);
    }
  }, [isUpdating]);

  async function handleSubmitLock() {
    (async () => {
      // ver
      const resGet = await fetch(
        `${API_URL}/admin/user-management/${lock.accountId}/${
          lock.accountStatus ? "disabled" : "enabled"
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
        if (lock.accountStatus) toast.error("Deactive account !");
        else toast.success("Active account!");
        getAllUser();
        setLock({ ...lock, isOpenLock: false });
      }
    })();
  }

  useEffect(() => {
    if (token) {
      getAllUser();
    }
  }, [token]);

  useEffect(() => {
    if (searchValue) {
      setShowUsers(
        accounts.filter(
          (cate) =>
            (cate.email && cate.email.toLowerCase().includes(searchValue)) ||
            (cate.name && cate.name.toLowerCase().includes(searchValue)) ||
            (cate.phoneNumber &&
              cate.phoneNumber.toLowerCase().includes(searchValue))
        )
      );
    } else setShowUsers(accounts);
  }, [searchValue, accounts]);

  const showConfirm = () => {
    confirm({
      title: "Do you Want to deactive this account?",
      icon: <ExclamationCircleFilled />,
      content: "",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const changeImage = (event) => {
    const selectedImage = event.target.files[0];
    setImageUser(selectedImage);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const addNewUser = async (data) => {
    const resPos = await fetch(`${API_URL}/admin/user-management/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    return resPos;
  };

  const updateInfoUser = (accountId) => {
    setIsModalOpen(true);

    // setUpdateUser(accountId);

    console.log("List accounts is " + JSON.stringify(accounts));

    let account = accounts.filter((account) => account.id == accountId)[0];

    console.log("Filtered account " + JSON.stringify(account));

    setIsUpdating(true);

    setImagePreview(account.imgURL);

    setUpdatedUser({
      username: account.username,
      email: account.email,
      name: account.name,
      phone: account.phone,
      roles: account.roles.map((role) => ({
        value: role.name,
        label: role.description,
      })),
    });
  };
  const onSubmitAdd = async (data) => {
    setIsAdding(true);
    alert("Data " + JSON.stringify(data));

    const formData = new FormData();

    const userData = {
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      phoneNumber: data.phone,
      enabled: true,
      roles: data.roles.map((role) => ({
        name: role.value,
      })),
    };

    const blob = new Blob([JSON.stringify(userData)], {
      type: "application/json",
    });

    formData.append("user", blob);

    formData.append("imageUser", data.image[0]);

    let result;

    if (!isUpdating) {
      //add
      result = addNewUser(formData);
    } else {
      // update
      result = updateInfoUser(formData);
    }

    result
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        MySwal.fire("Thành công", "Đã thêm thành công", "success");
        setIsModalOpen(false);
        getAllUser();
        isUpdating && setIsUpdating(false);
        reset();
        isAdding && setIsAdding(false);
      })
      .catch((err) => {
        if (typeof err.json === "function") {
          err.json().then((body) => {
            MySwal.fire("Failure!", body.message, "error");
          });
        } else {
          MySwal.fire("Failure!", body, "error");
        }
      });
  };

  const handleCancel = () => {
    console.log("Da vao cancel modal");
    setIsModalOpen(false);

    setIsUpdating(false);
    reset({});
  };

  // // update user info
  // async function updateUser() {

  //   setIsUpdating(true);
  //   setIsModalOpen(true);

  //   const resPos = await fetch(`${API_URL}/admin/user-management/add`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: data,
  //   });

  //   return resPos;

  // }

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
      key: "",
      responsive: ["lg"],

      render: (_, record) => (
        <div className="flex flex-col items-center ">
          <p className="font-extralight">{record.phoneNumber}</p>
          <span>{record.email}</span>
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
            setLock({
              isOpenLock: true,
              accountUsername: record.username,
              accountStatus: record.enabled,
              accountId: record.id,
            });
          }}
        />
      ),
    },

    {
      title: "Role",
      dataIndex: "",
      key: "role",
      responsive: ["lg"],
      render: (_, record) =>
        record.roles.map((role, index) =>
          role.name == "ROLE_EMPLOYEE" ? (
            <span class="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">
              {role.name}
            </span>
          ) : (
            <span class="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900 mr-2">
              {role.name}
            </span>
          )
        ),
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <BiSolidEdit
            onClick={() => {
              updateInfoUser(record.id);
            }}
            className="hover:cursor-pointer text-xl hover:text-primary-700"
          />
        </div>
      ),
    },
  ];

  if (status === "loading") {
    return <SpinTip />;
  } else
    return (
      <Fragment>
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

              <button
                className="text-white bg-primary-500 hover:bg-pimary-600 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                onClick={() => setIsModalOpen(true)}
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
                </svg>
                Add user
              </button>
            </div>
          </div>

          {/* start table user */}

          {!isLoading ? (
            <Table
              columns={columns}
              dataSource={showUsers}
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

          {/* end table user */}

          {/* modal add user */}

          {isAdding ? (
            <SpinTip content="Đang xử lý đợi xíu....." />
          ) : (
            <Modal
              title="Add new user"
              open={isModalOpen}
              onOk={handleSubmit(onSubmitAdd)}
              onCancel={handleCancel}
              maskClosable={false}
              width={500}
            >
              {error ? (
                <div className="mb-4">
                  {error.map((err) => (
                    <div className="bg-red-400 text-white px-2 py-1 border border-2 rounded-md mt-1">
                      {err}
                    </div>
                  ))}
                </div>
              ) : (
                " "
              )}

              <Grid item xs={6}>
                {imagePreview ? (
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      id="imagePreview"
                      src={imagePreview}
                      alt="image_preview"
                    />
                  </div>
                ) : (
                  ""
                )}
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <label className="block text-md "> Username </label>

                  <Controller
                    control={control}
                    name="username"
                    rules={{
                      required: errorCodes.USERNAME_IS_REQUIRED,
                    }}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          // defaultValue={"Long tran 2001"}

                          onChange={(e) => field.onChange(e.target.value)}
                          placeholder="username"
                          prefix={<UserOutlined />}
                        />
                      );
                    }}
                  />

                  <p>
                    {" "}
                    {errors.username && (
                      <p className="text-red-600 mt-2">
                        {errors?.username.message || "Error"}
                      </p>
                    )}
                  </p>
                </Grid>

                <Grid item xs={6}>
                  <label className="block text-md "> Password </label>

                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: errorCodes.PASSWORD_IS_REQUIRED,
                      minLength: {
                        value: 6,

                        message: errorCodes.PASSWORD_AT_LEAST,
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          placeholder="password"
                          prefix={<PasswordRounded />}
                        />
                      );
                    }}
                  />
                  <p>
                    {" "}
                    {errors.password && (
                      <p className="text-red-600 mt-2">
                        {errors?.password.message || "Error"}
                      </p>
                    )}
                  </p>
                </Grid>

                <Grid item xs={6}>
                  <label className="block text-md "> Email </label>

                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      required: errorCodes.EMAIL_IS_REQUIRED,
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: errorCodes.EMAIL_IS_NOT_VALID,
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          placeholder="email"
                          prefix={<EmailRounded />}
                        />
                      );
                    }}
                  />
                  <p>
                    {" "}
                    {errors.email && (
                      <p className="text-red-600 mt-2">
                        {errors?.email.message || "Error"}
                      </p>
                    )}
                  </p>
                </Grid>

                <Grid item xs={6}>
                  <label className="block text-md "> Name </label>

                  <Controller
                    control={control}
                    name="name"
                    rules={{
                      required: errorCodes.FULL_NAME_REQUIRED,
                    }}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          placeholder="name"
                          prefix={<UserOutlined />}
                        />
                      );
                    }}
                  />

                  <p>
                    {" "}
                    {errors.name && (
                      <p className="text-red-600 mt-2">
                        {errors?.name.message || "Error"}
                      </p>
                    )}
                  </p>
                </Grid>

                <Grid item xs={6}>
                  <label className="block text-md "> Phone number </label>

                  <Controller
                    control={control}
                    name="phone"
                    rules={{
                      required: errorCodes.PHONE_NUMBER_IS_REQUIRED,
                      pattern: {
                        value: /^([+]\d{2})?\d{10}$/,
                        message: errorCodes.PHONE_NUMBER_NOT_CORRECT_FORMAT,
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          placeholder="phone"
                          prefix={<PhoneAndroidOutlined />}
                        />
                      );
                    }}
                  />
                  <p>
                    {" "}
                    {errors.phone && (
                      <p className="text-red-600 mt-2">
                        {errors?.phone.message || "Error"}
                      </p>
                    )}
                  </p>
                </Grid>

                <Grid item xs={6}>
                  <label className="block text-md "> Role </label>

                  <Controller
                    control={control}
                    name="roles"
                    rules={{ required: "Please select a role !" }}
                    render={({ field: { onChange, value, name } }) => (
                      <Select
                        className="w-full"
                        options={options}
                        onChange={onChange}
                        isMulti={true}
                        value={value}
                        name={name}
                      />
                    )}
                  />
                  <p>
                    {" "}
                    {errors.roles && (
                      <p className="text-red-600 mt-2">
                        {errors?.roles.message || "Error"}
                      </p>
                    )}
                  </p>
                </Grid>

                {/* start image */}

                <Grid item xs={6}>
                  <div className="flex align-center items-center mt-2">
                    <label className="border px-4 text-white py-2 bg-primary-500 font-semibold rounded-md hover:bg-primary-600">
                      Upload image
                      <input
                        className="display-form"
                        type="file"
                        accept="image/*"
                        {...register("image", {
                          required: errorCodes.IMAGE_REQUIRED,
                          onChange: (e) =>
                            setImagePreview(
                              URL.createObjectURL(e.target.files[0])
                            ),
                        })}
                      ></input>
                    </label>
                  </div>
                  <p>
                    {" "}
                    {errors.image && (
                      <p className="text-red-600 mt-2">
                        {errors?.image.message || "Error"}
                      </p>
                    )}
                  </p>
                </Grid>

                {/* end image */}
              </Grid>
            </Modal>
          )}

          {/* end modal add user */}

          {/* modal confirm switch */}

          <Modal
            title={lock.accountStatus ? " Xác thực khoá " : " Xác thực mở khoá"}
            open={lock.isOpenLock}
            onOk={handleSubmitLock}
            onCancel={() => setLock({ ...lock, isOpenLock: false })}
          >
            <p>
              Bạn muốn{" "}
              {lock.accountStatus ? "khoá tài khoản  " : "mở khoá tài khoản "}{" "}
              {lock.accountUsername}{" "}
            </p>
          </Modal>

          {/* end modal confirm switch */}
        </div>
      </Fragment>
    );
}

Products.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Products;
