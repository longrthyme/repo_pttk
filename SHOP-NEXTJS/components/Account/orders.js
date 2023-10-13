import { API_URL } from "@/config";
import AuthContext from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserOrderCard from "../Order/UserOrderCard";
import Image from "next/image";
import empty_cart1 from "../../public/images/empty_cart1.png";

function UserOrder(props) {
  const { userOrder } = useContext(AuthContext);

  return (
    <div>
      {userOrder.length == 0 ? (
        <Image src={empty_cart1} width={400} height={400} alt="empty_cart" className="center" />
      ) : (
        <>
          {userOrder.map((order, index) => (
            <UserOrderCard data = {order}  key={index}/>
          ))}
        </>
      )}
    </div>
  );
}

export default UserOrder;
