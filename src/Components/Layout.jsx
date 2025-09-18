import React from "react";
import { Header } from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen scroll-bar">
      <Header />
      <main className="flex-1 h-full scroll-bar bg-light-primary"><Outlet /></main>
      <Footer />
    </div>
  );
};

export default Layout;
