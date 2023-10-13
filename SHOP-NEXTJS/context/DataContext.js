import { API_URL, NEXT_API } from "@/config";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, setState] = useState({
    listCates: [],
    listBrands: [],
    listProds: [],
    productAdmin: [],
    employees: [],
    accounts : [],
    imports: [],
    isLoading: false,
  });
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [productDetail, setProductDetail] = useState(null);

  const [searchOrderValue, setSearchOrderValue] = useState("");

  
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    console.log("Da goi trong useEffect get brand");
    getBrands();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProductDetail = async (prodId) => {
    // const resGet = await fetch(
    //   `${NEXT_API}/api/products?action=get_detail&productId=${prodId}`,
    //   {
    //     method: "GET",
    //   }
    // );

    // ver    
    const resGet = await fetch(`${API_URL}/products/${productId}`, {
      method: "GET",
    });

    const dataPos = await resGet.json();

    if (!resGet.ok) {
      toast.error("Error" + dataPos.message);
    } else {
      
      setProductDetail(dataGet.dataPos);
    }
  };


  // get all imports
  const getImports = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    
    //ver
    const resGet = await fetch(`${API_URL}/imports`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const getData = await resGet.json();

    if (!resGet.ok) {
      toast.error("Error getting imports " + getData.message);
    } else {
      setState((prevState) => ({ ...prevState, isLoading: false, imports: getData }));
    }
  
  };

  

  const getProducts = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));    // ver
    const resGet = await fetch(`${API_URL}/products`, {
      method: "GET",
    });

    const dataPos = await resGet.json();

    console.log("Da qua datapost");

    if (!resGet.ok) {
      setError(dataPos.message);
      
    } else {
      updateProducts(dataPos); // default return object json with categories prop    
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };


  // get customers
  
  const getAllCustomer = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));    // ver
    
    const resGet = await fetch(`${API_URL}/admin/customers/all`, {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      toast.error("Error getting list employees " + dataGet.message);
      
    } else {
    
      setState((prevState) => ({ ...prevState, isLoading: false, employees: dataGet }));
    
    }
  };

  const getProductAdmin = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    // verr

    console.log("Da vao get trong api product");
    const resGet = await fetch(`${API_URL}/products`, {
      method: "GET",
    });

    const dataPos = await resGet.json();

    console.log("Da qua datapost");

    if (!resGet.ok) {
      toast.error("Lỗi lấy danh sách sản phẩm admin " + dataPos.message );
      
    } else {
      setState((prevState) => ({ ...prevState, isLoading: false, productAdmin: dataPos }));
    }
  };

  const getBrands = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    // ver
    const rest = await fetch(`${API_URL}/brands`, {
      method: "GET",
    });

    const restData = await rest.json();
    if (!rest.ok) {
      setError(restData.message);
    } else {
      console.log("Brand context ", JSON.stringify(restData));
      updateBrands(restData);
    }


    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const updateBrands = (updatedBrands) => {
    setState((prevState) => ({ ...prevState, listBrands: updatedBrands })); //  updating the state based on the most recent state values - function-based
  };

  const updateCategories = (updatedCates) => {
    setState((prevState) => ({ ...prevState, listCates: updatedCates })); //  updating the state based on the most recent state values - function-based
  };

  const updateProducts = (updatedProds) => {
    setState((prevState) => ({ ...prevState, listProds: updatedProds }));
  };

  const getCategories = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    // ver
    const response = await fetch(`${API_URL}/categories`, {
      method: "GET",
    });

    const restData = await response.json();
    if (!response.ok) {
      toast.error("Error get category " + restData.message);
    } else {updateCategories(restData);
    
    }

    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const getUserInformation = async () => {
    setState({ ...state, isLoading: true });
    const response = await fetch(`${NEXT_API}/api/user`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message;
    } else {
      console.log("User order are", JSON.stringify(data.user));
      setUserInfo(data.user);
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const addNewAddress = async (payload) => {
    setState({ ...state, isLoading: true });
    const response = await fetch(`${NEXT_API}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message;
    } else {
      console.log("User info is " + JSON.stringify(data));
      setUserInfo(data.user);
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };


  // get all users
  const getAllUser = async () => {
    setState({ ...state, isLoading: true });
    // ver
    const resGet = await fetch(`${API_URL}/admin/user_management/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataGet = await resGet.json();

    
    if (!resGet.ok) {
      toast.error(dataGet.message);

    }
    else {

      setState((prevState) => ({ ...prevState, isLoading: false , accounts: dataGet}));
    }



  }


  const value = {
    listCates: state.listCates,
    updateCategories,
    listBrands: state.listBrands,
    updateBrands,
    error: error,
    listProds: state.listProds,
    updateProducts,
    isLoading: state.isLoading,
    getCategories,
    getBrands,
    getProducts,
    addNewAddress,
    userInfo: userInfo,
    getUserInformation,
    employees: state.employees,
    
    allUser: allUser,
    setAllUser,
    productDetail,
    getProductDetail,
    adminProducts: state.productAdmin,
    getProductAdmin,
    setSearchOrderValue,
    searchOrderValue : searchOrderValue,
    getAllCustomer,
    getAllUser,
    getImports,
    imports: state.imports

  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContext;
