import { API_URL } from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import { Breadcrumb, Image, Input, Modal, Switch, Table } from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";
import DataContext from "@/context/DataContext";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import SpinTip from "@/components/loading/SpinTip";
import { BiSolidEdit } from "react-icons/bi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import errorCodes from "@/constant/ErrorCode";
import { useForm } from "react-hook-form";
import successCodes from "@/constant/SuccessCode";

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

  const { listCates, updateCategories, getCategories } =
    useContext(DataContext);

  const { confirm } = Modal;

  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [showCate, setShowCate] = useState(listCates);

  const { Search } = Input;

  const router = useRouter();

  const [updatedCate, setUpdatedCate] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

  const [validateImage, setValidateImage] = useState({
    imageExtension: false,
    imageSize: false,
  });

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login");
    },
  });
  const token = session?.accessToken;

  useEffect(() => {
    if (searchValue) {
      setShowCate(
        listCates.filter((cate) =>
          cate.name.toLowerCase().includes(searchValue)
        )
      );
    } else setShowCate(listCates);
  }, [searchValue, listCates]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (isUpdating) {
      reset(updatedCate);
    }
  }, [isUpdating]);

  const deleteCategory = async (categoryId) => {
    const resDel = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return resDel;
  };

  const addNewCategory = async (data) => {
    let payload = {
      name: data.name,
      enabled: true,
    };

    let formData = new FormData();

    let json = JSON.stringify(payload);
    let blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("category", blob);
    formData.append("image", data.image[0]);

    const resPos = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return resPos;
  };

  // update

  const updateCate = async (data) => {
    const payload = {
      name: data.name,
      enabled: true,
    };
    const formData = new FormData();

    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("category", blob);
    formData.append("image", data.image[0]);

    const resPut = await fetch(`${API_URL}/categories/${state.categoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return resPut;
  };

  const onSubmit = async (data) => {
    if (validateImage.imageExtension || validateImage.imageSize) return;

    setLoading(true);

    let result;

    result = !isUpdating ? addNewCategory(data) : updateCate(data);

    result
      .then((result) => {
        //Here body is not ready yet, throw promise
        if (!result.ok) throw result;
        return result.json();
      })
      .then((result) => {
        //Successful request processing
        if (isUpdating) toast.success(successCodes.UPDATED_SUCCESSFULL);
        else toast.success(successCodes.ADDED_SUCCESSFULL);
        if (isUpdating) {
          setIsUpdating(false);
          setState({ ...state, imagePreview: null });
        }
        reset({});

        setIsModalOpen(false);
        setLoading(false);

        getCategories();
      })
      .catch((error) => {
        //Here is still promise

        error.json().then((body) => {
          //Here is already the payload from API
          toast.error(body.message);
          setLoading(false);
        });
      })
      .finally(() => {
        setState({ ...state, imagePreview: null });
      });
  };

  // update category handler
  const updateCategory = (categoryId) => {
    const updateCate = listCates.find((cate) => cate.id == categoryId);

    setIsModalOpen(true);
    setState({
      ...state,
      // isUpdating: true,
      categoryId: categoryId,
      imagePreview: updateCate.imageUrl,
    });

    setIsUpdating(true);
    setUpdatedCate({
      name: updateCate.name,
    });
  };

  // cancel dialog
  const handleCancel = () => {
    setIsModalOpen(false);
    if (isUpdating) setIsUpdating(false);
    reset({});
    setState({ ...state, imagePreview: null });
  };

  // update status handler
  const updateStatus = async (categoryId, status) => {
    const resPut2 = await fetch(`${API_URL}/categories/status/${categoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    const dataPut2 = await resPut2.json();

    if (!resPut2.ok) {
      toast.error(dataPut2.message);
    } else {
      updateCategories(dataPut2);
      status ? toast.info("Disabled") : toast.success("Enabled !");
    }
  };

  const handleImageUpload = (e) => {
    /**
     * upload image
     */

    const file = e.target.files[0];

    if (file?.size > 2000000) {
      setValidateImage({ ...validateImage, imageSize: true });
      return;
    }

    if (validateImage.imageSize) {
      setValidateImage({ ...validateImage, imageSize: false });
    }

    if (!file?.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setValidateImage({
        ...validateImage,
        imageExtension: true,
      });
      return;
    } else {
      setState({ ...state, imagePreview: URL.createObjectURL(file) });

      if (validateImage.imageExtension) {
        setValidateImage((prevState) => ({
          ...prevState,
          imageExtension: false,
        }));
      }
    }
  };

  const exportToExcelFile = async () => {
    /**
     * download to excel
     */
    const url = `${API_URL}/categories/download`;
    window.location = url;
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
      title: "No. Products",
      dataIndex: "",
      key: "",
      responsive: ["lg"],
      render: (_, record) => <p>{record.products.length}</p>,
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
            onClick={() => {
              MySwal.fire({
                title: "Are you sure?",
                text: "You want to delete category  " + record.name,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteCategory(record.id)
                    .then((res) => {
                      if (!res.ok) {
                        throw res;
                      }
                      return res.json();
                    })
                    .then((data) => {
                      MySwal.fire(
                        "Thành công",
                        "Đã xoá danh mục thành công",
                        "success"
                      );

                      getCategories();
                    })
                    .catch((error) => {
                      //Here is still promise
                      if (typeof error.json === "function") {
                        error.json().then((body) => {
                          console.log("Body is " + body);
                          //Here is already the payload from API
                          console.log("body " + JSON.stringify(body));
                          MySwal.fire("Failure!", body.message, "error");
                        });
                      } else {
                        MySwal.fire("Failure!", body, "error");
                      }
                    });
                }
              });
            }}
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
        {/* start content body */}
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

          {/* start modal */}

          {loading ? (
            <SpinTip />
          ) : (
            <div>
              <Modal
                className="p-4 mt-20"
                title={
                  state.isUpdating ? "Update category" : "Add new category"
                }
                open={isModalOpen}
                onOk={handleSubmit(onSubmit)}
                onCancel={handleCancel}
                maskClosable={false}
              >
                <label className="block text-md mt-6"> Tên danh mục </label>
                <input
                  placeholder="Category name"
                  className="border-2 border-solid rounded-lg p-1 focus:outline-none w-2/3"
                  type="text"
                  {...register("name", {
                    required: errorCodes.CATEGORY_NAME_REQUIRED,
                  })}
                />
                <p>
                  {" "}
                  {errors.name && (
                    <p className="text-red-600 mt-2">
                      {errors?.name.message || "Error"}
                    </p>
                  )}
                </p>
                <div className="flex justify-between items-center align-center ">
                  <div className="flex flex-col mt-4">
                    <label className="block"> Ảnh </label>

                    <input
                      className="display-form"
                      type="file"
                      accept="image/*"
                      {...register("image", {
                        required: isUpdating
                          ? false
                          : errorCodes.IMAGE_REQUIRED,
                        onChange: (e) => handleImageUpload(e),
                      })}
                    ></input>
                  </div>

                  {state.imagePreview && (
                    <div className="">
                      <Image
                        width={60}
                        height={60}
                        id="imagePreview"
                        src={state.imagePreview}
                        alt="image_preview"
                      />
                    </div>
                  )}
                </div>
                <p>
                  {errors.image && (
                    <p className="text-red-600 mt-2">
                      {errors?.image.message || "Error"}
                    </p>
                  )}
                </p>
                <p>
                  {validateImage.imageExtension && (
                    <p className="text-red-600 mt-2">
                      {errorCodes.IMAGE_EXTENSION_SUPPORTED || "Error"}
                    </p>
                  )}
                </p>

                <p>
                  {validateImage.imageSize && (
                    <p className="text-red-600 mt-2">
                      {errorCodes.IMAGE_SIZE_LIMIT || "Error"}
                    </p>
                  )}
                </p>
              </Modal>
            </div>
          )}

          {/* end modal */}
        </div>
        {/* end content */}
      </Fragment>
    );
}

Categories.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Categories;
