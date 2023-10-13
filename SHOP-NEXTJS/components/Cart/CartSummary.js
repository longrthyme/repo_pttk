import CartContext from "@/context/CartContext";
import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import CartItem from "./CartItem";

function CartSummary(props) {
  const { cart, getCart } = useContext(CartContext);
  const { option } = props;
  const router = useRouter();
  return (
    // <div className="p-10">
    //   <div className="border p-4">
    //     <p className="uppercase font-bold opacity-60">Price details</p>
    //     <hr />
    //     <div className="space-y-3 font-semibold ">
    //       <div className="flex justify-between pt-3">
    //         <span>Price</span>
    //         <span>
    //           {cart
    //             .map(
    //               (cartItem, index) =>
    //                 cartItem.product.original_price * cartItem.quantity
    //             )
    //             .reduce((partialSum, a) => partialSum + a, 0)
    //             .toFixed(2)}{" "}
    //           $
    //         </span>
    //       </div>
    //       <div className="flex justify-between pt-3 ">
    //         <span>Discount</span>
    //         <span className="text-green-600">
    //           {cart
    //             .map(
    //               (cartItem, index) =>
    //                 cartItem.product.discount_percent *
    //                 cartItem.product.original_price *
    //                 cartItem.quantity
    //             )
    //             .reduce((partialSum, a) => partialSum + a, 0)
    //             .toFixed(2)}{" "}
    //           $
    //         </span>
    //       </div>
    //       <div className="flex justify-between pt-3 ">
    //         <span>Delivery</span>
    //         <span className="text-green-600">0 $</span>
    //       </div>
    //       <hr />
    //       <div className="flex justify-between pt-3 ">
    //         <span>Total Amount</span>
    //         <span className="text-green-600">
    //           {(
    //             cart
    //               .map(
    //                 (cartItem, index) =>
    //                   (cartItem.product.original_price -
    //                     cartItem.product.original_price *
    //                       cartItem.product.discount_percent) *
    //                   cartItem.quantity
    //               )
    //               .reduce((partialSum, a) => partialSum + a, 0) +
    //             cart
    //               .map(
    //                 (cartItem, index) =>
    //                   cartItem.product.discount_percent *
    //                   cartItem.product.original_price *
    //                   cartItem.quantity
    //               )
    //               .reduce((partialSum, a) => partialSum + a, 0)
    //           ).toFixed(2)}{" "}
    //           $
    //         </span>
    //       </div>
    //       {option == "checkout" ? (
    //       ""
    //       ) : (
    //         <Button
    //           className="mt-5 w-full bg-purple-600 text-white hover:bg-purple-400 hover:text-black"
    //           onClick={() => router.push("/checkout?step=1")}
    //         >
    //           Checkout
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className="col-xl-3">
    <div className="wsus__cart_list_footer_button" id="sticky_sidebar">
      <h6>total cart</h6>
      <p>subtotal: <span>$124.00</span></p>
      <p>delivery: <span>$00.00</span></p>
      <p>discount: <span>$10.00</span></p>
      <p className="total"><span>total:</span> <span>$134.00</span></p>
      <form>
        <input type="text" placeholder="Coupon Code" />
        <button type="submit" className="common_btn">apply</button>
      </form>
      <a className="common_btn mt-4 w-100 text-center" href="check_out.html">checkout</a>
      <a className="common_btn mt-1 w-100 text-center" href="product_grid_view.html"><i className="fab fa-shopify" /> go shop</a>
    </div>
  </div>

    
  //   <section id="wsus__cart_view">
  //   <div className="container">
  //     <div className="row">
  //       <div className="col-xl-9">
  //         <div className="wsus__cart_list">
  //           <div className="table-responsive">
  //             <table>
  //               <tbody>
              
  //               <tr className="d-flex">
  //                                       <th className="wsus__pro_img">
  //                                           product item
  //                                       </th>

  //                                       <th className="wsus__pro_name">
  //                                           product details
  //                                       </th>

  //                                       <th className="wsus__pro_status">
  //                                           status
  //                                       </th>

  //                                       <th className="wsus__pro_select">
  //                                           quantity
  //                                       </th>

  //                                       <th className="wsus__pro_tk">
  //                                           price
  //                                       </th>

  //                                       <th className="wsus__pro_icon">
  //                                           <a href="#" className="common_btn">clear cart</a>
  //                                       </th>
  //                                   </tr>

  //                                   {
  //                                     [1,1,,1,1,1,1,1].map(item => <CartItem />)
  //                                   }
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
        
  //       {/* cart summary */}
  //       <div className="col-xl-3">
  //         <div className="wsus__cart_list_footer_button" id="sticky_sidebar">
  //           <h6>total cart</h6>
  //           <p>subtotal: <span>$124.00</span></p>
  //           <p>delivery: <span>$00.00</span></p>
  //           <p>discount: <span>$10.00</span></p>
  //           <p className="total"><span>total:</span> <span>$134.00</span></p>
  //           <form>
  //             <input type="text" placeholder="Coupon Code" />
  //             <button type="submit" className="common_btn">apply</button>
  //           </form>
  //           <a className="common_btn mt-4 w-100 text-center" href="check_out.html">checkout</a>
  //           <a className="common_btn mt-1 w-100 text-center" href="product_grid_view.html"><i className="fab fa-shopify" /> go shop</a>
  //         </div>
  //       </div>

  //         {/* end cart summary */}

  //     </div>
  //   </div>
  // </section>
  );
}

export default CartSummary;
