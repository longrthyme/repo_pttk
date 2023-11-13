import ProductCard from "@/components/Product/ProductCard";
import DataContext from "@/context/DataContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useContext, useEffect, useState } from "react";
import SpinTip from "@/components/loading/SpinTip";
import { toast } from "react-toastify";
import { API_URL, NEXT_API } from "@/config";
import { signOut, useSession } from "next-auth/react";
import Slider from "react-slick";
import { useRouter } from "next/router";
const style = {
  background: "#0092ff",
  padding: "8px 0",
};
function Home(props) {
  const [bestSeller, setBestSeller] = useState(null);

  const { listProds, getBestSellerProducts, bestSellerProducts } =
    useContext(DataContext);

  useEffect(() => {
    getBestSellerProducts();
  }, []);

  const { data: session, status } = useSession();
  const role = session?.role;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const bestSellerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div>
      <nav class="wsus__main_menu d-none d-lg-block">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="relative_contect d-flex">
                <div class="wsus_menu_category_bar">
                  <i class="far fa-bars"></i>
                </div>
                <ul class="wsus_menu_cat_item show_home toggle_menu">
                  <li>
                    <a href="#">
                      <i class="fas fa-star"></i> hot promotions
                    </a>
                  </li>
                  <li>
                    <a class="wsus__droap_arrow" href="#">
                      <i class="fal fa-tshirt"></i> Fashion{" "}
                    </a>
                    <ul class="wsus_menu_cat_droapdown">
                      <li>
                        <a href="#">
                          New Arrivals <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Best Sellers</a>
                      </li>
                      <li>
                        <a href="#">
                          Trending <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Clothing</a>
                      </li>
                      <li>
                        <a href="#">Bags</a>
                      </li>
                      <li>
                        <a href="#">Home Audio & Theaters</a>
                      </li>
                      <li>
                        <a href="#">TV & Videos</a>
                      </li>
                      <li>
                        <a href="#">Camera</a>
                      </li>
                      <li>
                        <a href="#">
                          Photos & Videos <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a class="wsus__droap_arrow" href="#">
                      <i class="fas fa-tv"></i> Electronics
                    </a>
                    <ul class="wsus_menu_cat_droapdown">
                      <li>
                        <a href="#">
                          New Arrivals <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Best Sellers</a>
                      </li>
                      <li>
                        <a href="#">
                          Trending <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Clothing</a>
                      </li>
                      <li>
                        <a href="#">Bags</a>
                      </li>
                      <li>
                        <a href="#">Home Audio & Theaters</a>
                      </li>
                      <li>
                        <a href="#">TV & Videos</a>
                      </li>
                      <li>
                        <a href="#">Camera</a>
                      </li>
                      <li>
                        <a href="#">
                          Photos & Videos <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a class="wsus__droap_arrow" href="#">
                      <i class="fas fa-chair-office"></i> Furniture
                    </a>
                    <ul class="wsus_menu_cat_droapdown">
                      <li>
                        <a href="#">
                          New Arrivals <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Best Sellers</a>
                      </li>
                      <li>
                        <a href="#">
                          Trending <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Clothing</a>
                      </li>
                      <li>
                        <a href="#">Bags</a>
                      </li>
                      <li>
                        <a href="#">Home Audio & Theaters</a>
                      </li>
                      <li>
                        <a href="#">TV & Videos</a>
                      </li>
                      <li>
                        <a href="#">Camera</a>
                      </li>
                      <li>
                        <a href="#">
                          Photos & Videos <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a class="wsus__droap_arrow" href="#">
                      <i class="fal fa-mobile"></i> Smart Phones
                    </a>
                    <ul class="wsus_menu_cat_droapdown">
                      <li>
                        <a href="#">
                          New Arrivals <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Best Sellers</a>
                      </li>
                      <li>
                        <a href="#">
                          Trending <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Clothing</a>
                      </li>
                      <li>
                        <a href="#">Bags</a>
                      </li>
                      <li>
                        <a href="#">Home Audio & Theaters</a>
                      </li>
                      <li>
                        <a href="#">TV & Videos</a>
                      </li>
                      <li>
                        <a href="#">Camera</a>
                      </li>
                      <li>
                        <a href="#">
                          Photos & Videos <i class="fas fa-angle-right"></i>
                        </a>
                        <ul class="wsus__sub_category">
                          <li>
                            <a href="#">New Arrivals</a>{" "}
                          </li>
                          <li>
                            <a href="#">Best Sellers</a>
                          </li>
                          <li>
                            <a href="#">Trending</a>
                          </li>
                          <li>
                            <a href="#">Clothing</a>
                          </li>
                          <li>
                            <a href="#">Bags</a>
                          </li>
                          <li>
                            <a href="#">Home Audio & Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV & Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos & Videos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fas fa-home-lg-alt"></i> Home & Garden
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="far fa-camera"></i> Accessories
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fas fa-heartbeat"></i> Healthy & Beauty
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fal fa-gift-card"></i> Gift Ideas
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fal fa-gamepad-alt"></i> Toy & Games
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fal fa-gem"></i> View All Categories
                    </a>
                  </li>
                </ul>

                <ul class="wsus__menu_item">
                  <li>
                    <a class="active" href="index.html">
                      home
                    </a>
                  </li>
                  <li>
                    <a href="product_grid_view.html">
                      shop <i class="fas fa-caret-down"></i>
                    </a>
                    <div class="wsus__mega_menu">
                      <div class="row">
                        <div class="col-xl-3 col-lg-3">
                          <div class="wsus__mega_menu_colum">
                            <h4>women</h4>
                            <ul class="wsis__mega_menu_item">
                              <li>
                                <a href="#">New Arrivals</a>
                              </li>
                              <li>
                                <a href="#">Best Sellers</a>
                              </li>
                              <li>
                                <a href="#">Trending</a>
                              </li>
                              <li>
                                <a href="#">Clothing</a>
                              </li>
                              <li>
                                <a href="#">Shoes</a>
                              </li>
                              <li>
                                <a href="#">Bags</a>
                              </li>
                              <li>
                                <a href="#">Accessories</a>
                              </li>
                              <li>
                                <a href="#">Jewlery & Watches</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-xl-3 col-lg-3">
                          <div class="wsus__mega_menu_colum">
                            <h4>men</h4>
                            <ul class="wsis__mega_menu_item">
                              <li>
                                <a href="#">New Arrivals</a>
                              </li>
                              <li>
                                <a href="#">Best Sellers</a>
                              </li>
                              <li>
                                <a href="#">Trending</a>
                              </li>
                              <li>
                                <a href="#">Clothing</a>
                              </li>
                              <li>
                                <a href="#">Shoes</a>
                              </li>
                              <li>
                                <a href="#">Bags</a>
                              </li>
                              <li>
                                <a href="#">Accessories</a>
                              </li>
                              <li>
                                <a href="#">Jewlery & Watches</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-xl-3 col-lg-3">
                          <div class="wsus__mega_menu_colum">
                            <h4>category</h4>
                            <ul class="wsis__mega_menu_item">
                              <li>
                                <a href="#"> Healthy & Beauty</a>
                              </li>
                              <li>
                                <a href="#">Gift Ideas</a>
                              </li>
                              <li>
                                <a href="#">Toy & Games</a>
                              </li>
                              <li>
                                <a href="#">Cooking</a>
                              </li>
                              <li>
                                <a href="#">Smart Phones</a>
                              </li>
                              <li>
                                <a href="#">Cameras & Photo</a>
                              </li>
                              <li>
                                <a href="#">Accessories</a>
                              </li>
                              <li>
                                <a href="#">View All Categories</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-xl-3 col-lg-3">
                          <div class="wsus__mega_menu_colum">
                            <h4>women</h4>
                            <ul class="wsis__mega_menu_item">
                              <li>
                                <a href="#">New Arrivals</a>
                              </li>
                              <li>
                                <a href="#">Best Sellers</a>
                              </li>
                              <li>
                                <a href="#">Trending</a>
                              </li>
                              <li>
                                <a href="#">Clothing</a>
                              </li>
                              <li>
                                <a href="#">Shoes</a>
                              </li>
                              <li>
                                <a href="#">Bags</a>
                              </li>
                              <li>
                                <a href="#">Accessories</a>
                              </li>
                              <li>
                                <a href="#">Jewlery & Watches</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul class="wsus__menu_item wsus__menu_item_right">
                  {session?.role != "CUSTOMER" && (
                    <li>
                      <a href="/admin/dashboard">Dashboard</a>
                    </li>
                  )}

                  {session?.role == "CUSTOMER" && (
                    <li>
                      <a href="/account">my account</a>
                    </li>
                  )}
                  {!session && (
                    <li>
                      <a href="/account/login">login</a>
                    </li>
                  )}

                  {session && (
                    <li>
                      {" "}
                      <a
                        href="#"
                        onClick={() =>
                          signOut({
                            callbackUrl: `${window.location.origin}/account/login`,
                          })
                        }
                      >
                        Logout
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

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

      <div className="p-8 color-black">
        <Slider {...settings}>
          <div>
            <div className="col-xl-12">
              <div
                className="wsus__single_slider"
                style={{ background: "url(images/slider_1.jpg)" }}
              >
                <div className="wsus__single_slider_text">
                  <h3>new arrivals</h3>
                  <h1>men's fashion</h1>
                  <h6>start at $99.00</h6>
                  <a className="common_btn" href="#">
                    shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="col-xl-12">
              <div
                className="wsus__single_slider"
                style={{ background: "url(images/slider_3.jpg)" }}
              >
                <div className="wsus__single_slider_text">
                  <h3>new arrivals</h3>
                  <h1>winter collection</h1>
                  <h6>start at $99</h6>
                  <a className="common_btn" href="#">
                    shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="col-xl-12">
              <div
                className="wsus__single_slider"
                style={{ background: "url(images/slider_2.jpg)" }}
              >
                <div className="wsus__single_slider_text">
                  <h3>new arrivals</h3>
                  <h1>kid's fashion</h1>
                  <h6>start at $49.00</h6>
                  <a className="common_btn" href="#">
                    shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      <section id="wsus__flash_sell" className="wsus__flash_sell_2">
        <div className=" container">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="offer_time"
                style={{ background: "url(images/flash_sell_bg.jpg)" }}
              >
                <div className="wsus__flash_coundown">
                  <span className=" end_text">Products</span>
                  <div className="simply-countdown simply-countdown-one" />
                  <a className="common_btn" href="#">
                    see more <i className="fas fa-caret-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row flash_sell_slider">
            {listProds.length > 0 ? (
              listProds.map((product) => (
                <ProductCard productDetails={product} />
              ))
            ) : (
              <SpinTip />
            )}
          </div>
        </div>
      </section>
      <section id="wsus__monthly_top" className="wsus__monthly_top_2">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="wsus__monthly_top_banner">
                <div className="wsus__monthly_top_banner_img">
                  <img
                    src="images/monthly_top_img3.jpg"
                    alt="img"
                    className="img-fluid w-100"
                  />
                  <span />
                </div>
                <div className="wsus__monthly_top_banner_text">
                  <h4>Black Friday Sale</h4>
                  <h3>
                    Up To <span>70% Off</span>
                  </h3>
                  <h6>Everything</h6>
                  <a className="shop_btn" href="#">
                    shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="wsus__section_header for_md">
                <h3>Top Best seller product Of The Month</h3>
              </div>

              <div className="m-20 row flash_sell_slider">
                <Slider {...bestSellerSettings}>
                  {bestSellerProducts.length > 0 &&
                    bestSellerProducts.map((product) => (
                      <ProductCard productDetails={product} />
                    ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="wsus__home_services" className="home_service_2">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-lg-3 pe-lg-0">
              <div className="wsus__home_services_single home_service_single_2 border_left">
                <i className="fas fa-truck" />
                <h5>Free Worldwide Shipping</h5>
                <p>Free shipping coast for all country</p>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-lg-3 pe-lg-0">
              <div className="wsus__home_services_single home_service_single_2">
                <i className="fas fa-headset" />
                <h5>24/7 Customer Support</h5>
                <p>Friendly 24/7 customer support</p>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-lg-3 pe-lg-0">
              <div className="wsus__home_services_single home_service_single_2">
                <i className="fas fa-exchange-alt" />
                <h5>Money Back Guarantee</h5>
                <p>We return money within 30 days</p>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-lg-3">
              <div className="wsus__home_services_single home_service_single_2">
                <i className="fas fa-credit-card" />
                <h5>Secure Online Payment</h5>
                <p>We posess SSL / Secure Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;
