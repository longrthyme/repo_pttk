import AdminLayout from "@/layouts/AdminLayout";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import DataContext from "@/context/DataContext";
import { API_URL } from "@/config";
import { toast } from "react-toastify";
import icon_upload from "../../../public/images/logo_upload.png";
import { useSession } from "next-auth/react";
import SpinTip from "@/components/loading/SpinTip";
import { useForm } from "react-hook-form";
import errorCodes from "@/constant/ErrorCode";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import successCodes from "@/constant/SuccessCode";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <h5>Loading ...</h5>,
});

function AddProduct(props) {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [state, setState] = useState({
    imagePreview: null,
    brandOptions: [],
    categoryOptions: [],
    defaultCate: "",
    defaultBrand: "",
    isLoading: true,
    imageData: null,
    primaryImage: null,
    primaryImagePrev: "",
  });

  const { listBrands, listCates, getProductAdmin } = useContext(DataContext);
  const [images, setImages] = useState([]);

  const [indices, setIndices] = useState([]);

  const [validation, setValidation] = useState({
    limitSizePrimaryImage: false,
    limitSizeExtraImages: false,
    extraImages: null,
    image: null,
  });

  const [isDetailMissing, setIsDetailMissing] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login");
    },
  });
  const token = session?.accessToken;

  const [description, setDescription] = useState("");

  const [details, setDetails] = useState([]);

  const addNewDetail = () => {
    setDetails([...details, { name: "", value: "" }]);
  };

  const removeDetailItem = (index) => {
    let updateDetail = [...details];
    updateDetail.splice(index, 1);
    setDetails(updateDetail);
  };

  const updateDetail = (i, e) => {
    let newFormValues = [...details];
    newFormValues[i][e.target.name] = e.target.value;
    setDetails(newFormValues);
  };

  useEffect(() => {
    for (const detail of details) {
      if (detail.name == "" || detail.value == "") {
        setIsDetailMissing(true);
        return;
      }
    }
    setIsDetailMissing(false);
  }, [details]);

  // set brand default & cate default
  useEffect(() => {
    const brandOpts =
      listBrands &&
      listBrands.map((brand) => ({
        key: brand.id,
        value: brand.name,
      }));

    if (listCates && listCates.length > 0 && listBrands.length > 0) {
      filterCate(brandOpts[0].key);
    }

    if (
      listBrands &&
      listBrands.length > 0 &&
      listCates &&
      listCates.length > 0
    ) {
      let valueBrand = brandOpts[0].label;

      setState((prevState) => ({
        ...prevState,
        brandOptions: brandOpts,
        defaultBrand: valueBrand,
        isLoading: false,
      }));
    }
  }, [listBrands, listCates]); // 2 dependency

  const removeImage = (indices, arr) => {
    for (const index of indices) {
      if (index >= 0 && index < arr.length) {
        arr = Array.prototype.slice.call(arr); // Array
        arr.splice(index, 1);
      }
    }

    return arr;
  };

  const changePrimaryImage = (e) => {
    /**
     * change primary image
     */

    setState({ ...state, primaryImagePrev: null });

    if (e.target.files[0] == null) return;

    // check size image
    var size = e.target.files[0]?.size;

    if (size > 2000000) {
      setValidation({ ...validation, limitSizePrimaryImage: true });
      return;
    }

    if (validation.limitSizePrimaryImage) {
      setValidation((prevState) => ({
        ...prevState,
        limitSizePrimaryImage: false,
      }));
    }

    // validate upload file  extension
    const name = e.target.files[0]?.name;
    if (!name?.match(/\.(jpg|jpeg|png|gif)$/)) {
      setValidation({
        ...validation,
        image: errorCodes.IMAGE_EXTENSION_SUPPORTED,
      });
    } else {
      setState({
        ...state,
        primaryImagePrev: URL.createObjectURL(e.target.files[0]),
      });

      if (validation.image) {
        setValidation((prevState) => ({ ...prevState, image: null }));
      }
    }
  };

  const onAddProduct = async (data) => {
    /**
     *  add new product
     */
    if (
      validation.limitSizeExtraImages ||
      validation.limitSizePrimaryImage ||
      validation.extraImages != null ||
      validation.image != null
    )
      return;

    const productInfo = {
      name: data.name,
      original_price: data.price,
      discount_percent: data.discount,
      description: description,
      inStock: true,
      brand: data.brand,
      category: data.category,
      productQuantity: data.quantity,
      details: details,
      enabled: true,
    };

    //validate detail info
    for (const detail of details) {
      if (detail.name == "" || detail.value == "") {
        return;
      }
    }

    setState({ ...state, isLoading: true });

    const formData = new FormData();

    const json = JSON.stringify(productInfo);
    const blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("product", blob);
    formData.append("primaryImage", data.image[0]);

    // update extra image
    var updateImages = removeImage(indices, data.extraImages);

    for (let i = 0; i < updateImages.length; i++) {
      formData.append("extraImage", updateImages[i]);
    }

    await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        MySwal.fire(
          "Thành công",
          successCodes.PRODUCT_ADD_SUCCESSFULLY,
          "success"
        );
        getProductAdmin();
        router.push("/admin/product-manage");
      })
      .catch((error) => {
        //Here is still promise
        if (typeof error.json === "function") {
          error.json().then((body) => {
            //Here is already the payload from API
            MySwal.fire("Failure!", body.message, "error");
          });
        } else {
          MySwal.fire("Failure!", error.message, "error");
        }
      })
      .finally(() => {
        setState({
          ...state,
          primaryImagePrev: null,
          imagePreview: null,
          isLoading: false,
        });
        setImages([]);
        // reset();
      });
  };

  const filterCate = async (e) => {
    /**
     * filter category by brand
     */

    const response = await fetch(`${API_URL}/brands/categories/${e}`);

    const categories = await response.json();
    if (!response.ok) {
      toast.error(errorCodes.CATEGORY_BY_BRAND);
      return;
    }
    const cateOpts = categories.map((cate) => ({
      key: cate.id,
      value: cate.name,
    }));
    let cateLabel = cateOpts[0].label;

    setState((prevState) => ({
      // setState của useEffect phía trên chưa kịp cập nhật giá trị của isLoading prop
      ...prevState,
      categoryOptions: cateOpts,
      defaultCate: cateLabel,
    }));
  };

  const deleteImage = (index) => {
    /**
     * delete image
     */
    var copyImages = [...images];
    copyImages.splice(index, 1);
    setImages(copyImages);
    setIndices([...indices, index]);
  };

  console.log("State extra images " + validation.limitSizeExtraImages);

  const uploadMultipleImage = (images) => {
    /**
     *
     * add extra images
     */
    const files = images;

    for (let i = 0; i < files.length; i++) {
      const name = files[i].name;

      var size = files[i].size;

      if (size > 2000000) {
        setValidation({ ...validation, limitSizeExtraImages: true });
        return;
      }

      if (validation.limitSizeExtraImages) {
        setValidation({ ...validation, limitSizeExtraImages: false });
      }

      if (!name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setValidation({
          ...validation,
          extraImages: errorCodes.IMAGE_EXTENSION_SUPPORTED,
        });
        return;
      } else {
        setImages((prevImage) => [
          ...prevImage,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);

        if (validation.extraImages) {
          setValidation((prevState) => ({ ...prevState, extraImages: null }));
        }
      }
    }
  };

  if (status === "loading") {
    return <SpinTip />;
  } else
    return (
      <div className="p-10 border border-1">
        {state.isLoading ? (
          <SpinTip />
        ) : (
          <form onSubmit={handleSubmit(onAddProduct)}>
            <Fragment>
              <Row>
                <Col flex="400px" className="pl-4">
                  <div className="info-1">
                    <h2 className="font-medium  text-base">About</h2>
                    <p className="text-gray-700">Basic product information</p>

                    {state.primaryImagePrev && (
                      <img
                        src={state.primaryImagePrev}
                        width={150}
                        height={150}
                        className="mt-10"
                      />
                    )}
                  </div>
                </Col>
                <Col flex="1">
                  <div className="flex flex-col">
                    <label className="font-semibold text-base mt-4">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      className="p-1.5 border-2 border-solid required:border-red-500 focus:border-black rounded-md justify-center hover:border-purple-400 mt-2"
                      placeholder="Nhập tên sản phẩm"
                      {...register("name", {
                        required: errorCodes.PRODUCT_NAME_REQUIRED,
                      })}
                    />
                  </div>
                  <p>
                    {" "}
                    {errors.name && (
                      <p className="text-red-600 mt-2">
                        {errors?.name.message || "Error"}
                      </p>
                    )}
                  </p>

                  <div className="flex flex mt-2">
                    <div className="flex flex-col ">
                      <label className="font-semibold text-base mt-3">
                        Discount
                      </label>
                      <input
                        className="border border-1 p-2 rounded-lg w-2/3"
                        {...register("discount", {
                          required: errorCodes.PRODUCT_DISCOUNT_REQUIRED,
                          min: {
                            value: 0.0,
                            message: errorCodes.PRODUCT_DISCOUNT_MIN,
                          },
                          max: {
                            value: 1.0,
                            message: errorCodes.PRODUCT_DISCOUNT_MAX,
                          },
                        })}
                      />
                      <p>
                        {" "}
                        {errors.discount && (
                          <p className="text-red-600 mt-2">
                            {errors?.discount.message || "Error"}
                          </p>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col ml-8 text-base">
                      <label className="font-medium mt-3">Price </label>
                      <input
                        className="border border-1 p-2 rounded-lg w-2/3"
                        {...register("price", {
                          required: errorCodes.PRODUCT_PRICE_REQUIRED,
                          min: {
                            value: 0.0,
                            message: errorCodes.PRODUCT_PRICE_MIN,
                          },
                        })}
                      />
                      <p>
                        {" "}
                        {errors.price && (
                          <p className="text-red-600 mt-2">
                            {errors?.price.message || "Error"}
                          </p>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex align-center items-cente mt-2 text-base">
                    <div className="flex flex-col">
                      <label className="font-medium mt-3">Quantity </label>
                      <input
                        className="border border-1 p-2 rounded-lg w-2/3"
                        {...register("quantity", {
                          required: errorCodes.PRODUCT_QUANTITY_REQUIRED,
                          min: {
                            value: 0.0,
                            message: errorCodes.PRODUCT_QUANTITY_MIN,
                          },
                        })}
                      />
                      <p>
                        {" "}
                        {errors.quantity && (
                          <p className="text-red-600 mt-2">
                            {errors?.quantity.message || "Error"}
                          </p>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-8">
                    <Image
                      src={icon_upload}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <label className="border px-4 text-white py-2 bg-primary-500 font-semibold ml-12 rounded-md hover:bg-primary-600">
                      <input
                        className="display-form"
                        type="file"
                        accept="image/*"
                        {...register("image", {
                          required: errorCodes.PRODUCT_IMAGE_REQUIRED,
                          onChange: (e) => changePrimaryImage(e),
                        })}
                      ></input>
                    </label>
                  </div>
                  <p>
                    {" "}
                    {validation.image && (
                      <p className="text-red-600 mt-2">
                        {validation.image || "Error"}
                      </p>
                    )}
                    {validation.limitSizePrimaryImage && (
                      <p className="text-red-600 mt-2">
                        {errorCodes.IMAGE_SIZE_LIMIT}
                      </p>
                    )}
                  </p>
                  {errors.image && (
                    <p className="text-red-600 mt-2">
                      {errors?.image.message || "Error"}
                    </p>
                  )}
                </Col>
              </Row>

              <hr className="border-1 border-gray-200 mt-10" />

              <Row className="mt-10">
                <Col flex="400px" className="pl-4">
                  <div className="info-1">
                    <h2 className="font-medium  text-base">Brand & category</h2>
                    <p className="text-gray-700">In brand and category</p>
                  </div>
                </Col>
                <Col flex="1">
                  <div className="flex flex-col mt-2 text-base">
                    <div className="flex flex-col">
                      <label className="font-semibold  mt-3 mb-2">Brand </label>

                      <select
                        className="border border-1 rounded-lg p-2 w-1/3"
                        defaultValue={state.defaultBrand}
                        {...register("brand", {
                          required: "Please provide the brand",
                          onChange: (e) => {
                            filterCate(e.target.value);
                          },
                        })}
                      >
                        {state.brandOptions.map((brand) => (
                          <option value={brand.key}>{brand.value}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label className="font-semibold  mt-3">Category </label>

                      <select
                        className="border border-1 rounded-lg p-2 w-1/3"
                        defaultValue={state.defaultCate}
                        {...register("category", {
                          required: "Vui long chon tieu de ",
                          onChange: (e) => {
                            console.log(
                              "Value title selected " + e.target.value
                            );
                          },
                        })}
                      >
                        {state.categoryOptions.map((brand) => (
                          <option value={brand.key}>{brand.value}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 ">
                    <label className="font-semibold text-base mb-10">
                      {" "}
                      Description
                    </label>
                    <div>
                      <ReactQuill
                        theme="snow"
                        className="rounded-lg"
                        value={description}
                        onChange={(e) => setDescription(e)}
                        style={{
                          height: 200,
                          borderRadius: 25,
                          width: 500,
                          backgroundColor: "f0f8ff",
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <hr className="border-1 border-gray-200 mt-20" />

              <Row className="mt-10">
                <Col flex="400px" className="pl-4">
                  <div className="info-1">
                    <h2 className="font-medium  text-base">Extra detail</h2>
                    <p className="text-gray-700">Detail information</p>
                  </div>
                </Col>
                <Col flex="1">
                  {console.log("Legnth is " + details.length)}
                  <button
                    className="bg-black text-white hover:bg-gray-700 font-semibold rounded-md px-4 py-2 border border-1 border-solid rounded-md self-center mb-4"
                    onClick={addNewDetail}
                  >
                    Add
                  </button>
                  {details.map((element, index) => (
                    <div className="mb-4" key={index}>
                      <label>Name </label>
                      <input
                        className="border border-1 border-solid border-black rounded-sm ml-4 text-center"
                        type="text"
                        name="name"
                        value={element.name}
                        onChange={(e) => updateDetail(index, e)}
                      />
                      <label className="ml-4">Value</label>
                      <input
                        className="border border-1 border-solid border-black rounded-sm ml-4 text-center"
                        type="text"
                        name="value"
                        value={element.value}
                        onChange={(e) => updateDetail(index, e)}
                      />

                      {
                        <button
                          type="button"
                          className="bg-red-400 ml-4 px-2.5 py-1 rounded-md hover:text-white hover:bg-red-700"
                          onClick={() => removeDetailItem(index)}
                        >
                          Remove
                        </button>
                      }
                    </div>
                  ))}
                  {isDetailMissing && (
                    <p className="text-red-600">Chưa nhập đủ thông tin</p>
                  )}
                </Col>
              </Row>

              <hr className="border-1 border-gray-200 mt-20" />

              <Row className="mt-10">
                <Col flex="400px" className="pl-4">
                  <div className="info-1">
                    <h2 className="font-medium  text-base">Extra image</h2>
                    <p className="text-gray-700">Product Image</p>
                  </div>
                </Col>
                <Col flex="1">
                  <div className="flex align-center items-center mt-2">
                    <Image
                      src={icon_upload}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />

                    <label className="border px-4 text-white py-2 bg-primary-500 font-semibold ml-12 rounded-md hover:bg-primary-600">
                      <input
                        className="display-form"
                        multiple
                        type="file"
                        accept="image/*"
                        {...register("extraImages", {
                          required: errorCodes.PRODUCT_EXTRA_IMAGE_REQUIRED,
                          onChange: (e) => uploadMultipleImage(e.target.files),
                        })}
                      ></input>
                    </label>
                  </div>
                  <p>
                    {" "}
                    {validation.extraImages && (
                      <p className="text-red-600 mt-2">
                        {validation.extraImages || "Error"}
                      </p>
                    )}
                    {validation.limitSizeExtraImages && (
                      <p className="text-red-600 mt-2">
                        {errorCodes.IMAGE_SIZE_LIMIT}
                      </p>
                    )}
                  </p>
                  {errors.extraImages && (
                    <p className="text-red-600 mt-2">
                      {errors?.extraImages.message || "Error"}
                    </p>
                  )}
                </Col>
              </Row>

              <Row className="mt-4">
                <div className="grid gap-6 grid-cols-3 place-items-center">
                  {images.map((image, index) => (
                    <div className="image-wrapper h-48 w-48">
                      <img src={image.url} className="w-full h-full" />
                      <span
                        className="delete-icon"
                        onClick={() => deleteImage(index)}
                      >
                        X
                      </span>
                    </div>
                  ))}
                </div>
              </Row>

              <div className="flex justify-center">
                <button
                  className="bg-black text-white hover:bg-gray-700 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-700 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
                >
                  Submit
                </button>
              </div>
            </Fragment>
          </form>
        )}
      </div>
    );
}

AddProduct.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AddProduct;
