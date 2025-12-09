import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import BackToTop from "../components/Shared/Button/BackToTop";
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
      <BackToTop></BackToTop>
    </div>
  );
};

export default MainLayout;
