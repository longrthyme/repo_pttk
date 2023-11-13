import { useContext, useEffect, useState } from "react";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useFilterContext } from "@/context/FilterContext";
import { Input } from "antd";
import DataContext from "@/context/DataContext";

import ProductCard from "@/components/Product/ProductCard";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Shop() {
  const { filter_products } = useFilterContext();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { listCates, listProds, listBrands, isLoading } =
    useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState(null);

  const [searchProductName, setSearchProductName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [result, setResult] = useState([]);

  let filteredItems =
    listProds &&
    listProds.filter(
      (product) =>
        product.name.toLowerCase().indexOf(searchProductName.toLowerCase()) !==
        -1
    );

  const filteredData = (listProds, selectedOption, searchProductName) => {
    let filteredProducts = listProds;

    if (searchProductName) {
      filteredProducts = filteredItems;
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.name == selectedBrand
      );
    }

    if (selectedOption) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.original_price === selectedOption ||
          product.category.name == selectedOption
      );
    }
    return filteredProducts;
  };


  useEffect(() => {
    if (listProds.length > 0) {
      setResult(
        filteredData(
          listProds,
          selectedOption,
          searchProductName,
          selectedBrand
        )
      );
    }
  }, [listProds]);

  const filterByPage = (currentPage, numOfElement) => {
    setResult(result.slice(currentPage * numOfElement - numOfElement));
  };

  console.log("Dnh sach ket qua product", JSON.stringify(result));

  console.log("Value filterprods", JSON.stringify(result));

  const handleChange = (event) => {
    console.log("Value selected is ", event.target.value);
    setSelectedOption(event.target.value);
  };

  console.log("Value cate ", JSON.stringify(listCates));

  const { Search } = Input;
  return (
    <div className="bg-white">
      <section id="wsus__breadcrumb">
        <div className="wsus_breadcrumb_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4>categories</h4>
                <ul>
                  <li>
                    <a href="#">home</a>
                  </li>
                  <li>
                    <a href="#">categories</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* start header */}
      <section className="product_popup_modal">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="far fa-times" />
                </button>
                <div className="row">
                  <div className="col-xl-6 col-12 col-sm-10 col-md-8 col-lg-6 m-auto display">
                    <div className="wsus__quick_view_img">
                      <a
                        className="venobox wsus__pro_det_video"
                        data-autoplay="true"
                        data-vbtype="video"
                        href="https://youtu.be/7m16dFI1AF8"
                      >
                        <i className="fas fa-play" />
                      </a>
                      <div className="row modal_slider">
                        <div className="col-xl-12">
                          <div className="modal_slider_img">
                            <img
                              src="images/zoom1.jpg"
                              alt="product"
                              className="img-fluid w-100"
                            />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="modal_slider_img">
                            <img
                              src="images/zoom2.jpg"
                              alt="product"
                              className="img-fluid w-100"
                            />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="modal_slider_img">
                            <img
                              src="images/zoom3.jpg"
                              alt="product"
                              className="img-fluid w-100"
                            />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="modal_slider_img">
                            <img
                              src="images/zoom4.jpg"
                              alt="product"
                              className="img-fluid w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="wsus__pro_details_text">
                      <a className="title" href="#">
                        Electronics Black Wrist Watch
                      </a>
                      <p className="wsus__stock_area">
                        <span className="in_stock">in stock</span> (167 item)
                      </p>
                      <h4>
                        $50.00 <del>$60.00</del>
                      </h4>
                      <p className="review">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        <span>20 review</span>
                      </p>
                      <p className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                      <div className="wsus_pro_hot_deals">
                        <h5>offer ending time : </h5>
                        <div className="simply-countdown simply-countdown-one" />
                      </div>
                      <div className="wsus_pro_det_color">
                        <h5>color :</h5>
                        <ul>
                          <li>
                            <a className="blue" href="#">
                              <i className="far fa-check" />
                            </a>
                          </li>
                          <li>
                            <a className="orange" href="#">
                              <i className="far fa-check" />
                            </a>
                          </li>
                          <li>
                            <a className="yellow" href="#">
                              <i className="far fa-check" />
                            </a>
                          </li>
                          <li>
                            <a className="black" href="#">
                              <i className="far fa-check" />
                            </a>
                          </li>
                          <li>
                            <a className="red" href="#">
                              <i className="far fa-check" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="wsus_pro__det_size">
                        <h5>size :</h5>
                        <ul>
                          <li>
                            <a href="#">S</a>
                          </li>
                          <li>
                            <a href="#">M</a>
                          </li>
                          <li>
                            <a href="#">L</a>
                          </li>
                          <li>
                            <a href="#">XL</a>
                          </li>
                        </ul>
                      </div>
                      <div className="wsus__quentity">
                        <h5>quentity :</h5>
                        <form className="select_number">
                          <input
                            className="number_area"
                            type="text"
                            min={1}
                            max={100}
                            defaultValue={1}
                          />
                        </form>
                        <h3>$50.00</h3>
                      </div>
                      <div className="wsus__selectbox">
                        <div className="row">
                          <div className="col-xl-6 col-sm-6">
                            <h5 className="mb-2">select:</h5>
                            <select className="select_2" name="state">
                              <option>default select</option>
                              <option>select 1</option>
                              <option>select 2</option>
                              <option>select 3</option>
                              <option>select 4</option>
                            </select>
                          </div>
                          <div className="col-xl-6 col-sm-6">
                            <h5 className="mb-2">select:</h5>
                            <select className="select_2" name="state">
                              <option>default select</option>
                              <option>select 1</option>
                              <option>select 2</option>
                              <option>select 3</option>
                              <option>select 4</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <ul className="wsus__button_area">
                        <li>
                          <a className="add_cart" href="#">
                            add to cart
                          </a>
                        </li>
                        <li>
                          <a className="buy_now" href="#">
                            buy now
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-heart" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="far fa-random" />
                          </a>
                        </li>
                      </ul>
                      <p className="brand_model">
                        <span>model :</span> 12345670
                      </p>
                      <p className="brand_model">
                        <span>brand :</span> The Northland
                      </p>
                      <div className="wsus__pro_det_share">
                        <h5>share :</h5>
                        <ul className="d-flex">
                          <li>
                            <a className="facebook" href="#">
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a className="twitter" href="#">
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a className="whatsapp" href="#">
                              <i className="fab fa-whatsapp" />
                            </a>
                          </li>
                          <li>
                            <a className="instagram" href="#">
                              <i className="fab fa-instagram" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ;{/* end header */}
      <section id="wsus__product_page">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="wsus__pro_page_bammer">
                <img
                  src="images/pro_banner_1.jpg"
                  alt="banner"
                  className="img-fluid w-100"
                />
                <div className="wsus__pro_page_bammer_text">
                  <div className="wsus__pro_page_bammer_text_center">
                    <p>
                      up to <span>70% off</span>
                    </p>
                    <h5>wemen's jeans Collection</h5>
                    <h3>fashion for wemen's</h3>
                    <a href="#" className="add_cart">
                      Discover Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="wsus__sidebar_filter ">
                <p>filter</p>
                <span className="wsus__filter_icon">
                  <i className="far fa-minus" id="minus" />
                  <i className="far fa-plus" id="plus" />
                </span>
              </div>
              <div className="wsus__product_sidebar" id="sticky_sidebar">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        All Categories
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <a href="#">Accessories</a>
                          </li>
                          <li>
                            <a href="#">Babies</a>
                          </li>
                          <li>
                            <a href="#">Babies</a>
                          </li>
                          <li>
                            <a href="#">Beauty</a>
                          </li>
                          <li>
                            <a href="#">Decoration</a>
                          </li>
                          <li>
                            <a href="#">Electronics</a>
                          </li>
                          <li>
                            <a href="#">Fashion</a>
                          </li>
                          <li>
                            <a href="#">Food</a>
                          </li>
                          <li>
                            <a href="#">Furniture</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Price
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="price_ranger">
                          <input
                            type="hidden"
                            id="slider_range"
                            className="flat-slider"
                          />
                          <button type="submit" className="common_btn">
                            filter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree2">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree2"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        size
                      </button>
                    </h2>
                    <div
                      id="collapseThree2"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree2"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            small
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckChecked"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            medium
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckChecked2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked2"
                          >
                            large
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree3">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree3"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        brand
                      </button>
                    </h2>
                    <div
                      id="collapseThree3"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree3"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckDefault11"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault11"
                          >
                            gentle park
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckChecked22"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked22"
                          >
                            colors
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckChecked222"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked222"
                          >
                            yellow
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckChecked33"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked33"
                          >
                            enice man
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckChecked333"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked333"
                          >
                            plus point
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        color
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckDefaultc1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefaultc1"
                          >
                            black
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckCheckedc2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckCheckedc2"
                          >
                            white
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckCheckedc3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckCheckedc3"
                          >
                            green
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckCheckedc4"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckCheckedc4"
                          >
                            pink
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckCheckedc5"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckCheckedc5"
                          >
                            red
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                <div className="col-xl-12 d-none d-md-block mt-md-4 mt-lg-0">
                  <div className="wsus__product_topbar">
                    <div className="wsus__product_topbar_left">
                      <div
                        className="nav nav-pills"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <button
                          className="nav-link active"
                          id="v-pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-home"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-home"
                          aria-selected="true"
                        >
                          <i className="fas fa-th" />
                        </button>
                        <button
                          className="nav-link"
                          id="v-pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-profile"
                          aria-selected="false"
                        >
                          <i className="fas fa-list-ul" />
                        </button>
                      </div>
                      <div className="wsus__topbar_select">
                        <select className="select_2" name="state">
                          <option>default shorting</option>
                          <option>short by rating</option>
                          <option>short by latest</option>
                          <option>low to high </option>
                          <option>high to low</option>
                        </select>
                      </div>
                    </div>
                    <div className="wsus__topbar_select">
                      <select className="select_2" name="state">
                        <option>show 12</option>
                        <option>show 15</option>
                        <option>show 18</option>
                        <option>show 21</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="row">
                      <h2>Length is {listProds.length}</h2>
                      {result.slice(1, 4).map(
                        (product) => (
                          //   <div className="col-xl-4 col-sm-6">
                          //   <div className="wsus__product_item">
                          //     <span className="wsus__new">New</span>
                          //     <span className="wsus__minus">-20%</span>
                          //     <a className="wsus__pro_link" href="product_details.html">
                          //       <img
                          //         src="images/headphone_1.jpg"
                          //         alt="product"
                          //         className="img-fluid w-100 img_1"
                          //       />
                          //       <img
                          //         src="images/headphone_2.jpg"
                          //         alt="product"
                          //         className="img-fluid w-100 img_2"
                          //       />
                          //     </a>
                          //     <ul className="wsus__single_pro_icon">
                          //       <li>
                          //         <a
                          //           href="#"
                          //           data-bs-toggle="modal"
                          //           data-bs-target="#exampleModal"
                          //         >
                          //           <i className="far fa-eye" />
                          //         </a>
                          //       </li>
                          //       <li>
                          //         <a href="#">
                          //           <i className="far fa-heart" />
                          //         </a>
                          //       </li>
                          //       <li>
                          //         <a href="#">
                          //           <i className="far fa-random" />
                          //         </a>
                          //       </li>
                          //     </ul>
                          //     <div className="wsus__product_details">
                          //       <a className="wsus__category" href="#">
                          //         Electronics{' '}
                          //       </a>
                          //       <p className="wsus__pro_rating">
                          //         <i className="fas fa-star" />
                          //         <i className="fas fa-star" />
                          //         <i className="fas fa-star" />
                          //         <i className="fas fa-star" />
                          //         <i className="fas fa-star-half-alt" />
                          //         <span>(120 review)</span>
                          //       </p>
                          //       <a className="wsus__pro_name" href="#">
                          //         man casual fashion cap
                          //       </a>
                          //       <p className="wsus__price">$115</p>
                          //       <a className="add_cart" href="#">
                          //         add to cart
                          //       </a>
                          //     </div>
                          //   </div>
                          // </div>
                          <ProductCard productDetails={product} />
                        )

                        // <h2>{product.discount_percent}</h2>
                      )}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div className="row">
                      {[1, 2, 3, 4, 5, 6].map((product) => (
                        <div className="col-xl-12">
                          <div className="wsus__product_item wsus__list_view">
                            <span className="wsus__minus">-20%</span>
                            <a
                              className="wsus__pro_link"
                              href="product_details.html"
                            >
                              <img
                                src="images/pro4.jpg"
                                alt="product"
                                className="img-fluid w-100 img_1"
                              />
                              <img
                                src="images/pro4_4.jpg"
                                alt="product"
                                className="img-fluid w-100 img_2"
                              />
                            </a>
                            <div className="wsus__product_details">
                              <a className="wsus__category" href="#">
                                fashion{" "}
                              </a>
                              <p className="wsus__pro_rating">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star-half-alt" />
                                <span>(17 review)</span>
                              </p>
                              <a className="wsus__pro_name" href="#">
                                men's casual fashion watch
                              </a>
                              <p className="wsus__price">
                                $159 <del>$200</del>
                              </p>
                              <p className="list_description">
                                Ultrices eros in cursus turpis massa cursus
                                mattis. Volutpat ac tincidunt vitae semper quis
                                lectus. Aliquam id diam maecenas ultricies…{" "}
                              </p>
                              <ul className="wsus__single_pro_icon">
                                <li>
                                  <a className="add_cart" href="#">
                                    add to cart
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="far fa-heart" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="far fa-random" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* start pagination */}
            <div className="col-xl-12">
              <section id="pagination">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li
                      className="page-item"
                      onClick={() => {
                        filterByPage(currentPage - 1, 2);
                      }}
                    >
                      <a className="page-link" href="#" aria-label="Previous">
                        <i className="fas fa-chevron-left" />
                      </a>
                    </li>
                    {Array(result.length / 4)
                      .fill()
                      .map((element, index) => (
                        <li className="page-item">
                          <a
                            className={`page-link ${
                              index == currentPage ? "page_active" : ""
                            }`}
                            href="#"
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                    <li
                      className="page-item"
                      onClick={() => {
                        filterByPage(currentPage + 1, 2);
                      }}
                    >
                      <a className="page-link" href="#" aria-label="Next">
                        <i className="fas fa-chevron-right" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </section>
      ;
    </div>
  );
}
Shop.getLayout = (page) => <CustomerLayout children={page} />;
