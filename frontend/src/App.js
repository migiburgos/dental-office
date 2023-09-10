import "./App.css";

import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

import Toolbar from "@mui/material/Toolbar";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

function App() {
  return (
    <ScopedCssBaseline>
      <Navbar />
      <Toolbar />
      <Home />
    </ScopedCssBaseline>
  );
}

export default App;
