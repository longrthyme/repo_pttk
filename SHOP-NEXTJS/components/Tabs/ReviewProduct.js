import { API_URL, NEXT_API } from "@/config";
import { Grid, Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardReview from "../Review/CardReview";
import LinearProgress from "@mui/joy/LinearProgress";
import { Textarea } from "@mui/joy";
import AuthContext from "@/context/AuthContext";
import DataContext from "@/context/DataContext";
import { useSession } from "next-auth/react";
// import LinearProgress from '@mui/joy/LinearProgress';

function ReviewProduct(props) {

  const { data } = props;

  const [reviews, setReviews] = useState(null);

  const {productDetail, getProductDetail} = useContext(DataContext);


  useEffect(() => {
    (async () => {
      // ver update
    const resGet = await fetch(`${API_URL}/reviews/list-all/${data.id}`, {
      method: "GET"
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      toast.error(dataGet.message );
    } else {    
      setReviews(dataGet);
    }

    })();
  }, [productDetail]);

  return (
    <div className="mt-4">
      <Grid container spacing={2}>
        <Grid item xs={7} >
        {reviews && reviews.map((review, index) => <CardReview review={review} key={index} />)}
        </Grid>

        <Grid item xs={5}>
          <h2 className="font-bold mb-4"> Product ratings </h2>
          <Rating name="simple-controlled" value={5} readOnly />
          <Grid container alignItems="center" className="mt-8">
            <Grid item xs={3}>
              <h6>Excellent</h6>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="primary" determinate value={60} />
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h6>Very good</h6>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="success" determinate value={50} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h6>Good</h6>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="yellow" determinate value={40} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h6>Average</h6>
            </Grid>

            <Grid item xs={7}>
              <LinearProgress color="purple" determinate value={30} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <h6>Poor</h6>
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
