import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ProductCard(props) {
  const { productDetails } = props;

  const router = useRouter();

  return (
    // <div class="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
    //   <a href="#">
    //     <img
    //       class="h-60 rounded-t-lg object-cover"
    //       src={productDetails.primaryImage}
    //       alt="product image"
    //     />
    //   </a>
    //   <span class="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
    //     Sale
    //   </span>
    //   <div class="mt-4 px-5 pb-5">
    //     <Link href={`/product/detail/${productDetails.id}`}>
    //       <h5 class="text-xl font-semibold tracking-tight text-slate-900">
    //         {productDetails.name}
    //       </h5>
    //     </Link>
    //     <div class="mt-2.5 mb-5 flex items-center">
    //       <span class="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
    //         5.0
    //       </span>
    //       <svg
    //         aria-hidden="true"
    //         class="h-5 w-5 text-yellow-300"
    //         fill="currentColor"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //       </svg>
    //       <svg
    //         aria-hidden="true"
    //         class="h-5 w-5 text-yellow-300"
    //         fill="currentColor"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //       </svg>
    //       <svg
    //         aria-hidden="true"
    //         class="h-5 w-5 text-yellow-300"
    //         fill="currentColor"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //       </svg>
    //       <svg
    //         aria-hidden="true"
    //         class="h-5 w-5 text-yellow-300"
    //         fill="currentColor"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //       </svg>
    //       <svg
    //         aria-hidden="true"
    //         class="h-5 w-5 text-yellow-300"
    //         fill="currentColor"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //       </svg>
    //     </div>
    //     <div class="flex items-center justify-between">
    //       <p>
    //         <span class="text-3xl font-bold text-slate-900">
    //           $ {productDetails.original_price}
    //         </span>
    //         <span class="text-sm text-slate-900 line-through">
    //           ${" "}
    //           {(
    //             productDetails.original_price -
    //             productDetails.original_price * productDetails.discount_percent
    //           ).toFixed(2)}
    //         </span>
    //       </p>
    //       <a
    //         href="#"
    //         class="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           class="mr-2 h-6 w-6"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //           stroke-width="2"
    //         >
    //           <path
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    //           />
    //         </svg>
    //         Add to cart
    //       </a>
    //     </div>
    //   </div>
    // </div>

    <div className="col-xl-3 col-sm-6 col-lg-4">
    <div className="wsus__product_item">
      <span className="wsus__new">New</span>
      <span className="wsus__minus">- ${productDetails.discount_percent} %</span>
      <a className="wsus__pro_link" href="product_details.html">
        <img src={productDetails.primaryImage} alt="product" className="img-fluid w-100 img_1" />
        <img src={productDetails.primaryImage} alt="product" className="img-fluid w-100 img_2" />
      </a>
      <ul className="wsus__single_pro_icon">
        <li><a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="far fa-eye" /></a></li>
        <li><a href="#"><i className="far fa-heart" /></a></li>
        <li><a href="#"><i className="far fa-random" /></a>
        </li></ul>
      <div className="wsus__product_details">
        <a className="wsus__category" href="#">fashion </a>
        <p className="wsus__pro_rating">
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star-half-alt" />
          <span>(10 review)</span>
        </p>
        <a className="wsus__pro_name" href={`/product/detail/${productDetails.id}`}>  {productDetails.name}</a>
        <p className="wsus__price">${productDetails.original_price}</p>
        <a className="add_cart" href="#">add to cart</a>
      </div>
    </div>
  </div>
  );
}

export default ProductCard;
