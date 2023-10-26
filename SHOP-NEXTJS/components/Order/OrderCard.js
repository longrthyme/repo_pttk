import React from "react";

import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import Image from "next/image";
function OrderCard(props) {

  const {children, data} = props;

  console.log("Data is " , JSON.stringify(data));

  return (
    <div className="shadow-sm p-2 hover:shadow-2xl shadow-black">
      <Grid container spacing={2} className="flex items-center">
        <Grid item xs={6}>
          <div className="flex items-center">
          <img
                className="object-cover cursor-pointer"
                src={data.product.primaryImage} width={50} height={50}
              />
            <h2 className="text-sm font-semibold ml-8">{data.product.name}</h2>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p className="text-black ">$ {(data.product.original_price - data.product.original_price * data.product.discount_percent).toFixed(2)}</p>
          <p className="line-through text-green-600">$ {(data.product.original_price).toFixed(2)}</p>
        </Grid>

        <Grid item xs={4}>
          {true && (
            <div>
              <AdjustIcon className="text-green-600 mr-2 text-sm" />
              <span>Delivered on {data.orderDate}</span>
              <p>Your item has been deliver</p>
            </div>
          )}

          {false && (
            <div>
              <AdjustIcon className="text-green-600 mr-2 text-sm" />
              <span>Expected deliver on March 3</span>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderCard;
