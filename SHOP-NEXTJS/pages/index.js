import ProductCard from "@/components/Product/ProductCard";
import DataContext from "@/context/DataContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useContext, useEffect, useState } from "react";
import SpinTip from "@/components/loading/SpinTip";
import { toast } from "react-toastify";
import { API_URL, NEXT_API } from "@/config";
import { signOut, useSession } from "next-auth/react";
const style = {
  background: "#0092ff",
  padding: "8px 0",
};
function Home(props) {
  const [bestSeller, setBestSeller] = useState(null);

  const { listProds } = useContext(DataContext);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}/products/best-seller`, {
        method: "GET",
      });

      const data = await response.json();

      console.log("Ds products seller  " + JSON.stringify(data));

      if (!response.ok) {
        toast.error(data.message);
      } else {
        setBestSeller(data);
      }
      setLoading(false);
    })();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const { data: session } = useSession();
  const token = session?.accessToken;


  // handle logout
  async function handleLogout() {
    console.log("Da vao logout nek");

    const response = await fetch(`${NEXT_API}/api/auth/logout/logout`, {
      method: "POST",
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Logout success");
    }
    else {
      toast.error("Failure");
    }

    
  }

  const syncActiveIndex = ({ e }) => {
    setActiveIndex(e);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  console.log("List prods is " + JSON.stringify(listProds));

  return (
    <div>
      {/*============================
        HEADER END
    ==============================*/}
      {/*============================
        MAIN MENU START
    ==============================*/}
      <nav className="wsus__main_menu d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="relative_contect d-flex">
                <div className="wsus_menu_category_bar">
                  <i className="far fa-bars" />
                </div>
                <ul className="wsus_menu_cat_item show_home toggle_menu">
                  <li>
                    <a href="#">
                      <i className="fas fa-star" /> hot promotions
                    </a>
                  </li>
                  <li>
                    <a className="wsus__droap_arrow" href="#">
                      <i className="fal fa-tshirt" /> Fashion{" "}
                    </a>
                    <ul className="wsus_menu_cat_droapdown">
                      <li>
                        <a href="#">
                          New Arrivals <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Best Sellers</a>
                      </li>
                      <li>
                        <a href="#">
                          Trending <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
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
                        <a href="#">Home Audio &amp; Theaters</a>
                      </li>
                      <li>
                        <a href="#">TV &amp; Videos</a>
                      </li>
                      <li>
                        <a href="#">Camera</a>
                      </li>
                      <li>
                        <a href="#">
                          Photos &amp; Videos{" "}
                          <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="wsus__droap_arrow" href="#">
                      <i className="fas fa-tv" /> Electronics
                    </a>
                    <ul className="wsus_menu_cat_droapdown">
                      <li>
                        <a href="#">
                          New Arrivals <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Best Sellers</a>
                      </li>
                      <li>
                        <a href="#">
                          Trending <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
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
                        <a href="#">Home Audio &amp; Theaters</a>
                      </li>
                      <li>
                        <a href="#">TV &amp; Videos</a>
                      </li>
                      <li>
                        <a href="#">Camera</a>
                      </li>
                      <li>
                        <a href="#">
                          Photos &amp; Videos{" "}
                          <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="wsus__droap_arrow" href="#">
                      <i className="fas fa-chair-office" /> Furniture
                    </a>
                    <ul className="wsus_menu_cat_droapdown">
                      <li>
                        <a href="#">
                          New Arrivals <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Best Sellers</a>
                      </li>
                      <li>
                        <a href="#">
                          Trending <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
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
                        <a href="#">Home Audio &amp; Theaters</a>
                      </li>
                      <li>
                        <a href="#">TV &amp; Videos</a>
                      </li>
                      <li>
                        <a href="#">Camera</a>
                      </li>
                      <li>
                        <a href="#">
                          Photos &amp; Videos{" "}
                          <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="wsus__droap_arrow" href="#">
                      <i className="fal fa-mobile" /> Smart Phones
                    </a>
                    <ul className="wsus_menu_cat_droapdown">
                      <li>
                        <a href="#">
                          New Arrivals <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Best Sellers</a>
                      </li>
                      <li>
                        <a href="#">
                          Trending <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
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
                        <a href="#">Home Audio &amp; Theaters</a>
                      </li>
                      <li>
                        <a href="#">TV &amp; Videos</a>
                      </li>
                      <li>
                        <a href="#">Camera</a>
                      </li>
                      <li>
                        <a href="#">
                          Photos &amp; Videos{" "}
                          <i className="fas fa-angle-right" />
                        </a>
                        <ul className="wsus__sub_category">
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
                            <a href="#">Home Audio &amp; Theaters</a>
                          </li>
                          <li>
                            <a href="#">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#">Camera</a>
                          </li>
                          <li>
                            <a href="#">Photos &amp; Videos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-home-lg-alt" /> Home &amp; Garden
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="far fa-camera" /> Accessories
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-heartbeat" /> Healthy &amp; Beauty
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-gift-card" /> Gift Ideas
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-gamepad-alt" /> Toy &amp; Games
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-gem" /> View All Categories
                    </a>
                  </li>
                </ul>
                <ul className="wsus__menu_item">
                  <li>
                    <a className="active" href="index.html">
                      home
                    </a>
                  </li>
                  <li>
                    <a href="product_grid_view.html">
                      shop <i className="fas fa-caret-down" />
                    </a>
                    <div className="wsus__mega_menu">
                      <div className="row">
                        <div className="col-xl-3 col-lg-3">
                          <div className="wsus__mega_menu_colum">
                            <h4>women</h4>
                            <ul className="wsis__mega_menu_item">
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
                                <a href="#">Jewlery &amp; Watches</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3">
                          <div className="wsus__mega_menu_colum">
                            <h4>men</h4>
                            <ul className="wsis__mega_menu_item">
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
                                <a href="#">Jewlery &amp; Watches</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3">
                          <div className="wsus__mega_menu_colum">
                            <h4>category</h4>
                            <ul className="wsis__mega_menu_item">
                              <li>
                                <a href="#"> Healthy &amp; Beauty</a>
                              </li>
                              <li>
                                <a href="#">Gift Ideas</a>
                              </li>
                              <li>
                                <a href="#">Toy &amp; Games</a>
                              </li>
                              <li>
                                <a href="#">Cooking</a>
                              </li>
                              <li>
                                <a href="#">Smart Phones</a>
                              </li>
                              <li>
                                <a href="#">Cameras &amp; Photo</a>
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
                        <div className="col-xl-3 col-lg-3">
                          <div className="wsus__mega_menu_colum">
                            <h4>women</h4>
                            <ul className="wsis__mega_menu_item">
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
                                <a href="#">Jewlery &amp; Watches</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="vendor.html">vendor</a>
                  </li>
                  <li>
                    <a href="blog.html">blog</a>
                  </li>
                  <li>
                    <a href="daily_deals.html">campain</a>
                  </li>
                  <li className="wsus__relative_li">
                    <a href="#">
                      pages <i className="fas fa-caret-down" />
                    </a>
                    <ul className="wsus__menu_droapdown">
                      <li>
                        <a href="404.html">404</a>
                      </li>
                      <li>
                        <a href="faqs.html">faq</a>
                      </li>
                      <li>
                        <a href="invoice.html">invoice</a>
                      </li>
                      <li>
                        <a href="about_us.html">about</a>
                      </li>
                      <li>
                        <a href="product_grid_view.html">product</a>
                      </li>
                      <li>
                        <a href="check_out.html">check out</a>
                      </li>
                      <li>
                        <a href="team.html">team</a>
                      </li>
                      <li>
                        <a href="change_password.html">change password</a>
                      </li>
                      <li>
                        <a href="custom_page.html">custom page</a>
                      </li>
                      <li>
                        <a href="forget_password.html">forget password</a>
                      </li>
                      <li>
                        <a href="privacy_policy.html">privacy policy</a>
                      </li>
                      <li>
                        <a href="product_category.html">product category</a>
                      </li>
                      <li>
                        <a href="brands.html">brands</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="track_order.html">track order</a>
                  </li>
                  <li>
                    <a href="daily_deals.html">daily deals</a>
                  </li>
                </ul>
                {/* {
                  !session ?  <ul className="wsus__menu_item wsus__menu_item_right">
                  <li><a href="contact">contact</a></li>
                  <li><a href="dsahboard">my account</a></li>
                  <li><a href="/account/login">login</a></li>
                </ul> : ""
                 } */}

                <ul className="wsus__menu_item wsus__menu_item_right">
                  <li>
                    <a href="contact">contact</a>
                  </li>
                  {session ? (
                    <>
                      <li>
                        <a href="/account">my account</a>
                      </li>
                      <li>
                        <a href="#"  onClick={() => signOut({ callbackUrl: `${window.location.origin}/account/login` })}>Logout</a>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                  {!session ? (
                    <li>
                      <a href="/account/login">login</a>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/*============================
        MAIN MENU END
    ==============================*/}
      {/*============================
        MOBILE MENU START
    ==============================*/}
      <section id="wsus__mobile_menu">
        <span className="wsus__mobile_menu_close">
          <i className="fal fa-times" />
        </span>
        <ul className="wsus__mobile_menu_header_icon d-inline-flex">
          <li>
            <a href="wishlist.html">
              <i className="far fa-heart" /> <span>2</span>
            </a>
          </li>
          <li>
            <a href="compare.html">
              <i className="far fa-random" /> <span>3</span>
            </a>
          </li>
        </ul>
        <form>
          <input type="text" placeholder="Search" />
          <button type="submit">
            <i className="far fa-search" />
          </button>
        </form>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Categories
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              main menu
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="wsus__mobile_menu_main_menu">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <ul className="wsus_mobile_menu_category">
                  <li>
                    <a href="#">
                      <i className="fas fa-star" /> hot promotions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThreew"
                      aria-expanded="false"
                      aria-controls="flush-collapseThreew"
                    >
                      <i className="fal fa-tshirt" /> fashion
                    </a>
                    <div
                      id="flush-collapseThreew"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <a href="#">men's</a>
                          </li>
                          <li>
                            <a href="#">wemen's</a>
                          </li>
                          <li>
                            <a href="#">kid's</a>
                          </li>
                          <li>
                            <a href="#">others</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThreer"
                      aria-expanded="false"
                      aria-controls="flush-collapseThreer"
                    >
                      <i className="fas fa-tv" /> electronics
                    </a>
                    <div
                      id="flush-collapseThreer"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <a href="#">Consumer Electronic</a>
                          </li>
                          <li>
                            <a href="#">Accessories &amp; Parts</a>
                          </li>
                          <li>
                            <a href="#">other brands</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThreerrp"
                      aria-expanded="false"
                      aria-controls="flush-collapseThreerrp"
                    >
                      <i className="fas fa-chair-office" />
                      furnicture
                    </a>
                    <div
                      id="flush-collapseThreerrp"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <a href="#">home</a>
                          </li>
                          <li>
                            <a href="#">office</a>
                          </li>
                          <li>
                            <a href="#">restaurent</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThreerrw"
                      aria-expanded="false"
                      aria-controls="flush-collapseThreerrw"
                    >
                      <i className="fal fa-mobile" /> Smart Phones
                    </a>
                    <div
                      id="flush-collapseThreerrw"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <a href="#">apple</a>
                          </li>
                          <li>
                            <a href="#">xiaomi</a>
                          </li>
                          <li>
                            <a href="#">oppo</a>
                          </li>
                          <li>
                            <a href="#">samsung</a>
                          </li>
                          <li>
                            <a href="#">vivo</a>
                          </li>
                          <li>
                            <a href="#">others</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-home-lg-alt" /> Home &amp; Garden
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="far fa-camera" /> Accessories
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-heartbeat" /> healthy &amp; Beauty
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-gift-card" /> Gift Ideas
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-gamepad-alt" /> Toy &amp; Games
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fal fa-gem" /> View All Categories
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="wsus__mobile_menu_main_menu">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample2"
              >
                <ul>
                  <li>
                    <a href="index.html">home</a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      shop
                    </a>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample2"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <a href="#">men's</a>
                          </li>
                          <li>
                            <a href="#">wemen's</a>
                          </li>
                          <li>
                            <a href="#">kid's</a>
                          </li>
                          <li>
                            <a href="#">others</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="vendor.html">vendor</a>
                  </li>
                  <li>
                    <a href="blog.html">blog</a>
                  </li>
                  <li>
                    <a href="daily_deals.html">campain</a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree101"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree101"
                    >
                      pages
                    </a>
                    <div
                      id="flush-collapseThree101"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample2"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <a href="404.html">404</a>
                          </li>
                          <li>
                            <a href="faqs.html">faq</a>
                          </li>
                          <li>
                            <a href="invoice.html">invoice</a>
                          </li>
                          <li>
                            <a href="about_us.html">about</a>
                          </li>
                          <li>
                            <a href="team.html">team</a>
                          </li>
                          <li>
                            <a href="product_grid_view.html">
                              product grid view
                            </a>
                          </li>
                          <li>
                            <a href="product_grid_view.html">
                              product list view
                            </a>
                          </li>
                          <li>
                            <a href="team_details.html">team details</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="track_order.html">track order</a>
                  </li>
                  <li>
                    <a href="daily_deals.html">daily deals</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*============================
        MOBILE MENU END
    ==============================*/}
      {/*==========================
        POP UP START
    ===========================*/}
      {/* <section id="wsus__pop_up">
        <div class="wsus__pop_up_center">
            <div class="wsus__pop_up_text">
                <span id="cross"><i class="fas fa-times"></i></span>
                <h5>get up to <span>75% off</span></h5>
                <h2>Sign up to E-SHOP</h2>
                <p>Subscribe to the <b>E-SHOP</b> market newsletter to receive updates on special offers.</p>
                <form>
                    <input type="email" placeholder="Your Email" class="news_input">
                    <button type="submit" class="common_btn">go</button>
                    <div class="wsus__pop_up_check_box">
                    </div>
                </form>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault11">
                    <label class="form-check-label" for="flexCheckDefault11">
                        Don't show this popup again
                    </label>
                </div>
            </div>
        </div>
    </section> */}
      {/*==========================
        POP UP END
    ===========================*/}
      {/*==========================
      PRODUCT MODAL VIEW START
    ===========================*/}
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
      {/*==========================
      PRODUCT MODAL VIEW END
    ===========================*/}
      {/*============================
        BANNER PART 2 START
    ==============================*/}
      <section id="wsus__banner">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="wsus__banner_content">
                <div className="row banner_slider">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="wsus__flash_sell" className="wsus__flash_sell_2">
        <div className=" container">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="offer_time"
                style={{ background: "url(images/flash_sell_bg.jpg)" }}
              >
                <div className="wsus__flash_coundown">
                  <span className=" end_text">flash sell</span>
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

      {/* <section id="wsus__monthly_top" className="wsus__monthly_top_2">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="wsus__monthly_top_banner">
                  <div className="wsus__monthly_top_banner_img">
                    <img src="images/monthly_top_img3.jpg" alt="img" className="img-fluid w-100" />
                    <span />
                  </div>
                  <div className="wsus__monthly_top_banner_text">
                    <h4>Black Friday Sale</h4>
                    <h3>Up To <span>70% Off</span></h3>
                    <h6>Everything</h6>
                    <a className="shop_btn" href="#">shop now</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="wsus__section_header for_md">
                  <h3>Top Categories Of The Month</h3>
                  <div className="monthly_top_filter">
                    <button className=" active" data-filter="*">music</button>
                    <button data-filter=".cloth">clothing</button>
                    <button data-filter=".elec">Electronic</button>
                    <button data-filter=".spk">Speakers</button>
                    <button data-filter=".cam">Cameras</button>
                    <button data-filter=".wat">Watches</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="row grid">
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  elec cam wat">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro8_8.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>wemen's one pcs</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  cloth spk">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro4_4.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's casual watch</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  elec cam wat">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro9.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's sholder bag</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  cloth spk">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro9_9.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's sholder bag</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  elec cam">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro10.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>MSI gaming chair</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  cloth cam wat">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro2.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's shoes</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  elec spk">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro2.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's shoes</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  cloth cam wat">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro10.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>MSI gaming chair</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  elec cam wat">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro8_8.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>wemen's one pcs</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  cloth spk">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro4_4.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's casual watch</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  elec wat">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro9.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's sholder bag</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3  cloth spk">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro9_9.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's sholder bag</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="wsus__brand_sleder" className="brand_slider_2">
          <div className="container">
            <div className="brand_border">
              <div className="row brand_slider">
                <div className="col-xl-2">
                  <div className="wsus__brand_logo">
                    <img src="images/brand_logo_1.jpg" alt="brand" className="img-fluid w-100" />
                  </div>
                </div>
                <div className="col-xl-2">
                  <div className="wsus__brand_logo">
                    <img src="images/brand_logo_2.jpg" alt="brand" className="img-fluid w-100" />
                  </div>
                </div>
                <div className="col-xl-2">
                  <div className="wsus__brand_logo">
                    <img src="images/brand_logo_3.jpg" alt="brand" className="img-fluid w-100" />
                  </div>
                </div>
                <div className="col-xl-2">
                  <div className="wsus__brand_logo">
                    <img src="images/brand_logo_4.jpg" alt="brand" className="img-fluid w-100" />
                  </div>
                </div>
                <div className="col-xl-2">
                  <div className="wsus__brand_logo">
                    <img src="images/brand_logo_5.jpg" alt="brand" className="img-fluid w-100" />
                  </div>
                </div>
                <div className="col-xl-2">
                  <div className="wsus__brand_logo">
                    <img src="images/brand_logo_6.jpg" alt="brand" className="img-fluid w-100" />
                  </div>
                </div>
                <div className="col-xl-2">
                  <div className="wsus__brand_logo">
                    <img src="images/brand_logo_3.jpg" alt="brand" className="img-fluid w-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="wsus__single_banner" className="wsus__single_banner_2">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <div className="wsus__single_banner_content">
                  <div className="wsus__single_banner_img">
                    <img src="images/single_banner_7.jpg" alt="banner" className="img-fluid w-100" />
                  </div>
                  <div className="wsus__single_banner_text">
                    <h6>sell on <span>35% off</span></h6>
                    <h3>smart watch</h3>
                    <a className="shop_btn" href="#">shop now</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="wsus__single_banner_content single_banner_2">
                  <div className="wsus__single_banner_img">
                    <img src="images/single_banner_8.jpg" alt="banner" className="img-fluid w-100" />
                  </div>
                  <div className="wsus__single_banner_text">
                    <h6>New Collection</h6>
                    <h3>bicycle</h3>
                    <a className="shop_btn" href="#">shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      {/* <section id="wsus__hot_deals" className="wsus__hot_deals_2">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="wsus__section_header">
                  <h3>hot deals of the day</h3>
                </div>
              </div>
            </div>
            <div className="row hot_deals_slider_2">
              <div className="col-xl-4 col-lg-6">
                <div className="wsus__hot_deals_offer">
                  <div className="wsus__hot_deals_img">
                    <img src="images/pro0010.jpg" alt="mobile" className="img-fluid w-100" />
                  </div>
                  <div className="wsus__hot_deals_text">
                    <a className="wsus__hot_title" href="product_details.html">apple smart watch</a>
                    <p className="wsus__rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <span>(127 review)</span>
                    </p>
                    <p className="wsus__hot_deals_proce">$160 <del>$200</del></p>
                    <p className="wsus__details">
                      Lorem ipsum dolor sit amet, cons
                      ectetur incid duut labore et dol.
                      Re magna atellus in metus.
                    </p>
                    <ul>
                      <li><a className="add_cart" href="#">add to cart</a></li>
                      <li><a href="#"><i className="far fa-heart" /></a></li>
                      <li><a href="#"><i className="far fa-random" /></a></li>
                    </ul>
                    <div className="simply-countdown simply-countdown-one" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="wsus__hot_deals_offer">
                  <div className="wsus__hot_deals_img">
                    <img src="images/pro0011.jpg" alt="mobile" className="img-fluid w-100" />
                  </div>
                  <div className="wsus__hot_deals_text">
                    <a className="wsus__hot_title" href="product_details.html">portable mobile Speaker</a>
                    <p className="wsus__rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <span>(176 review)</span>
                    </p>
                    <p className="wsus__hot_deals_proce">$200 <del>$220</del></p>
                    <p className="wsus__details">
                      Lorem ipsum dolor sit amet, cons
                      ectetur incid duut labore et dol.
                      Re magna atellus in metus.
                    </p>
                    <ul>
                      <li><a className="add_cart" href="#">add to cart</a></li>
                      <li><a href="#"><i className="far fa-heart" /></a></li>
                      <li><a href="#"><i className="far fa-random" /></a></li>
                    </ul>
                    <div className="simply-countdown simply-countdown-one" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="wsus__hot_deals_offer">
                  <div className="wsus__hot_deals_img">
                    <img src="images/pro0012.jpg" alt="mobile" className="img-fluid w-100" />
                  </div>
                  <div className="wsus__hot_deals_text">
                    <a className="wsus__hot_title" href="product_details.html">apple smart watch</a>
                    <p className="wsus__rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <span>(127 review)</span>
                    </p>
                    <p className="wsus__hot_deals_proce">$160 <del>$200</del></p>
                    <p className="wsus__details">
                      Lorem ipsum dolor sit amet, cons
                      ectetur incid duut labore et dol.
                      Re magna atellus in metus.
                    </p>
                    <ul>
                      <li><a className="add_cart" href="#">add to cart</a></li>
                      <li><a href="#"><i className="far fa-heart" /></a></li>
                      <li><a href="#"><i className="far fa-random" /></a></li>
                    </ul>
                    <div className="simply-countdown simply-countdown-one" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="wsus__hot_deals_offer">
                  <div className="wsus__hot_deals_img">
                    <img src="images/pro0013.jpg" alt="mobile" className="img-fluid w-100" />
                  </div>
                  <div className="wsus__hot_deals_text">
                    <a className="wsus__hot_title" href="product_details.html">portable mobile Speaker</a>
                    <p className="wsus__rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <span>(176 review)</span>
                    </p>
                    <p className="wsus__hot_deals_proce">$200 <del>$220</del></p>
                    <p className="wsus__details">
                      Lorem ipsum dolor sit amet, cons
                      ectetur incid duut labore et dol.
                      Re magna atellus in metus vulpue
                      te eu sceleri que felis.
                    </p>
                    <ul>
                      <li><a className="add_cart" href="#">add to cart</a></li>
                      <li><a href="#"><i className="far fa-heart" /></a></li>
                      <li><a href="#"><i className="far fa-random" /></a></li>
                    </ul>
                    <div className="simply-countdown simply-countdown-one" />
                  </div>
                </div>
              </div>
            </div>
            <div className="wsus__hot_large_item">
              <div className="row">
                <div className="col-xl-12">
                  <div className="wsus__section_header justify-content-start">
                    <div className="monthly_top_filter2 mb-1">
                      <button className="ms-0 active" data-filter="*">music</button>
                      <button data-filter=".clotha">clothing</button>
                      <button data-filter=".eleca">Electronic</button>
                      <button data-filter=".spka">Speakers</button>
                      <button data-filter=".cama">Cameras</button>
                      <button className="me-0" data-filter=".wata">Watches</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row grid2">
                   {
                    [1,1,1,1,1,1].map(product => <ProductCard />)
                }
              </div>
            </div>
            <section id="wsus__single_banner" className="home_2_single_banner">
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="wsus__single_banner_content banner_1">
                      <div className="wsus__single_banner_img">
                        <img src="images/single_banner_44.jpg" alt="banner" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__single_banner_text">
                        <h6>sell on <span>35% off</span></h6>
                        <h3>smart watch</h3>
                        <a className="shop_btn" href="#">shop now</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="row">
                      <div className="col-12">
                        <div className="wsus__single_banner_content single_banner_2">
                          <div className="wsus__single_banner_img">
                            <img src="images/single_banner_55.jpg" alt="banner" className="img-fluid w-100" />
                          </div>
                          <div className="wsus__single_banner_text">
                            <h6>New Collection</h6>
                            <h3>kid's fashion</h3>
                            <a className="shop_btn" href="#">shop now</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-lg-4">
                        <div className="wsus__single_banner_content">
                          <div className="wsus__single_banner_img">
                            <img src="images/single_banner_66.jpg" alt="banner" className="img-fluid w-100" />
                          </div>
                          <div className="wsus__single_banner_text">
                            <h6>sell on <span>42% off</span></h6>
                            <h3>winter collection</h3>
                            <a className="shop_btn" href="#">shop now</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="wsus__hot_small_item wsus__hot_small_item_2">
              <div className="row">
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro4_4.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's casual watch</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro9.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's sholder bag</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro9_9.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's sholder bag</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro10.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>MSI gaming chair</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro2.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's shoes</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro2.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's shoes</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro2.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's shoes</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro2.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's shoes</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro10.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>MSI gaming chair</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro9_9.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's sholder bag</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro9.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's sholder bag</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
                <div className="col-xl-2 col-6 col-sm-6 col-md-4 col-lg-3">
                  <a className="wsus__hot_deals__single" href="#">
                    <div className="wsus__hot_deals__single_img">
                      <img src="images/pro4_4.jpg" alt="bag" className="img-fluid w-100" />
                    </div>
                    <div className="wsus__hot_deals__single_text">
                      <h5>men's casual watch</h5>
                      <p className="wsus__rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </p>
                      <p className="wsus__tk">$120.20 <del>130.00</del></p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      {/* <section id="wsus__electronic">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="wsus__section_header">
                  <h3>Consumer Electronics</h3>
                  <a className="see_btn" href="#">see more <i className="fas fa-caret-right" /></a>
                </div>
              </div>
            </div>
            <div className="row flash_sell_slider">
            {
                    [1,1,1,1,1,1].map(product => <ProductCard />)
                }
            </div>
          </div>
        </section> */}

      {/* <section id="wsus__electronic2">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="wsus__section_header">
                  <h3>Apparels &amp; Clothings</h3>
                  <a className="see_btn" href="#">see more <i className="fas fa-caret-right" /></a>
                </div>
              </div>
            </div>
            <div className="row flash_sell_slider">
                {
                    [1,1,1,1,1,1].map(product => <ProductCard />)
                }
            </div>
          </div>
        </section> */}

      {/* <section id="wsus__large_banner">
          <div className="container">
            <div className="row">
              <div className="cl-xl-12">
                <div className="wsus__large_banner_content" style={{background: 'url(images/large_banner_img.jpg)'}}>
                  <div className="wsus__large_banner_content_overlay">
                    <div className="row">
                      <div className="col-xl-6 col-12 col-md-6">
                        <div className="wsus__large_banner_text">
                          <h3>This Week's Deal</h3>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem repudiandae in
                            ipsam
                            nesciunt.</p>
                          <a className="shop_btn" href="#">view more</a>
                        </div>
                      </div>
                      <div className="col-xl-6 col-12 col-md-6">
                        <div className="wsus__large_banner_text wsus__large_banner_text_right">
                          <h3>headphones</h3>
                          <h5>up to 20% off</h5>
                          <p>Spring's collection has discounted now!</p>
                          <a className="shop_btn" href="#">shop now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      {/* <section id="wsus__weekly_best" className="home2_wsus__weekly_best_2 ">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-sm-6">
                <div className="wsus__section_header">
                  <h3>weekly best rated Products</h3>
                </div>
                <div className="row weekly_best2">
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro9.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's sholder bag</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro4_4.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's casual watch</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro3.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>hp 24" FHD monitore</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro10.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>MSI gaming chair</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro9_9.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's sholder bag</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro4_4.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's casual watch</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-sm-6">
                <div className="wsus__section_header">
                  <h3>weekly best Sale Products</h3>
                </div>
                <div className="row weekly_best2">
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro9.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's sholder bag</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro4_4.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's casual watch</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro3.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>hp 24" FHD monitore</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro10.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>MSI gaming chair</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro9_9.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's sholder bag</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <a className="wsus__hot_deals__single" href="#">
                      <div className="wsus__hot_deals__single_img">
                        <img src="images/pro4_4.jpg" alt="bag" className="img-fluid w-100" />
                      </div>
                      <div className="wsus__hot_deals__single_text">
                        <h5>men's casual watch</h5>
                        <p className="wsus__rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </p>
                        <p className="wsus__tk">$120.20 <del>130.00</del></p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      {/* <section id="wsus__home_services" className="home_service_2">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-lg-3 pe-lg-0">
                <div className="wsus__home_services_single home_service_single_2 border_left">
                  <i className="fal fa-truck" />
                  <h5>Free Worldwide Shipping</h5>
                  <p>Free shipping coast for all country</p>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-lg-3 pe-lg-0">
                <div className="wsus__home_services_single home_service_single_2">
                  <i className="fal fa-headset" />
                  <h5>24/7 Customer Support</h5>
                  <p>Friendly 24/7 customer support</p>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-lg-3 pe-lg-0">
                <div className="wsus__home_services_single home_service_single_2">
                  <i className="far fa-exchange-alt" />
                  <h5>Money Back Guarantee</h5>
                  <p>We return money within 30 days</p>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-lg-3">
                <div className="wsus__home_services_single home_service_single_2">
                  <i className="fal fa-credit-card" />
                  <h5>Secure Online Payment</h5>
                  <p>We posess SSL / Secure Certificate</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      {/* <section id="wsus__blogs" className="home_blogs">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="wsus__section_header">
                  <h3>recent blogs</h3>
                  <a className="see_btn" href="#">see more <i className="fas fa-caret-right" /></a>
                </div>
              </div>
            </div>
            <div className="row home_blog_slider">
              <div className="col-xl-3">
                <div className="wsus__single_blog wsus__single_blog_2">
                  <a className="wsus__blog_img" href="#">
                    <img src="images/blog_1.jpg" alt="blog" className="img-fluid w-100" />
                  </a>
                  <div className="wsus__blog_text">
                    <a className="blog_top red" href="#">women's</a>
                    <div className="wsus__blog_text_center">
                      <a href="blog_details.html">New found the women’s shirt for summer season</a>
                      <p className="date">nov 04 2021</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3">
                <div className="wsus__single_blog wsus__single_blog_2">
                  <a className="wsus__blog_img" href="#">
                    <img src="images/blog_2.jpg" alt="blog" className="img-fluid w-100" />
                  </a>
                  <div className="wsus__blog_text">
                    <a className="blog_top blue" href="#">lifestyle</a>
                    <div className="wsus__blog_text_center">
                      <a href="blog_details.html">Fusce lacinia arcuet nulla menasious</a>
                      <p className="date">nov 04 2021</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3">
                <div className="wsus__single_blog wsus__single_blog_2">
                  <a className="wsus__blog_img" href="#">
                    <img src="images/blog_3.jpg" alt="blog" className="img-fluid w-100" />
                  </a>
                  <div className="wsus__blog_text">
                    <a className="blog_top orange" href="#">lifestyle</a>
                    <div className="wsus__blog_text_center">
                      <a href="blog_details.html">found the men’s shirt for summer season</a>
                      <p className="date">nov 04 2021</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3">
                <div className="wsus__single_blog wsus__single_blog_2">
                  <a className="wsus__blog_img" href="#">
                    <img src="images/blog_4.jpg" alt="blog" className="img-fluid w-100" />
                  </a>
                  <div className="wsus__blog_text">
                    <a className="blog_top orange" href="#">fashion</a>
                    <div className="wsus__blog_text_center">
                      <a href="blog_details.html">winter collection for women’s</a>
                      <p className="date">nov 04 2021</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3">
                <div className="wsus__single_blog wsus__single_blog_2">
                  <a className="wsus__blog_img" href="#">
                    <img src="images/blog_5.jpg" alt="blog" className="img-fluid w-100" />
                  </a>
                  <div className="wsus__blog_text">
                    <a className="blog_top red" href="#">lifestyle</a>
                    <div className="wsus__blog_text_center">
                      <a href="blog_details.html">Comes a cool blog post with Images</a>
                      <p className="date">nov 04 2021</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
    </div>
  );
}

Home.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;
