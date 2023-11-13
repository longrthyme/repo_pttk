import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import AuthContext from "@/context/AuthContext";
import CartContext from "@/context/CartContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import emptycart from "../public/images/emptycart.jpg";
import Image from "next/image";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";

function Cart(props) {
  const { cart, getCart } = useContext(CartContext);
  const router = useRouter();

  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]); // add dep to handle updated user to get the cart

  return (
    <div>
      <section id="wsus__breadcrumb">
        <div className="wsus_breadcrumb_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4>cart View</h4>
                <ul>
                  <li>
                    <a href="#">home</a>
                  </li>
                  <li>
                    <a href="#">peoduct</a>
                  </li>
                  <li>
                    <a href="#">cart view</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="p-4">
        {cart.length > 0 ? (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-xl-9">
                  <div className="wsus__cart_list">
                    <div className="table-responsive">
                      <table>
                        <tbody>
                          <tr className="d-flex">
                            <th className="wsus__pro_img">product item</th>

                            <th className="wsus__pro_name">product details</th>

                            <th className="wsus__pro_status">status</th>

                            <th className="wsus__pro_select">quantity</th>

                            <th className="wsus__pro_tk">price</th>

                            <th className="wsus__pro_icon">
                              <a href="#" className="common_btn">
                                clear cart
                              </a>
                            </th>
                          </tr>

                          {/* {[1, 1, , 1, 1, 1, 1, 1].map((item) => (
                            <CartItem />
                          ))} */}

                          {cart.map((cartItem, index) => (
                            <CartItem data={cartItem} key={index} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <CartSummary show={true}/>
              </div>
            </div>

            {/* images below  */}

            <section id="wsus__single_banner">
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="wsus__single_banner_content">
                      <div className="wsus__single_banner_img">
                        <img
                          src="images/single_banner_2.jpg"
                          alt="banner"
                          className="img-fluid w-100"
                        />
                      </div>
                      <div className="wsus__single_banner_text">
                        <h6>
                          sell on <span>35% off</span>
                        </h6>
                        <h3>smart watch</h3>
                        <a className="shop_btn" href="#">
                          shop now
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="wsus__single_banner_content single_banner_2">
                      <div className="wsus__single_banner_img">
                        <img
                          src="images/single_banner_3.jpg"
                          alt="banner"
                          className="img-fluid w-100"
                        />
                      </div>
                      <div className="wsus__single_banner_text">
                        <h6>New Collection</h6>
                        <h3>Cosmetics</h3>
                        <a className="shop_btn" href="#">
                          shop now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <section id="wsus__cart_view">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="wsus__cart_list cart_empty p-3 p-sm-5 text-center">
                    <p className="mb-4">your shopping cart is empty</p>
                    <a href="product_grid_view.html" className="common_btn">
                      <i className="fas fa-store me-2" />
                      view our product
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

Cart.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Cart;
