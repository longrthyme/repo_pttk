import AdminLayout from "@/layouts/AdminLayout";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Col, Input, InputNumber, Row, Spin, Switch } from "antd";
import { Select } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import DataContext from "@/context/DataContext";
import { API_URL } from "@/config";
import { toast } from "react-toastify";
import router from "next/router";
import SpinTip from "@/components/loading/SpinTip";
import icon_upload from "../../../public/images/logo_upload.png";
import { useSession } from "next-auth/react";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <h5>Loading ...</h5>,
});

function UpdateProduct(props) {
  const [state, setState] = useState({
    imagePreview: null,
    brandOptions: [],
    categoryOptions: [],
    defaultCate: "",
    defaultBrand: "",
    isLoading: true,
    imageData: null,
  });

  const router = useRouter();

  // const [pathName, setPathName] = useState(router.asPath);

  const { listBrands, listCates, getProductAdmin, adminProducts } =
    useContext(DataContext);

  const [images, setImages] = useState([]);
  const [extraImage, setExtraImage] = useState([]);
  const [product, setProduct] = useState(null);

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login");
    },
  });
  const token = session?.accessToken;

  useEffect(() => {
    /**
     *  get productId updating, handle fetching cates and brands from DataContext
     * trường hợp reload chưa kịp lấy cate và brand
     */

    const brandOpts =
      listBrands &&
      listBrands.map((brand) => ({
        value: brand.id,
        label: brand.name,
      }));

    const cateOpts = listCates.map((cate) => ({
      value: cate.id,
      label: cate.name,
    }));

    if (
      listBrands.length > 0 &&
      listCates.length > 0 &&
      adminProducts.length > 0 &&
      router.query.productId != null
    ) {
      let existedProduct = adminProducts.find(
        (prod) => prod.id == router.query.productId
      );

      setProduct(existedProduct);

      let valueBrand = listBrands.find(
        (brand) => brand.id == existedProduct.brand.id
      ).name;
      let valueCate = listCates.find(
        (cate) => cate.id == existedProduct.category.id
      ).name;

      filterCate(existedProduct.brand.id);

      setState((prevState) => ({
        ...prevState,
        brandOptions: brandOpts,
        defaultBrand: valueBrand, // selected
        defaultCate: valueCate,
        imagePreview: existedProduct.primaryImage,
        isLoading: false,
      }));
    }
  }, [listBrands, listCates, adminProducts, router.query.productId]); // 3 deps

  // up extra images
  const changeImage = (e) => {
    const files = e.target.files;
    // extraImage = files;
    setExtraImage(files);

    for (let i = 0; i < files.length; i++) {
      setImages((prevImage) => [
        ...prevImage,
        {
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
        },
      ]);
    }
  };

  // filter category followed by brand
  const filterCate = async (e) => {
    const response = await fetch(`${API_URL}/brands/categories/${e}`);

    const categories = await response.json();
    if (!response.ok) {
      toast.error("Lỗi lấy danh mục theo nhãn hàng");
      return;
    }
    const cateOpts = categories.map((cate) => ({
      value: cate.id,
      label: cate.name,
    }));

    setState((prevState) => ({
      // sử dụng cú pháp này trường hợp setState của useEffect phía trên chưa kịp cập nhật giá trị của isLoading prop
      ...prevState,
      categoryOptions: cateOpts,
    }));
  };

  const updateDetail = (i, e) => {
    let newFormValues = [...product.details];
    newFormValues[i][e.target.name] = e.target.value;
    setProduct({ ...product, details: newFormValues });
  };

  // add new detail
  const addNewDetail = () => {
    console.log("Product value is " + JSON.stringify(product));
    setProduct({
      ...product,
      details: [...product.details, { id: null, name: "", value: "" }],
    });
  };

  const removeDetailItem = (index) => {
    let updateDetail = [...product.details];
    updateDetail.splice(index, 1);
    setProduct({ ...product, details: updateDetail });
  };

  const setPrimaryImage = (e) => {
    setState({
      ...state,
      primaryImagePrev: URL.createObjectURL(e.target.files[0]),
      primaryImage: e.target.files[0],
    });
  };

  // upload product
  const updateProduct = async () => {
    let payload = {};

    setState({ ...state, isLoading: true });

    const formData = new FormData();

    const updatedProduct = {
      ...product,
      category: product.category.id,
      brand: product.brand.id,
    };

    const json = JSON.stringify(updatedProduct);
    const blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("product", blob);

    if (state.primaryImage) formData.append("primaryImage", state.primaryImage);

    if (images) {
      for (let i = 0; i < extraImage.length; i++) {
        formData.append("extraImage", extraImage[i]);
      }
    }

    // ver
    const resPut = await fetch(
      `${API_URL}/products/${router.query.productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const dataPut = await resPut.json();

    if (!resPut.ok) {
      toast.error(dataPut.message);
    } else {
      router.push("/admin/product-manage");
      getProductAdmin();
      toast.success("Cập nhật  sản phẩm thành công");
    }

    setState({ ...state, isLoading: false });
  };

  if (status === "loading") {
    return <SpinTip />;
  } else
    return (
      <div className="p-10 border-2 border-solid">
        {state.isLoading ? (
          <SpinTip />
        ) : (
          <>
            <Row className="">
              <Col flex="400px" className="pl-4">
                <div className="info-1">
                  <h2 className="font-medium  text-base">About</h2>
                  <p className="text-gray-700">Basic product information</p>
                  {state.primaryImagePrev ? (
                    <img
                      src={state.primaryImagePrev}
                      alt="primary-image"
                      width={150}
                      height={150}
                    />
                  ) : (
                    <img
                      src={product.primaryImage}
                      alt="primary-image"
                      width={150}
                      height={150}
                    />
                  )}
                </div>
              </Col>
              <Col flex="1">
                <div className="flex flex-col">
                  <label className="font-semibold text-base">
                    Tên sản phẩm *
                  </label>
                  <input
                    type="text"
                    className="p-1.5 border-2 border-solid required:border-red-500 focus:border-black rounded-md justify-center hover:border-purple-400 mt-2"
                    placeholder="Nhập tên sản phẩm"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex mt-2">
                  <div className="flex flex-col ">
                    <label className="font-semibold text-base mt-3">
                      Discount
                    </label>
                    <InputNumber
                      style={{
                        width: 200,
                        marginTop: 4,
                      }}
                      defaultValue="0"
                      min="0"
                      max="1"
                      step="0.1"
                      value={product.discount_percent}
                      onChange={(e) =>
                        setProduct({ ...product, discount_percent: e })
                      }
                      stringMode
                    />
                  </div>

                  <div className="flex flex-col ml-8 text-base">
                    <label className="font-medium mt-3">Price </label>
                    <InputNumber
                      style={{
                        width: 200,
                        marginTop: 4,
                      }}
                      defaultValue="1.0"
                      value={product.original_price}
                      min="1.0"
                      max=""
                      step="1.0"
                      onChange={(e) =>
                        setProduct({ ...product, original_price: e })
                      }
                      stringMode
                    />
                  </div>
                </div>

                <div className="flex align-center items-cente mt-2 text-base">
                  <div className="flex flex-col">
                    <label className="font-medium mt-3">Quantity </label>
                    <InputNumber
                      style={{
                        width: 200,
                        marginTop: 4,
                      }}
                      defaultValue="1"
                      min="1"
                      max="1000000"
                      step="1"
                      value={product.productQuantity}
                      onChange={(e) =>
                        setProduct({ ...product, productQuantity: e })
                      }
                      stringMode
                    />
                  </div>

                  <div className="flex flex-col mt-6 ml-8">
                    <label className="font-medium"> In Stock </label>
                    <Switch
                      className="w-4"
                      defaultChecked
                      checked={product.inStock}
                      onClick={() =>
                        setProduct({ ...product, inStock: !product.inStock })
                      }
                    />
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
                    Upload
                    <Input
                      hidden
                      className="w-1/3 ml-8"
                      tabIndex={"-1"}
                      type="file"
                      accept="image/png,image/jpg,image/jpeg"
                      multiple
                      encType="multipart/form-data"
                      autoComplete="off"
                      // style={{ display: "none" }}
                      required={true}
                      onChange={(e) => setPrimaryImage(e)}
                    />
                  </label>
                </div>
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
                    <Select
                      defaultValue={state.defaultBrand}
                      style={
                        {
                          // width: 120,
                        }
                      }
                      onChange={filterCate}
                      options={state.brandOptions}
                      disabled
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold  mt-3">Category </label>

                    <select
                      className="mt-2 border-2 border-solid p-1 px-4 py-2 rounded-lg hover:border-purple-100"
                      onChange={(e) =>
                        setProduct({ ...product, category: e.target.value })
                      }
                    >
                      {state.categoryOptions.map((category, index) => {
                        return (
                          <option key={index} value={category.value}>
                            {category.label}
                          </option>
                        );
                      })}
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
                      value={product.description}
                      onChange={(e) =>
                        setProduct({ ...product, description: e })
                      }
                      style={{
                        height: 200,
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
                <button
                  className="bg-black text-white px-4 py-1 rounded-md mb-4 hover:bg-blue-500"
                  onClick={addNewDetail}
                >
                  {" "}
                  Add{" "}
                </button>
                {product.details.map((element, index) => (
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

                    {index ? (
                      <button
                        type="button"
                        className="bg-red-400 ml-4 px-2.5 py-1 rounded-md hover:text-white hover:bg-red-700"
                        onClick={() => removeDetailItem(index)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                ))}
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
                    width={100}
                    height={100}
                    className="rounded-full"
                  />

                  <label className="border px-4 text-white py-2 bg-primary-500 font-semibold ml-12 rounded-md hover:bg-primary-600">
                    Upload image
                    <Input
                      hidden
                      className="w-1/3 ml-8"
                      tabIndex={"-1"}
                      type="file"
                      accept="image/png,image/jpg,image/jpeg"
                      encType="multipart/form-data"
                      multiple
                      autoComplete="off"
                      // style={{ display: "none" }}
                      required={true}
                      onChange={(e) => changeImage(e)}
                    />
                  </label>
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <div className="grid gap-4 grid-cols-3 place-items-center">
                {product.images.map((image, index) => (
                  <div className="image-wrapper h-48 w-48">
                    <img src={image.imageProduct} className="w-full h-full" />
                    <span
                      className="delete-icon"
                      // onClick={() => deleteImage(index)}
                    >
                      X
                    </span>
                  </div>
                ))}
                {images &&
                  images.map((image) => (
                    <div className="image-wrapper h-48 w-48">
                      <img src={image.url} className="w-full h-full" />

                      <span
                        className="delete-icon"
                        // onClick={() => deleteImage(index)}
                      >
                        X
                      </span>
                    </div>
                  ))}
              </div>
            </Row>

            <div className="flex justify-center">
              <button
                className="bg-black text-white hover:bg-primary-700 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center mr-10"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white hover:bg-primary-700 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center"
                onClick={() => updateProduct()}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    );
}

UpdateProduct.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default UpdateProduct;
