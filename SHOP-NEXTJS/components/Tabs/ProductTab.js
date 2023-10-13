import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import ProductInfomation from "../Product/ProductInfomation";
import ReviewProduct from "./ReviewProduct";

function ProductTab({ data }) {
  const [rate, setRate] = React.useState(3);

  const [value, setValue] = React.useState("information");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="More information" value="information" />
            <Tab label="Reviews" value="review" />

          </TabList>
        </Box>
        <TabPanel value="information">
          <ProductInfomation dataInfor = {data} />
        </TabPanel>
        <TabPanel value="review">
          <ReviewProduct data= {data}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default ProductTab;
