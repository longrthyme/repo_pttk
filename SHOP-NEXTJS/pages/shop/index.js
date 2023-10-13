import {  useContext, useState } from "react";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useFilterContext } from "@/context/FilterContext";
import {  Input, } from "antd";
import DataContext from "@/context/DataContext";

import ProductCard from "@/components/Product/ProductCard";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Shop() {
  const { filter_products } = useFilterContext();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { listCates, listProds, listBrands, isLoading } =
    useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState(null);

  const [searchProductName, setSearchProductName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);


  let filteredItems =
    listProds &&
    listProds.filter(
      (product) =>
        product.name.toLowerCase().indexOf(searchProductName.toLowerCase()) !==
        -1
    );

  const filteredData = (listProds, selectedOption, searchProductName) => {
    let filteredProducts = listProds;

    if (searchProductName) {
      filteredProducts = filteredItems;
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.name == selectedBrand
      );
    }

    if (selectedOption) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.original_price === selectedOption ||
          product.category.name == selectedOption
      );
    }
    return filteredProducts;
  };

  const result = filteredData(
    listProds,
    selectedOption,
    searchProductName,
    selectedBrand
  );

  console.log("Dnh sach ket qua product", JSON.stringify(result));

  console.log("Value filterprods", JSON.stringify(result));

  const handleChange = (event) => {
    console.log("Value selected is ", event.target.value);
    setSelectedOption(event.target.value);
  };

  console.log("Value cate ", JSON.stringify(listCates));

  const { Search } = Input;
  return (
    <div className="bg-white">
   <section id="wsus__breadcrumb">
  <div className="wsus_breadcrumb_overlay">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4>categories</h4>
          <ul>
            <li>
              <a href="#">home</a>
            </li>
            <li>
              <a href="#">categories</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="wsus__product_page" className="wsus__category_pages">
  <div className="container">
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-12">
            <form>
              <div className="wsus__product_topbar wsus__category_topbar">
                <div className="wsus__topbar_select">
                  <select className="select_2" name="state">
                    <option>select category</option>
                    <option>men's</option>
                    <option>wemen's</option>
                    <option>kid's</option>
                    <option>electronics</option>
                    <option>electrick</option>
                  </select>
                </div>
                <div className="wsus__topbar_select">
                  <select className="select_2" name="state">
                    <option>default shorting</option>
                    <option>short by rating</option>
                    <option>short by latest</option>
                    <option>low to high </option>
                    <option>high to low</option>
                  </select>
                </div>
                <button className="common_btn" type="submit">
                  filter product
                </button>
              </div>
            </form>
          </div>
          
            {
              [1,1,1,1,1,1].map(product => <ProductCard />)
            }
          <div className="col-xl-12">
            <section id="pagination">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <i className="fas fa-chevron-left" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link page_active" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <i className="fas fa-chevron-right" />
                    </a>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  );
}
Shop.getLayout = (page) => <CustomerLayout children={page} />;
