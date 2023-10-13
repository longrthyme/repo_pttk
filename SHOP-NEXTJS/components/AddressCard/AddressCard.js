import OrderContext from "@/context/OrderContext";
import React, { useContext, useState } from "react";

function AddressCard(props) {
  const [selected, setSelected] = useState(false);
  const { setDeliveryAddress, deliveryAddress } = useContext(OrderContext);
  const { data } = props;

  console.log("Data order is ", JSON.stringify(data));

  const selectDeliverAddress = () => {
    setDeliveryAddress(data);
  };

  return (
    <>
      {data && (
        <>
          <div
            className={`border border-solid shadow-lg rounded-md p-4 mt-8  ${
              deliveryAddress && data.id == deliveryAddress.id
                ? "border-primary-400 border-2"
                : ""
            }`}
            onClick={() => selectDeliverAddress()}
          >
            <div>
              <p>{data.city}</p>
              <p className="font-semibold ">{data.address}</p>
              <div className="font-semibold opacity-70">
                <p>Phone number</p>
                <p>{data.phoneNumber}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddressCard;
