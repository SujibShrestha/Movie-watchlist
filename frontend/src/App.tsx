import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Routes>
      {/* Parent Route */}
      <Route path="/" element={<MainLayout />}>
        {/* Child Routes render inside <Outlet /> */}

        <Route index element={<Home />} />
        
        <Route path="watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
      </Route>
<Route path="/register" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
      {/* Outside layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
