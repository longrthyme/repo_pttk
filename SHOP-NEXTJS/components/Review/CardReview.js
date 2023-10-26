import { Rating } from "@mui/material";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";

function CardReview(props) {
  const { review } = props;
  return (
    <div className="mt-4 p-2 flex flex-col rounded-2xl border border-grey-600 shadow-sm rounded-lg w-3/4">
      <div className="flex">
        <div>
          <Image
            src={review?.order.customer?.imgURL}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        <div className="ml-4 flex flex-col ml-4">
          <p className="font-bold">{review?.order.customer.username}</p>
          <props className="opacity-70">
            {moment(review.reviewTime).format("MMM Do YY")}
          </props>
          <Rating name="simple-controlled" value={review.rating} readOnly />
          <p className="mt-2">{review?.comment} </p>
        </div>
      </div>
    </div>
  );
}

export default CardReview;
