// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom"; // Router yahan se hata diya
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Home     from "./pages/home/Home";
import About    from "./pages/about/About";
import Contact  from "./pages/contact/Contact";
import SignIn   from "./pages/signin/SignIn";
import SignUp   from "./pages/signup/SignUp";
import NotFound from "./pages/notfound/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      {/* Router yahan se khatam kar diya kyunke ye main.jsx mein wrap hai */}
      <ScrollToTop />
      <Routes>
        <Route path="/"         element={<Home     />} />
        <Route path="/about"    element={<About    />} />
        <Route path="/contact"  element={<Contact  />} />
        <Route path="/signin"   element={<SignIn   />} />
        <Route path="/signup"   element={<SignUp   />} />
        <Route path="*"         element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}