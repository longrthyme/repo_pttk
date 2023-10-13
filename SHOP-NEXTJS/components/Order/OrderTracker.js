import React from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function OrderTracker({activeStep}) {
  const steps = [
    "New",
    "Order Confirmed",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

export default OrderTracker;
