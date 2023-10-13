import React, { Fragment, useState } from "react";
import ProductCard from "./ProductCard";
import { useFilterContext } from "@/context/FilterContext";

function Product({ data, dataLimit, currentPage }) {
  const pages = Math.ceil(data.length / dataLimit);
  const getPaginationData = () => {
    const startIdx = currentPage * dataLimit - dataLimit;
    const endIdx = startIdx + dataLimit;
    return data.slice(startIdx, endIdx);
  };

  const getPageNumbersGroup = () => {
    return new Array(pages).fill().map((_, index) => index + 1);
  };

  return (
    <Fragment>
      {getPaginationData().map((product) => (
            <ProductCard
              
              key={product.id}
              productDetails={product}
            />
          ))}
    </Fragment>
  );
}

export default Product;
