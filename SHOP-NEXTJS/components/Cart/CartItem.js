import { API_URL, NEXT_API } from "@/config";
import CartContext from "@/context/CartContext";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  AddCircleOutline,
  Image,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { Badge, Modal } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "react-toastify";

function CartItem({ data }) {
  const { getCart, deleteCartItem } = useContext(CartContext);

  const { confirm } = Modal;

  const { data: session } = useSession();
  const token = session?.accessToken;

  const showDeleteConfirm = (productId) => {
    confirm({
      title: "Are you sure delete this cart item?",
      icon: <ExclamationCircleFilled />,
      content: "Delete this cart item",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // const deleteCartItem = async () => {
        //   const resDel = await fetch(`${NEXT_API}/api/cart/${productId}`, {
        //     method: "DELETE",
        //   });

        //   const delData = await resDel.json();

        //   if (!resDel.ok) {
        //     toast.error(delData.message);
        //   } else {
        //     getCart();
        //     toast.success("Xoá thành công");
        //   }
        // };

        // deleteCartItem();
        deleteCartItem(productId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const updateQuantity = async (option, productId) => {
    const resPut = await fetch(
      `${API_URL}/cart/update/${productId}/${option}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const dataPut = await resPut.json();

    if (!resPut.ok) {
      toast.error(dataPut.message);
    } else {
      getCart();
      toast.success("Đã cập nhật số lượng");
    }
  };

  return (
    <tr className="d-flex">
      <td className="wsus__pro_img">
        <img
          alt="product"
          className="img-fluid w-80"
          src={data.product.primaryImage}
        />

        {/* <Image  src={data.product.primaryImage} alt="product"
            className="img-fluid w-100" /> */}
      </td>

      <td className="wsus__pro_name">
        <p>{data.product.name}</p>
        <span>cate: {data.product.category.name}</span>
        <span>Seller : {data.product.brand.name}</span>
      </td>

      <td className="wsus__pro_status">
        <p>in stock</p>
      </td>

      <td className="wsus__pro_select">
        <button onClick={() => updateQuantity("decrease", data.product.id)}>
          <RemoveCircleOutline />
        </button>
        <span className="py-1 px-7 border rounded-sm">{data.quantity}</span>
        <button onClick={() => updateQuantity("increase", data.product.id)}>
          <AddCircleOutline />
        </button>
      </td>

      <td className="wsus__pro_tk">
        <h6>$ {data.product.original_price.toFixed(2)} </h6>
      </td>

      <td className="wsus__pro_icon">
        <a href="#">
          <i className="fas fa-times " onClick={() => showDeleteConfirm(data.product.id)}></i>
        </a>
      </td>
    </tr>
  );
}

export default CartItem;
