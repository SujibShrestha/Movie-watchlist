import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main style={{ padding: "20px" }}>
        {/* This is where page content will appear */}
        <Outlet />
      </main>

      <footer>© 2026 PopcornList</footer>
    </>
  );
};

export default MainLayout;
