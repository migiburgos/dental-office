import "./App.css";

import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ScopedCssBaseline>
      <Navbar />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* <Home /> */}
      {/* <Booking /> */}
      {/* <Dashboard /> */}
    </ScopedCssBaseline>
  );
}

export default App;
