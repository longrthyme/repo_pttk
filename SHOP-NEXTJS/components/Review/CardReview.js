import { Rating } from "@mui/material";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";

function CardReview(props) {
  const { review } = props;
  return (
    <div className="mt-4 p-2 flex flex-col rounded-2xl">
      <div className="flex">
        <div>
          <Image
            src={review.customer.imgURL}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        <div className="ml-4 flex flex-col ml-4">
          <h2 className="font-bold">{review.customer.username}</h2>
          <h2 className="opacity-70">
            {moment(review.reviewTime).format("MMM Do YY")}
          </h2>
          <Rating name="simple-controlled" value={review.rating} readOnly />
          <h2 className="mt-2">Danh gia comment </h2>
        </div>
      </div>
    </div>
  );
}

export default CardReview;
