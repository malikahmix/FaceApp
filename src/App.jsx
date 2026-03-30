

// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Home    from "./pages/home/Home";
import About   from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import SignIn  from "./pages/signin/SignIn";
import SignUp  from "./pages/signup/SignUp";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/"        element={<Home    />} />
          <Route path="/about"   element={<About   />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin"  element={<SignIn  />} />
          <Route path="/signup"  element={<SignUp  />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
