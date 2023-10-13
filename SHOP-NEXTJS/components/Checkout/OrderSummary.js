import React, { useContext } from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";
import { Button } from "@mui/material";
import CartContext from "@/context/CartContext";
import CartSummary from "../Cart/CartSummary";
import OrderContext from "@/context/OrderContext";

function OrderSummary(props) {
  const { cart } = useContext(CartContext);
  const {deliveryAddress } = useContext(OrderContext);
  return (
    <div className="p-10">
      <AddressCard data={deliveryAddress} />

      <div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="col-span-2 ">
            {cart.map((cartItem, index) => (
              <CartItem data={cartItem} />
            ))}
          </div>
          <CartSummary option="checkout" />
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
