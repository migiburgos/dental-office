import "./App.css";

import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Navbar from "./components/Navbar";

import SnackContextProvider from "./context/SnackContext";
import SnackBar from "./components/SnackBar";
import AuthModalContextProvider from "./context/AuthModalContext";
import { AuthModal } from "./components";
import AppRoutes from "./routes";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  return (
    <SnackContextProvider>
      <AuthModalContextProvider>
        <ScopedCssBaseline>
          <Navbar />
          <Toolbar />
          <LoadingIndicator />
          <AppRoutes />
        </ScopedCssBaseline>
        <AuthModal />
        <SnackBar />
      </AuthModalContextProvider>
    </SnackContextProvider>
  );
}

export default App;
