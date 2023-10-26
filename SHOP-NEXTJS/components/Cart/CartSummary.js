import CartContext from "@/context/CartContext";
import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import CartItem from "./CartItem";

function CartSummary(props) {
  const { cart, getCart } = useContext(CartContext);
  const { option, show} = props;
  const router = useRouter();
  return (
    <div className="col-xl-3">
      <div className="wsus__cart_list_footer_button" id="sticky_sidebar">
        <h6>total cart</h6>
        <p>
          subtotal:{" "}
          <span>
            ${" "}
            {cart
              .map(
                (cartItem, index) =>
                  cartItem.product.original_price * cartItem.quantity
              )
              .reduce((partialSum, a) => partialSum + a, 0)
              .toFixed(2)}{" "}
          </span>
        </p>
        <p>
          delivery: <span>$00.00</span>
        </p>
        <p>
          discount:{" "}
          <span>
            ${" "}
            {cart
              .map(
                (cartItem, index) =>
                  cartItem.product.discount_percent *
                  cartItem.product.original_price *
                  cartItem.quantity
              )
              .reduce((partialSum, a) => partialSum + a, 0)
              .toFixed(2)}{" "}
          </span>
        </p>
        <p className="total">
          <span>total:</span>{" "}
          <span>
            ${" "}
            {(
              cart
                .map(
                  (cartItem, index) =>
                    (cartItem.product.original_price -
                      cartItem.product.original_price *
                        cartItem.product.discount_percent) *
                    cartItem.quantity
                )
                .reduce((partialSum, a) => partialSum + a, 0) +
              cart
                .map(
                  (cartItem, index) =>
                    cartItem.product.discount_percent *
                    cartItem.product.original_price *
                    cartItem.quantity
                )
                .reduce((partialSum, a) => partialSum + a, 0)
            ).toFixed(2)}{" "}
          </span>
        </p>
        {/* <form>
          <input type="text" placeholder="Coupon Code" />
          <button type="submit" className="common_btn">
            apply
          </button>
        </form> */}
       {show &&  <a
          className="common_btn mt-4 w-100 text-center"
          onClick={() => router.push("/checkout?step=1")}
        >
          checkout
        </a>}
        <a className="common_btn mt-1 w-100 text-center hover:cursor-pointer" onClick={() => router.push("/")}>
          <i className="fab fa-shopify" /> go shop
        </a>
      </div>
    </div>
  );
}

export default CartSummary;
