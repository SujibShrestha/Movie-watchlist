import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/ui/Footer.tsx";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main style={{ padding: "20px" }}>
        {/* This is where page content will appear */}
        <Outlet />
      </main>

     <Footer/>
    </>
  );
};

export default MainLayout;
