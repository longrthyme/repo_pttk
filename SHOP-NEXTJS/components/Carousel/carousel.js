import React from "react";
import { Carousel, Image } from "antd";

function HomeCarousel(props) {
  return (
    <Carousel  autoplay>
      <div>
        <Image src="https://e-commerce-onlineshop.vercel.app/images/slider-img/digital-banner.webp" />
      </div>
      <div>
      <Image src="https://e-commerce-onlineshop.vercel.app/images/slider-img/stationery-banner.webp" />
      </div>
      <div>
      <Image src="https://e-commerce-onlineshop.vercel.app/images/slider-img/toy-banner.webp" />
      </div>
      <div>
      <Image src="https://e-commerce-onlineshop.vercel.app/images/slider-img/house-banner.webp" />
      </div>
    </Carousel>
  );
}

export default HomeCarousel;
