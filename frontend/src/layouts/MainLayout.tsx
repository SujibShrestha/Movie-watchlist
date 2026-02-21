import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/ui/Footer.tsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main style={{ padding: "20px" }}>
        {/* This is where page content will appear */}
        <Outlet />
      </main>

     <Footer/>
    </div>
  );
};

export default MainLayout;
