import "./App.css";

import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

import Toolbar from "@mui/material/Toolbar";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ScopedCssBaseline>
      <Navbar />
      <Toolbar />
      {/* <Home /> */}
      <Booking />
      {/* <Dashboard /> */}
    </ScopedCssBaseline>
  );
}

export default App;
