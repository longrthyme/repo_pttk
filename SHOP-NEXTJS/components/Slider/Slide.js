// import AliceCarousel from "react-alice-carousel";

import React, { useState } from "react";
import { Image } from "antd";
import Slider from "react-slick";

function Slide({ foundedProd }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const images = foundedProd.images.map((image) => image.imageProduct);

  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = ({ e }) => {
    setActiveIndex(e);
  };

  console.log("Items is " + JSON.stringify(images));

  const items = images.map((image) => {
    console.log("value in is " + image);
    return (
      <Image
        src={image}
        width={100}
        height={100}
        // key={image.id}
        suppressHydrationWarning
      />
    );
  });

  return (
    // <div className="p-2 bg-white flex" >

    //   <AliceCarousel
    //     items={items}
    //     controlsStrategy="alternate"
    //     disableButtonsControls
    //     disableDotsControls
    //     activeIndex={activeIndex}
    //     onSlideChanged={syncActiveIndex}
    //     autoWidth= {true}
    //   />
    //   {activeIndex < items.length - 6 && (
    //     <div className="px-1 py-2.5 bg-gray-100 text-black absolute  top-40 right-2 hover:cursor-pointer">
    //       <KeyboardArrowRightIcon
    //         onClick={() => setActiveIndex(activeIndex + 1)}
    //       />
    //     </div>
    //   )}
    //   {activeIndex > 0 && (
    //     <div className="px-1 py-2.5 bg-gray-100 text-black absolute  top-40 left-2 hover:cursor-pointer">
    //       <KeyboardArrowLeftIcon
    //         onClick={() => setActiveIndex(activeIndex - 1)}
    //       />
    //     </div>
    //   )}
    // </div>

    <Slider {...settings}>
      {images.map((image) => (
        <Image
          src={image}
          width={100}
          height={100}
          // key={image.id}
          suppressHydrationWarning
        />
      ))}
    </Slider>
  );
}

export default Slide;
