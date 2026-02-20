import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>
      {/* Parent Route */}
      <Route path="/" element={<MainLayout />}>
        {/* Child Routes render inside <Outlet /> */}

        <Route index element={<Home />} />
        <Route path="watchlist" element={<Watchlist />} />
      </Route>

      {/* Outside layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
