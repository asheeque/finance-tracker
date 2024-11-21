import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "store/store";
import Sidebar from "./components/sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

// Import the font from Google Fonts (adjust path for your setup)
// You can also directly include a font via <link> in public/index.html if preferred

// Create a custom theme with typography settings
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Montserrat', 'Lato', 'sans-serif'", // Specify your global font family
    fontSize: 16, // Base font size
    h1: { fontSize: "3rem" },
    h2: { fontSize: "2.5rem" },
    h3: { fontSize: "1.75rem" },
    h6: { fontSize: "1.5rem" },
    body1: { fontSize: "1.125rem" }, // Slightly larger body text
    body2: { fontSize: "1rem" },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <MainLayout />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

const MainLayout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/"]; // Routes where the sidebar should be hidden

  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex",backgroundColor: "rgb(248, 248, 248)",height:"100vh" }}>
      {showSidebar && <Sidebar />}
      <div
        style={{
          marginLeft: showSidebar ? "300px" : "0",
          padding: "20px",
          width: "100%",
          
        }}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
