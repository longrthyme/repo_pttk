import { Grid } from "@mui/material";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function ProductInfomation({ dataInfor }) {
  return (
    <div>
      <div className="mt-8">
        <Grid container>
          <Grid item xs={8}>
            <span className="font-extralight text-lg mb-4">Overal description : </span>
            <span
              className="text-black"
              dangerouslySetInnerHTML={{ __html: dataInfor.description }}
            ></span>
          </Grid>

          <Grid item xs={4}>
            <p className="font-extralight text-lg mb-4">Details </p>
            {dataInfor.details.map((item, index) => (
              <div className="italic flex" key={index}>
                <p>{item.name} : </p>
                <p>{item.value}</p>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProductInfomation;
