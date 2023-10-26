import React, { Fragment, useContext, useEffect, useState } from "react";
import DataContext from "@/context/DataContext";
import AdminLayout from "@/layouts/AdminLayout";
import { ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Input, Modal, Select, Spin, Table } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { API_URL } from "@/config";
import SpinTip from "@/components/loading/SpinTip";
import { BiSolidEdit } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Image } from "@mui/icons-material";

function Brands(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState({
    brandName: "",
    isLoading: false,
    isUpdating: false,
    status: false,
    value: [],
    updateBrandId: null,
  });

  const { value } = state;

  const { listBrands, listCates, getBrands } = useContext(DataContext);

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  const { confirm } = Modal;

  const Option = Select.Option;

  const { Search } = Input;

  const [showBrand, setShowBrand] = useState(listBrands);

  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const { data: session , status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login")
    },
  });
  const token = session?.accessToken;

  useEffect(() => {
    if (searchValue) {
      setShowBrand(
        listBrands.filter((cate) =>
          cate.name.toLowerCase().includes(searchValue)
        )
      );
    } else setShowBrand(listBrands);
  }, [searchValue, listBrands]);

  // update brand
  function updateBrand(brandId) {
    setIsModalOpen(true);
    setState({ ...state, isUpdating: true, updateBrandId: brandId });

    const foundBrand =
      listBrands && listBrands.find((brand) => brand.id === brandId);

    console.log("Brand found  ", JSON.stringify(foundBrand));

    setState((prevState) => ({
      ...prevState,
      brandName: foundBrand.name,
      value: foundBrand.categories.map((cate) => ({
        key: cate.id,
        label: cate.name.toString(),
        text: cate.name.toString(),
      })),
    }));
  }

  // handle delete
  async function deleteBrand(brandId) {
    confirm({
      title: "Are you sure delete this brand?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        (async () => {
          const response = await fetch(`${API_URL}/brands/${brandId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json(); // Parse the error response as JSON
            toast.error(errorData.message);
            
          } else {
            getBrands();
            toast.success("Xoá thành công !");
          }


        })();
      },
      onCancel() {},
    });
  }

  // handle submit
  const handleOk = async () => {
    if (state.brandName === "") {
      toast.error("Vui lòng nhập tên hãng !");
      return;
    } else if (value.length == 0) {
      toast.error("Vui lòng chọn mặt hàng kinh doanh");
      return;
    }

    if (!state.isUpdating) {
      const response = await fetch(`${API_URL}/brands`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandName: state.brandName,
          cateIds: value.map((cate) => cate.key),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } else {
        getBrands();
        toast.success("Successfully added");
      }
    } else {
      // updating action
      const brandId = state.updateBrandId;
      const response = await fetch(`${API_URL}/brands/${brandId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      } else {
        getBrands();
        toast.success("Cập nhật thành công !");
      }
    }

    setIsModalOpen(false);
    setState({
      brandName: "",
      isLoading: false,
      isUpdating: false,
      status: false,
      updateBrandId: null,
      selectedCates: null,
      value: [],
    });
  };

  // cancellation
  const handleCancel = () => {
    setIsModalOpen(false);
    if (state.isUpdating) {
      setState({
        brandName: "",
        isLoading: false,
        isUpdating: false,
        status: false,
        updateBrandId: null,
        selectedCates: null,
        value: [],
      });
    }
  };

  let options = [];

  if (listCates && listCates.length > 0) {
    options = listCates.map((cate) => ({
      text: cate.name.toString(),
      value: cate.id,
    }));
  }

  // handle select categories
  const handleChange = (value) => {
    setState({ ...state, value: value });
  };

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
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
    },

    {
      title: "Selling",
      dataIndex: "sell",
      key: "sell",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          {record.categories.map((cate) => (
            <td class="text-sm flex ">
              <img
                src={cate.imageUrl}
                width={20}
                height={20}
                className="rounded-full"
              />
              
              <span class="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
                {cate.name}
              </span>
            </td>
          ))}
        </div>
      ),
    },
    {
      title: "Number category",
      dataIndex: "",
      key: "",
      responsive: ["sm"],
      render: (_, record) => (
        <p className="align-center extra-light">{record.categories.length}</p>
      ),
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <BiSolidEdit
            onClick={() => updateBrand(record.id)}
            className="hover:cursor-pointer text-xl hover:text-primary-700"
          />

          <MdDeleteOutline
            className="text-red-400 hover:fill-primary-700 text-xl ml-6 hover:cursor-pointer"
            onClick={() => deleteBrand(record.id)}
          />
        </div>
      ),
    },
  ];

  
  if(status === "loading") {
    return <SpinTip />
  } else 


  return (
    <Fragment>
      {state.isLoading ? (
        <Spin
          indicator={antIcon}
          className="flex justify-center align-center items-center w-screen h-screen"
        />
      ) : (
        <div className="p-10">
          <div className="mb-4">
            <Breadcrumb
              className="mb-8"
              items={[
                {
                  title: <a href="/admin/dashboard">Admin</a>,
                },
                {
                  title: <a href="/admin/brands">Brands</a>,
                },
              ]}
            />

            <div className="flex justify-between items-center">
              <Search
                placeholder="find your brand"
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
                Add brand
              </button>
            </div>
          </div>
          {showBrand && listCates ? (
            <Table
              columns={columns}
              dataSource={showBrand}
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
          <div>
            <Modal
              className="p-4 mt-20"
              title={state.isUpdating ? "Cập nhật hãng" : "Thêm hãng"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              maskClosable={false}
            >
              <label className="block text-md mt-6"> Tên hãng </label>
              <input
                placeholder="Brand name"
                className="border-2 border-solid rounded-lg p-2 focus:outline-none w-1/3 text-sm"
                type="text"
                value={state.brandName}
                onChange={(e) =>
                  setState({ ...state, brandName: e.target.value })
                }
              />
              <div className="flex justify-between items-center align-center w-full">
                <div className="flex flex-col mt-4 w-full">
                  <label className="block"> Kinh doanh </label>

                  <Select
                    mode="multiple"
                    labelInValue
                    value={value}
                    placeholder="Select category sell"
                    filterOption={false}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  >
                    {options.map((d) => (
                      <Option key={d.value}>{d.text}</Option>
                    ))}
                  </Select>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </Fragment>
  );
}

Brands.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Brands;
