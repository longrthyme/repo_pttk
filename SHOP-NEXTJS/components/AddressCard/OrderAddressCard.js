import React from "react";

function OrderAddressCard({data}) {
  return (
    <div
      className={`border border-solid shadow-lg rounded-md p-4 mt-8 
            }`}
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
  );
}

export default OrderAddressCard;
