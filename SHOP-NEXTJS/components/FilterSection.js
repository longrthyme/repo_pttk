import DataContext from "@/context/DataContext";
import { useFilterContext } from "@/context/FilterContext";
import { Image } from "antd";
import React, { useContext } from "react";
import SpinTip from "./loading/SpinTip";

function FilterSection(props) {
  const { listCates, isLoading } = useContext(DataContext);
  const { filter_cate, setFilterCate, setCurrentPage } = useFilterContext();

  console.log("Ds cate " + JSON.stringify(listCates));

  const getUniqueData = (listItem) => {
    return [
      {
        image:
          "http://res.cloudinary.com/dhkf8una1/image/upload/v1688952042/ajw8ywngoglmxhnawccs.png",
        id: -1,
        name: "All",
      },
      ...new Set(
        listItem.map((item) => ({
          image: item.imageUrl,
          id: item.id,
          name: item.name,
        }))
      ),
    ];
  };

  const categoryData = getUniqueData(listCates);

  const updateFilterCate = (e) => {
    console.log("selected cate ", e.target.value);
    setFilterCate(e);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col">
      {!isLoading ? (
        <>
          <h3 className="font-bold text-md"> Category </h3>

          <ul>
            {categoryData.map((cate) => (
              <div
                className={`flex items-center mt-2 hover:bg-gray-400 px-2.5 py-1 rounded-md w-2/3 font-md  ${
                  cate.id == filter_cate ? "active" : ""
                }`}
                key={cate.id}
              >
                <Image
                  src={cate.image}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <button
                  value={cate.id}
                  className={`block ml-2 mt-2 text-gray-600 p-2 border-1 border-solid `}
                  onClick={(e) => updateFilterCate(e)}
                >
                  {cate.name}
                </button>
              </div>
            ))}
          </ul>
        </>
      ) : (
        <SpinTip />
      )}
    </div>
  );
}

export default FilterSection;
