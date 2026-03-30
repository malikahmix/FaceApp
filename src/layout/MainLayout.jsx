// src/layout/MainLayout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

export default function MainLayout({ children }) {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-gray-950" : "bg-slate-50"}`}>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
