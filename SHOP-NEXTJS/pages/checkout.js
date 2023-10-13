import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useRouter } from "next/router";
import DeliveryAddressForm from "@/components/Checkout/DeliveryAddressForm";
import OrderSummary from "@/components/Checkout/OrderSummary";
import Payment from "@/components/payment/Payment";
import OrderContext from "@/context/OrderContext";
import { NEXT_API } from "@/config";
import { toast } from "react-toastify";
import CartContext from "@/context/CartContext";

const steps = ["Login", "Delivery address", "Order summary", "Payment"];

function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const router = useRouter();

  const { deliveryAddress, paymentMethod, statusPayment, setStatusPayment } =
    React.useContext(OrderContext);
  console.log("Address is " + JSON.stringify(deliveryAddress));

  const { setCart, getCart } = React.useContext(CartContext);
  React.useEffect(() => {
    const step = new URLSearchParams(router.query).get("step");
    setActiveStep(parseInt(step) || 2);
  }, [router.query]);

  const getNumberOfSteps = (step) => {
    switch (step) {
      case 0:
        return <h2>Step 0</h2>;
      case 1:
        return <DeliveryAddressForm />;
      case 2:
        return <OrderSummary />;
      case 3:
        return <Payment />;
    }
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    router.push(`/checkout?step=${activeStep + 1}`);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    router.push(`/checkout?step=${activeStep - 1}`);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const finishPayment = async () => {
    if (deliveryAddress == null) {
      toast.error("Choose your delivery address at the second step !");
      return;
    }

    if (paymentMethod == null) {
      toast.error("Choose your method payment !");
      return;
    }

    if (paymentMethod === "CASH") {
         // ver
      const resPos = await fetch(`${API_URL}/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address_id: deliveryAddress.id,
          method_payment: "CASH",
        }),
      });

      const postData = await resPos.json();

      console.log("Value post is " + JSON.stringify(postData));

      if (!resPos.ok) {
        toast.error("Lỗi, vui lòng thử lại " + postData.message);
      } else {
        toast.success("Đặt hàng thành công !");
        setStatusPayment(true);
        getCart();
        router.push("/");
      }      
    }
  };

  return (
    <Box sx={{ width: "100%" }} className="p-20">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getNumberOfSteps(activeStep)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {activeStep === steps.length - 1 && (
              <Button onClick={finishPayment}>Finish</Button>
            )}

            {activeStep !== steps.length - 1 && (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

Checkout.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Checkout;
