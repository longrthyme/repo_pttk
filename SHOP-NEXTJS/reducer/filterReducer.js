import DataContext from "@/context/DataContext";
import { useContext } from "react";

export const intialState = {
  filter_products: [],
  all_product: [],
  currentPage: 1,
  filters: {
    filter_cate: "",
    filter_brand: "",
    filter_price: "",
    filter_product: ""
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_FILTER":
      return {
        ...state,
        filters: {...state.filters, filter_cate: action.payload}
      };

    case "LOAD_INITIAL_PRODUCT":
      return {
        ...state,
        filter_products: action.payload,
        all_product: action.payload,
      };
    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      console.log(
        "value filter " + name + " " + value
      );
      return { ...state, 
        filters: { ...state.filters, [name]: value } };
    case "CURRENT_PAGE_REFRESH":
      return { ...state, currentPage: action.payload };
    case "FILTER_PRODUCTS":
      console.log("vao reducer filter prods " + state.filters.text);
      if (state.all_product.length > 0) {
        let tempFilteredProducts = null;

        if (state.filter_cate != -1) {
          console.log("vao filter cate reducer ");
          tempFilteredProducts = state.all_product.filter(
            (prod) => prod.category == state.filter_cate && prod.enabled == true
          );

          console.log("ds after filter " + JSON.stringify(tempFilteredProducts));
          console.log("do dai after filter " + tempFilteredProducts.length);
        } else
        if (state.filters.text != "") {
          console.log("vao filter condition " + state.filters.text);
          tempFilteredProducts = state.all_product.filter(
            (prod) => prod.name.includes(state.filters.text)
          )
        } else {
          tempFilteredProducts = [...state.all_product];
        }

        console.log("Ds after " + JSON.stringify(tempFilteredProducts));
        console.log("length after " + (tempFilteredProducts.length));

        return { ...state, filter_products: tempFilteredProducts };
      }

      return { ...state };
  }
};
