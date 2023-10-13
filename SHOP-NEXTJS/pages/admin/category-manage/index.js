import {  API_URL, NEXT_API } from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import { Breadcrumb, Image, Input, Modal, Switch, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "@/context/DataContext";
import { MdDeleteOutline } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import SpinTip from "@/components/loading/SpinTip";
import { BiSolidEdit } from "react-icons/bi";
import { handleImageUpload } from "@/utils/uploadImage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


function Categories(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState({
    categoryName: "",
    imageUrl: "",
    imageData: null,
    imagePreview: null,
    isLoading: false,
    isUpdating: false,
    status: false,
    categoryId: null,
  });

  const { listCates, updateCategories, getCategories, isLoading } =
    useContext(DataContext);

  const { confirm } = Modal;

  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [showCate, setShowCate] = useState(listCates);

  const { Search } = Input;

  const router = useRouter();
  
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {

    if(session?.role == "CUSTOMER") {
      router.push("/unauthorized")
    }
  } , [session]);


  let imgUrl = "";

  useEffect(() => {
    if (searchValue) {
      setShowCate(
        listCates.filter((cate) =>
          cate.name.toLowerCase().includes(searchValue)
        )
      );
    } else setShowCate(listCates);
  }, [searchValue, listCates]);

  // upload image handler
  const changeImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setState({
        ...state,
        imageData: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // update category
  const updateCategory = (categoryId) => {
    const updateCate = listCates.find((cate) => cate.id == categoryId);
    setIsModalOpen(true);
    setState({
      ...state,
      categoryName: updateCate.name,
      imagePreview: updateCate.imageUrl,
      isUpdating: true,
      status: updateCate.enabled,
      categoryId: categoryId,
    });
  };

  // update status
  const updateStatus = async (categoryId, status) => {
    // ver
    const resPut2 = await fetch(
      `${API_URL}/categories/status/${categoryId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );

    const dataPut2 = await resPut2.json();

    if (!resPut2.ok) {
      toast.error(dataPut2.message );
      
    } else {
      
      updateCategories(dataPut2);
      status ? toast.info("Disabled") : toast.success("Enabled !");
    
    }

  };

  // handle delete
  const deleteCategory = (categoryId) => {
    confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const deleteCate = async () => {
          //ver
          const resDel = await fetch(`${API_URL}/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const delData = await resDel.json();
    
          if (!resDel.ok) {
            toast.error(delData.message);
            
          } else {    getCategories();
            toast.success("Xoá thành công");
          }

        };

        deleteCate();
      },
      onCancel() {},
    });
  };


  // export to excel file
  const exportToExcelFile = async () => {
    const url = `${API_URL}/categories/download`;

    window.location = url

  }

  // handle submit
  const handleOk = async () => {
    if (state.categoryName === "") {
      toast.error("Vui lòng nhập tên danh mục");
      return;
    }

    //  add category
    if (!state.isUpdating) {
      if (state.imageData == null) {
        toast.error("Vui lòng chọn ảnh mẫu");
        return;
      }

      setLoading(true);

      await handleImageUpload(state.imageData)
        .then((res) => {
          imgUrl = res;
        })
        .catch((error) => {
          toast.error(error);
          return;
        });
      
      // updated ver
      const resPos = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.categoryName,
          enabled: true,
          imageUrl: imgUrl,
        }),
      });

      const postData = await resPos.json();

      if (!resPos.ok) {
        toast.error(postData.message);
        
      } else {
        // res.status(200).json({ categories: postData });
      }




    } else {
      // cap nhat danh muc
      const categoryId = state.categoryId;

      setLoading(true);

      if (state.imageData != null) {
        await handleImageUpload(state.imageData)
          .then((res) => {
            imgUrl = res;
          })
          .catch((error) => {
            toast.error(error);
            return;
          });
      } else {
        imgUrl = listCates.find(
          (category) => category.id == state.categoryId
        ).imageUrl;
      }

      
    // ver
    const resPut = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.categoryName,
        imageUrl: imgUrl,
        enabled: state.status,
      }),
    });

    const dataPut = await resPut.json();

    if (!resPut.ok) {
      toast.error(dataPut.message );
      
    } else {
      toast.success("Update successful !");
    }
    }

    getCategories();
    setLoading(false);
    setIsModalOpen(false);
    setState({
      categoryName: "",
      imageUrl: "",
      imageData: null,
      imagePreview: null,
      isLoading: false,
      isUpdating: false,
      status: false,
    });
    imgUrl = "";
  };

  // handle cancel
  const handleCancel = () => {
    setIsModalOpen(false);
    setState({
      categoryName: "",
      imageUrl: "",
      imageData: null,
      imagePreview: null,
      isLoading: false,
      isUpdating: false,
      status: false,
    });
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
      dataIndex: "imageUrl",
      key: "imageUrl",
      responsive: ["lg"],
      render: (_, record) => (
        <div className="flex">
          <div className="h-[2rem] w-[2rem]">
            {/* <Image
              alt={record.imageUrl}
              src={record.imageUrl}
              height={80}
              width={80}
              className="w-full h-auto object-cover"
            /> */}
               <Image
            className="rounded-full border border-white border-solid"
            alt="avatar"
            src={
              record.imageUrl
                ? record.imageUrl
                : "https://th.bing.com/th/id/OIP.srdjU7JjdeYDjK46AQVGKwHaHa?pid=ImgDet&w=200&h=200&c=7&dpr=1.3"
            }
            height={40}
            width={40}
          />
          </div>
          <span className="ml-20">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Products",
      dataIndex: "",
      key: "",
      responsive: ["lg"],
      render: (_, record) => (
        <h2>{record.products.length}</h2>
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
          onClick={() => updateStatus(record.id, record.enabled)}
        />
      ),
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <BiSolidEdit
            onClick={() => updateCategory(record.id)}
            className="hover:cursor-pointer text-xl hover:text-primary-700"
          />

          <MdDeleteOutline
            className="text-red-400 text-xl hover:fill-primary-700 ml-6 hover:cursor-pointer"
            onClick={() => deleteCategory(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <SpinTip />
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
                title: <a href="/admin/categories">Categories</a>,
              },
            ]}
          />

            <div className="flex justify-between items-center">
              <Search
                placeholder="find your category"
                enterButton="Search"
                size="large"
                className="w-1/3"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

<div className="flex">


<button
                className="text-white bg-primary-500 hover:bg-pimary-600 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto mr-4"
                onClick={() => exportToExcelFile()}
              >
                Export to excel
              </button>


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
                Add category
              </button>


</div>

          
            </div>
          </div>
          {showCate ? (
            <Table
              columns={columns}
              dataSource={showCate}
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
              title={state.isUpdating ? "Update category" : "Add new category"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              maskClosable={false}
            >
              <label className="block text-md mt-6"> Tên danh mục </label>
              <input
                placeholder="Category name"
                className="border-2 border-solid rounded-lg p-1 focus:outline-none w-2/3"
                type="text"
                value={state.categoryName}
                onChange={(e) =>
                  setState({ ...state, categoryName: e.target.value })
                }
              />
              <div className="flex justify-between items-center align-center ">
                <div className="flex flex-col mt-4">
                  <label className="block"> Ảnh </label>

                  <Input
                    type="file"
                    accept="image/*"
                    required={true}
                    onChange={(e) => changeImage(e)}
                  />
                </div>

                {state.imagePreview && (
                  <div className="">
                    <Image
                      width={60}
                      height={60}
                      id="imagePreview"
                      src={state.imagePreview}
                      // alt={state.imageData.name}
                      alt="image_preview"
                    />
                  </div>
                )}
              </div>
            </Modal>
          </div>
        </div>
      )}
      {loading ? <SpinTip /> : ""}
    </>
  );
}

Categories.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Categories;
