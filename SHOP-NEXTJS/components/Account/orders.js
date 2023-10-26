import { API_URL } from "@/config";
import AuthContext from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserOrderCard from "../Order/UserOrderCard";
import Image from "next/image";
import empty_cart1 from "../../public/images/empty_cart1.png";
import { useSession } from "next-auth/react";
import OrderContext from "@/context/OrderContext";

function UserOrder(props) {
  const { userOrders, getAllUserOrders } = useContext(OrderContext);

  const { data: session } = useSession();
  const token = session?.accessToken;


  useEffect(() => {

    if(session) {
      getAllUserOrders()
    }
  }, [session]);



  return (
    <div>
      {userOrders.length == 0 ? (
        <image src={empty_cart1} width={100} height={100} alt="empty_cart" className="center" />
      ) : (
        <>
          {userOrders.map((order, index) => (
            <UserOrderCard data = {order}  key={index}/>
          ))}
        </>
      )}
    </div>
  );
}

export default UserOrder;
