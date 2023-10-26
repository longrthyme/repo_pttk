import AdminLayout from "@/layouts/AdminLayout";

import { Col, InputNumber, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DataContext from "@/context/DataContext";

import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { API_URL } from "@/config";
import SpinTip from "@/components/loading/SpinTip";
export default function Import() {
  const router = useRouter();
  const [imports, setImports] = useState([]);

  const {listProds} = useContext(DataContext);

  
  
  const [items, setItems] = useState([]);

  
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  

  const { data: session , status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login")
    },
  });
  const token = session?.accessToken;




  useEffect(() => {


    const products = listProds.map(product => (
        {
            label: product.name,
            value: product.id
        }

        
    ));

    setItems(products);


  } , [listProds]);


  console.log("List product add is " + JSON.stringify(items));

  console.log("List update product is " + JSON.stringify(imports));


  // remove an import detail
  const removeDetailItem = (index) => {
    let updateImport = [...imports];
    updateImport.splice(index,1);
    setImports(updateImport);
  } 

  const addNewDetail= () => {
    
    setImports([...imports, {
      import_product: "",
      import_quantity: 0,
      import_price: 0
    }]);
  }

  const  onChangQuantity = (e, index) => {

    console.log("Value change " + e);
    const updatedItem = [...imports];
    updatedItem[index]["import_quantity"] = e;
    setImports(updatedItem);

  }

  const onChangePrice = (e, index) => {

    console.log("Value price " + e);
    const updateItem =  [...imports];
    updateItem[index]["import_price"] = e;
    setImports(updateItem);


  }

  const onChangeProduct = (e, index) => {
    console.log("Value price " + e);
    const updateItem =  [...imports];
    updateItem[index]["product"] = e;
    setImports(updateItem);

  }

  const createImport = async () => {

    const data = {
        importDetails : imports,

        note: ""
    }
      // ver
      const resPos = await fetch(`${API_URL}/imports`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const postData = await resPos.json();

      if (!resPos.ok) {
        toast.error("Loi khi them " + postData.message);
      } else {
        toast.success("Add import success");
        router.push("/admin/import-manage")
      }
  }
  
  if(status === "loading") {
    return <SpinTip />
  } else 


  return (
    <div className="p-10">
      <button onClick={() => router.push("/admin/import-manage")}> 
      <i class="bi bi-arrow-left"></i>
        Go back</button>
      <Col>
      <h2 className="text-center mb-10">Add import details</h2>
        <button
          className="bg-black text-white px-4 py-1 rounded-md mb-4 hover:bg-blue-500"
          onClick={addNewDetail}
        >
          {" "}
          Add one{" "}
        </button>
        {imports.map((element, index) => (
          <div className="mb-4 flex items-center" key={index}>
          Import product name
         <Select
         className="w-40 ml-4"
            showSearch
            placeholder="Select product"
            optionFilterProp="children"
            value={element.import_product}
            onChange= {(e) => onChangeProduct(e, index)}
            options={
                items
            }
          />


            <div className="ml-8">
              <label className="mr-4">Quantity</label>
              <InputNumber min={1} max={100} defaultValue={1}  onChange={(e) => onChangQuantity(e, index)}  />
            </div>

            <div className="ml-8">
              <label className="mr-4">Price</label>
              <InputNumber
                style={{
                  width: 200,
                }}
                defaultValue="1"
                min="0"
                max="300"
                step="0.1"
                onChange={(e) => onChangePrice(e, index)}
                stringMode
              />
            </div>

            {index ? (
              <button
                type="button"
                className="bg-red-400 ml-4 px-2.5 py-1 rounded-md hover:text-white hover:bg-red-700"
                onClick={() => removeDetailItem(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
      </Col>

      <div className="flex justify-center">
        <button
          className="bg-black text-white hover:bg-primary-700 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center mr-10"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        {
          imports.length > 0 ? <button
          className="bg-black text-white hover:bg-red-400 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
            onClick={() => createImport()}
        >
          Submit
        </button> : ""
        }
      </div>
    </div>
  );
}
Import.getLayout = (page) => <AdminLayout children={page} />;
