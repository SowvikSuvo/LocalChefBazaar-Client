import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Footer from "../components/Shared/Footer/Footer";
import BackToTop from "../components/Shared/Button/BackToTop";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <main className="flex-1 p-5">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-auto">
          <Footer />
        </footer>
        <BackToTop></BackToTop>
      </div>
    </div>
  );
};

export default DashboardLayout;
