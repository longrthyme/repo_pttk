import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CustomerLayout({ children }) {
  return (
    <div>
      <Header />

      <div className="">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
