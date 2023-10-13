import AdminLayout from "@/layouts/AdminLayout";

import { Col, InputNumber, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DataContext from "@/context/DataContext";

import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
export default function Import() {
  const router = useRouter();
  const [imports, setImports] = useState([]);

  const {listProds} = useContext(DataContext);

  
  
  const [items, setItems] = useState([]);

  
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  
  const { data: session } = useSession();
  const token = session?.accessToken;


  useEffect(() => {

    if(session?.role == "CUSTOMER") {
      router.push("/unauthorized")
    }
  } , [session]);





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

  const removeDetailItem = (index) => setImports(imports.splice(index,1)) 

  const addNewDetail= () => {
    
    setImports([...imports, {
        product: "",
        quantity: 0,
        price: 0
    }]);
  }

  const  onChangQuantity = (e, index) => {

    console.log("Value change " + e);
    const updatedItem = [...imports];
    updatedItem[index]["quantity"] = e;
    setImports(updatedItem);

  }

  const onChangePrice = (e, index) => {

    console.log("Value price " + e);
    const updateItem =  [...imports];
    updateItem[index]["price"] = e;
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

  return (
    <div className="p-10">
      <Col>
        <button
          className="bg-black text-white px-4 py-1 rounded-md mb-4 hover:bg-blue-500"
          onClick={addNewDetail}
        >
          {" "}
          Add{" "}
        </button>
        {imports.map((element, index) => (
          <div className="mb-4 flex items-center" key={index}>

         <Select
         className="w-40"
            showSearch
            placeholder="Select product"
            optionFilterProp="children"
            // onSearch={onSearch}
            // filterOption={filterOption}
            value={element.product}
            onChange= {(e) => onChangeProduct(e, index)}
            options={
                items
            }
          />


            <div className="ml-8">
              <label>Quantity</label>
              <InputNumber min={1} max={100} defaultValue={1}  onChange={(e) => onChangQuantity(e, index)}  />
            </div>

            <div className="ml-8">
              <label>Price</label>
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
        <button
          className="bg-black text-white hover:bg-red-400 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
            onClick={() => createImport()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
Import.getLayout = (page) => <AdminLayout children={page} />;
