import { API_URL, NEXT_API } from "@/config";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";
import { useSession } from "next-auth/react";

const { createContext, useState, useEffect, useContext } = require("react");

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    if (user) {
      console.log("Ben trong useeffect cart context");
      getCart();
    }
  }, [user]);

  const getCart = async () => {
    const resGet = await fetch(`${API_URL}/cart/all_cart_items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataGet = await resGet.json();

    if (!resGet.ok) {
      toast.error("Lỗi lấy danh sách sản phẩm giỏ hàng " + dataGet.message);
    } else {
      console.log("Ds cart la " + JSON.stringify(dataGet));
      setCart(dataGet);
    }
  };

  const addItemToCart = async (payload) => {
    const resPos = await fetch(`${API_URL}/cart/add_to_cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const dataPos = await resPos.json();

    if (!resPos.ok) {
      toast.error(dataPos.message);
    } else {
      getCart();
      toast.success("Thêm vào giỏ thành công");
    }
  };


  const deleteCartItem = async (productId) => {
    const resDel = await fetch(`${API_URL}/cart/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataDel = resDel.text();

    if (!resDel.ok) {
      toast.error("Loi " + dataDel.message);
    } else {
      getCart();
      toast.success("Remove successfully");
    }

  }

  const value = {
    cart,
    addItemToCart,
    message,
    getCart,
    setCart,
    deleteCartItem
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
