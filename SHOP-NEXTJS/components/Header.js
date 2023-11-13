import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false);

  const { cart, getCart } = useContext(CartContext);
  
  const { data: session } = useSession();
  const token = session?.accessToken;


  useEffect(() => {
    if (token != null) {
      getCart();
    }
  }, [token]);

  function DropdownItem(props) {
    return (
      <li
        className="dropdownItem flex flex-row  items-center mt-2 hover:cursor-pointer"
        onClick={() => handleItemClick(props.handler)}
      >
        {props.img}
        <a className="ml-2"> {props.text} </a>
      </li>
    );
  }

  const handleItemClick = (event) => {
    event();
    setProfileOpen(!profileOpen);
  };

  return (
    <header>
    <div className="container">
      <div className="row">
        <div className="col-2 col-md-1 d-lg-none">
          <div className="wsus__mobile_menu_area">
            <span className="wsus__mobile_menu_icon"><i className="fal fa-bars" /></span>
          </div>
        </div>
        <div className="col-xl-2 col-7 col-md-8 col-lg-2">
          <div className="">
            <a className="" href="/">
              <img width={80} height={80} src="https://amushurtownia.pl/wp-content/uploads/2017/09/bartfan-logo.png" alt="logo" className="" />
            </a>
          </div>
        </div>
        <div className="col-xl-5 col-md-6 col-lg-4 d-none d-lg-block">
          <div className="wsus__search">
            <form>
              <input type="text" placeholder="Search..." />
              <button type="submit"><i className="far fa-search" /></button>
            </form>
          </div>
        </div>
        <div className="col-xl-5 col-3 col-md-3 col-lg-6">
          <div className="wsus__call_icon_area">
            <div className="wsus__call_area">
              <div className="wsus__call">
                <i className="fas fa-user-headset" />
              </div>
              <div className="wsus__call_text">
                <p>bartfan.admin@bartfan.com</p>
                <p>+840225335</p>
              </div>
            </div>
           {
            session?.role == "CUSTOMER" ? 
            <ul className="wsus__icon_area">
            <li><a href="wishlist.html"><i className="fas fa-heart" /><span>00</span></a></li>
            {/* <li><a href="compare.html"><i className="fas fa-random" /><span>00</span></a></li> */}
            <li><a className="wsus__cart_icon" href="/cart"><i className="fas fa-shopping-bag" /><span> {cart.length}</span></a></li>
          </ul>
          : ""
           }
          </div>
        </div>
      </div>
    </div>
    <div className="wsus__mini_cart">
      <h4>shopping cart <span className="wsus_close_mini_cart"><i className="far fa-times" /></span></h4>
      <ul>
        <li>
          <div className="wsus__cart_img">
            <a href="#"><img src="images/tab_2.jpg" alt="product" className="img-fluid w-100" /></a>
            <a className="wsis__del_icon" href="#"><i class="fa fa-id-card" aria-hidden="true"></i></a>
          </div>
          <div className="wsus__cart_text">
            <a className="wsus__cart_title" href="#">apple 9.5" 7 serise tab with full view display</a>
            <p>$140 <del>$150</del></p>
          </div>
        </li>
        <li>
          <div className="wsus__cart_img">
            <a href="#"><img src="/images/about_2.jpg" alt="product" className="img-fluid w-100" /></a>
            <a className="wsis__del_icon" href="#"><i className="fas fa-minus-circle" /></a>
          </div>
          <div className="wsus__cart_text">
            <a className="wsus__cart_title" href="#">men's fashion casual watch</a>
            <p>$130</p>
          </div>
        </li>
        <li>
          <div className="wsus__cart_img">
            <a href="#"><img src="/images/pro2.jpg" alt="product" className="img-fluid w-100" /></a>
            <a className="wsis__del_icon" href="#"><i className="fas fa-minus-circle" /></a>
          </div>
          <div className="wsus__cart_text">
            <a className="wsus__cart_title" href="#">men's casual shoes</a>
            <p>$140 <del>$150</del></p>
          </div>
        </li>
        <li>
          <div className="wsus__cart_img">
            <a href="#"><img src="/images/pro9.jpg" alt="product" className="img-fluid w-100" /></a>
            <a className="wsis__del_icon" href="#"><i className="fas fa-minus-circle" /></a>
          </div>
          <div className="wsus__cart_text">
            <a className="wsus__cart_title" href="#">men's fashion casual sholder bag</a>
            <p>$140</p>
          </div>
        </li>
        <li>
          <div className="wsus__cart_img">
            <a href="#"><img src="/images/tab_2.jpg" alt="product" className="img-fluid w-100" /></a>
            <a className="wsis__del_icon" href="#"><i className="fas fa-minus-circle" /></a>
          </div>
          <div className="wsus__cart_text">
            <a className="wsus__cart_title" href="#">apple 9.5" 7 serise tab with full view display</a>
            <p>$140 <del>$150</del></p>
          </div>
        </li>
      </ul>
      <h5>sub total <span>$3540</span></h5>
      <div className="wsus__minicart_btn_area">
        <a className="common_btn" href="cart">view cart</a>
        <a className="common_btn" href="checkout">checkout</a>
      </div>
    </div>
  </header>
  );
}
