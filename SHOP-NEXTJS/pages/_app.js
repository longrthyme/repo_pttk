import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "@/context/DataContext";
import { FilterProvider } from "@/context/FilterContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../public/css/select2.min.css";
import "../public/css/slick.css";
import "../public/css/jquery.nice-number.min.css";
import "../public/css/jquery.calendar.css";
import "../public/css/add_row_custon.css";
import "../public/css/mobile_menu.css";
import "../public/css/jquery.exzoom.css";
import "../public/css/multiple-image-video.css";
import "../public/css/ranger_style.css";
import "../public/css/jquery.classycountdown.css";
import "../public/css/venobox.min.css";
import "../public/css/responsive.css";

import "../public/css/bootstrap.min.css";
import "../public/css/all.min.css";
import "../public/css/style.css";
import "../public/css/components.css";
import "../public/css/custom.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  title,
  keywords,
  description,
}) {
  // const { Component, pageProps, title, keywords, description } = props;
  const getLayout = Component.getLayout || ((page) => <>{page}</>);

  return (
    <>
      <ToastContainer />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
        
        <script type="text/javascript" src="../js/Font-Awesome.js"></script>
        <script type="text/javascript" src="../js/select2.min.js"></script>
        <script type="text/javascript" src="../js/popper.js"></script>
        <script type="text/javascript" src="../js/tooltip.js"></script>
        <script type="text/javascript" src="../js/moment.min.js"></script>
        
        <script type="text/javascript" src="../js/bootstrap-modal.js"></script>

        {/* <script
          type="text/javascript"
          src="../js/jquery.nicescroll.min.js"
        ></script>
        <script type="text/javascript" src="../js/stisla.js"></script>
        <script type="text/javascript" src="../js/scripts.js"></script>
        <script type="text/javascript" src="../js/custom.js"></script>
      
        <script src="../js/bootstrap.bundle.min.js"></script>

        <script src="../js/simplyCountdown.js"></script>

        <script src="../js/jquery.exzoom.js"></script>

        <script src="../js/jquery.nice-number.min.js"></script>

        <script src="../js/jquery.waypoints.min.js"></script>
        <script src="../js/jquery.countup.min.js"></script>

        <script src="../js/add_row_custon.js"></script>

        <script src="../js/multiple-image-video.js"></script>

        <script src="../js/sticky_sidebar.js"></script>

        <script src="../js/ranger_jquery-ui.min.js"></script>
        <script src="../js/ranger_slider.js"></script>

        <script src="..js/jquery-3.6.0.min.js"></script>

        <script src="..js/slick.min.js"></script>

        <script src="../js/isotope.pkgd.min.js"></script>

        <script src="../js/venobox.min.js"></script>

        <script src="../js/jquery.classycountdown.js"></script>

        <script src="../js/main.js"></script> */}
      </Head>

      <SessionProvider session={session}>
        <AuthProvider>
          <DataProvider>
            <OrderProvider>
              <CartProvider>
                <FilterProvider>
                  <PayPalScriptProvider
                    options={{
                      clientId: "test",
                      components: "buttons",
                      currency: "USD",
                    }}
                  >
                    {getLayout(<Component {...pageProps} />)}
                  </PayPalScriptProvider>
                </FilterProvider>
              </CartProvider>
            </OrderProvider>
          </DataProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
}

App.defaultProps = {
  title: "Website chuyên bán thiết bị điện tử",
  description: "Bán laptop, điện thoại, iphone",
  keywords: "macbooks, iphone, xiaomi",
};
