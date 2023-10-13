import { API_URL, NEXT_API } from "@/config";
import { Grid, Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardReview from "../Review/CardReview";
import LinearProgress from "@mui/joy/LinearProgress";
import { Textarea } from "@mui/joy";
import AuthContext from "@/context/AuthContext";
import DataContext from "@/context/DataContext";
// import LinearProgress from '@mui/joy/LinearProgress';

function ReviewProduct(props) {
  const [value, setValue] = useState(2);

  const { data } = props;

  const [reviews, setReviews] = useState(null);

  const [reviewContent, setReviewContent] = useState("");

  const [rating, setRating] = useState(1);

  const { user } = useContext(AuthContext);

  const {productDetail, getProductDetail} = useContext(DataContext);

  const onChange = (e) => {
    setReviewContent(e.target.value);
  };

  console.log("Content review is ", reviewContent, " ", rating);

  const submitReview = async () => {
    if (user == null) {
      toast.error("Login to review !");
      return;
    }

    if (reviewContent == "") {
      toast.error("Write your review first");
      return;
    }

    const payload = {
      comment: reviewContent,
      rating: rating,
      productId: data.id,
    };    
    // ver
    const resGet = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    const dataGet = await resGet.json();
    if (!resGet.ok) {
      toast.error(dataGet.message);
    } else {
      toast.success("Review successful !");
      getProductDetail(data.id);
    }
  };

  useEffect(() => {
    (async () => {
      // ver      
    const resGet = await fetch(`${API_URL}/reviews/list-all/${productId}`, {
      method: "GET"
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      toast.error(dataGet.message );
    } else {    
      setReviews(restData.reviews);
    }

    })();
  }, [productDetail]);

  return (
    <div className="mt-4">
      <Grid container spacing={2}>
        <Grid item xs={7} >
          <div className="w-1/2">
            <h2 className="font-bold mb-2">Write your review </h2>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Textarea
              // showcount
              maxLength={100}
              style={{
                height: 120,
                resize: "none",
              }}
              onChange={onChange}
              placeholder="write some your reviews about this product"
            />
            <button
              className="px-4 py-1.5 bg-primary-600 text-white hover:bg-primary-800 text-semibold rounded-md mt-4"
              onClick={submitReview}
            >
              {" "}
              Review{" "}
            </button>
            {reviews && reviews.map((review, index) => <CardReview review={review} key={index} />)}
          </div>
        </Grid>

        <Grid item xs={5}>
          <h2 className="font-bold mb-4"> Product ratings </h2>
          <Rating name="simple-controlled" value={5} readOnly />
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h2>Excellent</h2>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="primary" determinate value={60} />
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h2>Very good</h2>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="success" determinate value={50} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h2>Good</h2>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="yellow" determinate value={40} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h2>Average</h2>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="purple" determinate value={30} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h2>Poor</h2>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="danger" determinate value={20} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReviewProduct;
