import { intialState, reducer } from "@/reducer/filterReducer";
import DataContext from "./DataContext";
import { createContext, useContext, useEffect, useReducer } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const { listProds } = useContext(DataContext);

  console.log("Ds product filter provider " + JSON.stringify(listProds));


    // load initially for all_prod & filter_prod
  useEffect(() => {
    dispatch({ type: "LOAD_INITIAL_PRODUCT", payload: listProds });
  }, [listProds]);


  // update state filter when listProds or filter condition changes
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [state.filters, listProds]);

  const setFilterCate = (e) => {
    dispatch({ type: "CATEGORY_FILTER", payload: e.target.value });
  };

  // temp fix 
  const setCurrentPage = (value) => {
    dispatch({ type: "CURRENT_PAGE_REFRESH", payload: value });
  };

  // filter-based
  const updateFilterValue = (name, value) => {
    console.log("da vao update filter value");
    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  const value = {
    ...state,
    setFilterCate,
    setCurrentPage,
    updateFilterValue,
    dispatch,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
