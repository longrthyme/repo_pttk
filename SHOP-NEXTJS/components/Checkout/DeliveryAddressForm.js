import React, { useContext, useEffect } from "react";
import { Grid, Box, Button, TextField } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import DataContext from "@/context/DataContext";
import SpinTip from "../loading/SpinTip";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import { deepPurple } from "@mui/material/colors";

function DeliveryAddressForm(props) {
  const { addNewAddress, userInfo, getUserInformation, isLoading } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  
  useEffect(() => {
    if(user) {
      getUserInformation();
    }
  }, [user]);   // deps: handle khi context chưa kịp fetch, trigger changes

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target); // get by e.target or e.currentTarget

    const address = {
      city: data.get("city"),
      country: data.get("country"),
      address: data.get("address"),
      zipcode: data.get("zipcode"),
      phoneNumber: data.get("phone"),
    };

    addNewAddress(address);
  };
  return (
    <div className="p-4">
      {
        userInfo != null && <>
        {isLoading? <SpinTip /> : <Grid container spacing={2} className="mt-4">
        <Grid
          item
          xs={12}
          sm={4}
          className="border rounded-e-md shadow-md overflow-y-scroll"
        >
          <div className="border-b cursor-pointer p-5 py-7">
            {
              userInfo.addresses.map((address, index) => <AddressCard data={address} key={index} />)
            }
            <button className="hover:cursor-pointer mt-4 bg-primary-400 text-white font-semibold px-4 py-1.5 rounded-sm" type="button" onClick={() => router.push("/checkout?step=2")}>
              DELIVERY HERE
            </button>
          </div>
        </Grid>
        <Grid item container xs={12} sm={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="City"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="Address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={6}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Zipcode"
                    name="zipcode"
                    label="zipcode"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Phonenumber"
                    name="phone"
                    label="Phone number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
              </Grid>
              <button  className="hover:cursor-pointer mt-4 bg-primary-400 text-white font-semibold px-4 py-1.5 rounded-sm" type="submit">
                ADD ADDRESS
              </button>
            </form>
          </Box>
        </Grid>
      </Grid>}
        </>
      }
    </div>
  );
}

export default DeliveryAddressForm;
