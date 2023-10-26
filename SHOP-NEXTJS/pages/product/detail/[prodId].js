import ProductTab from "@/components/Tabs/ProductTab";
import SpinTip from "@/components/loading/SpinTip";
import CustomerLayout from "@/layouts/CustomerLayout";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CartContext from "@/context/CartContext";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { toast } from "react-toastify";
import DataContext, { getAllProduct, getProductDetail } from "@/context/DataContext";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import { StarIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
const DynamicComponent = dynamic(
  () => import("../../../components/Slider/Slide"),
  {
    ssr: false,
  }
);

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
  const router = useRouter();
  const { prodId } = router.query;


  const {productDetail, getProductDetail} = useContext(DataContext);



  useEffect(() => {
    if (prodId) {
      getProductDetail(prodId);
    }
  }, [prodId]);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  const images =
    productDetail && productDetail.images.map((image) => image.imageProduct);

  const [activeIndex, setActiveIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const { addItemToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  
  const { data: session } = useSession()
  const token = session?.accessToken;

  const syncActiveIndex = ({ e }) => {
    setActiveIndex(e);
  };

  const items =
    productDetail &&
    images.map((image, index) => {
      return (
        <Image
        key={index}
          src={image}
          width={100}
          height={100}
          // key={image.id}
          suppressHydrationWarning
        />
      );
    });

  const addToCart = () => {
    console.log("User is " + user);
    if (!token) {
      toast.error("Vui lòng đăng nhập để mua sản phẩm");
      return;
    }
    addItemToCart({ productId: productDetail.id, quantity: quantity });
  };

  const breadcrumbs = productDetail && [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: productDetail.category.name, href: "/shop" },
  ];

  return (
    <div className="border-t-2 border-primary-200">
      {productDetail ? (
        <>
          <div className="bg-white">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center">
                        <a
                          href={breadcrumb.href}
                          className="mr-2 text-sm font-medium text-gray-900"
                        >
                          {breadcrumb.name}
                        </a>
                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 w-4 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  ))}
                  <li className="text-sm">
                    <a
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      {productDetail.name}
                    </a>
                  </li>
                </ol>
              </nav>

              <section className="grid gird-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
                <div className="flex flex-col items-center">
                  <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                    <Image
                      src={productDetail.primaryImage}
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="flex space-x-5 flex-wrap justify-center">
                    {productDetail.images.map((image, index) => (
                      <div className="overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4 " key={index}>
                        <Image
                          src={image.imageProduct}
                          width={100}
                          height={100}
                          // className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-4xl lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {productDetail.name.toUpperCase()}
                    </h1>
                  </div>

                  {/* Options */}
                  <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>
                    <div className="text-xl tracking-tight text-gray-900">
                      <h2 className="font-bold font-md text-md mt-2">
                        <span className="text-red-500">
                          {(
                            productDetail.original_price -
                            productDetail.discount_percent *
                              productDetail.original_price
                          ).toFixed(2)}
                          $
                        </span>
                        <span className="ml-4 text-gray-500 line-through">
                          {productDetail.original_price.toFixed(2)}$
                        </span>
                        <button className="ml-4 text-gray-500 bg-black text-white px-2 py-1 rounded-md">
                          -{productDetail.discount_percent}%
                        </button>
                      </h2>
                    </div>
                    <h2 className="text-blue-500 text-xl font-extralight text-md mt-2">
                      Category : {productDetail.category.name}
                    </h2>

                    {/* Reviews */}
                    <div className="mt-6">
                      <h3 className="sr-only">Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                reviews.average > rating
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {/* {reviews.average}  */}
                          out of 5 stars
                        </p>
                        <a
                          href={reviews.href}
                          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {reviews.totalCount} reviews
                        </a>
                      </div>
                    </div>

                    <div className="font-extraligh text-lg mt-4 flex items-center">
                      <p className="block opacity-70">Available: </p>
                      <p className="text-green-600 ml-2">
                        {" "}
                        {productDetail.inStock
                          ? " In stock "
                          : "Out of stock"}{" "}
                      </p>
                      <p className="text-green-600 ml-2">
                        {productDetail.inStock ? (
                          <CheckOutlined />
                        ) : (
                          <MinusOutlined />
                        )}
                      </p>
                    </div>
                    <div className="text-lg mt-4 flex items-center space-x-4 mt-2 opacity-70">
                      <p>Quantity :</p>

                      <button
                        onClick={() => {
                          quantity == 1
                            ? toast.error("Chọn ít nhất 1 sản phẩm ")
                            : setQuantity(quantity - 1);
                        }}
                      >
                        <RemoveCircleOutline />
                      </button>
                      <span className="py-1 px-7 border rounded-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => {
                          quantity == 5
                            ? toast.error("Tối đa chọn 5 sản phẩm ")
                            : setQuantity(quantity + 1);
                        }}
                      >
                        <AddCircleOutline />
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={addToCart}
                    >
                      Add to bag
                    </button>
                  </div>

                  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* Description and details */}
                    <div>
                      <h3 className="sr-only">Description</h3>

                      <div className="space-y-6">
                        <p className="text-base text-gray-900">
                          {/* {product.description} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="pl-8 pr-8">
            <ProductTab data={productDetail} />
          </div>
        </>
      ) : (
        <SpinTip />
      )}
    </div>
  );
};

ProductDetail.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductDetail;
