import React from "react";
import { Header } from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen scroll-bar">
      <Header />
      <main className="flex-1 h-full scroll-bar">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
