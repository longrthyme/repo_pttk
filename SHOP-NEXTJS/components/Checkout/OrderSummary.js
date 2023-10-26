import React, { useContext } from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";
import { Button } from "@mui/material";
import CartContext from "@/context/CartContext";
import CartSummary from "../Cart/CartSummary";
import OrderContext from "@/context/OrderContext";

function OrderSummary(props) {
  const { cart } = useContext(CartContext);
  const { deliveryAddress } = useContext(OrderContext);
  return (
    <div>
      <AddressCard data={deliveryAddress} />
      <div className="mt-8">

      <div className="flex ">
            <div className="col-xl-9 mr-8">
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

                  

                      {cart.map((cartItem, index) => (
                        <CartItem data={cartItem} key={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <CartSummary  option="checkout" show={false} />
          </div>
        
      </div>
    </div>
  );
}

export default OrderSummary;
