/** @format */

// components/Navbar.jsx

import { CategoryAPI } from "@/api/categories/category.api";
import MainNavbar from "./components/NavbarClient";
// import { AppSidebar } from "../../app-sidebar";
import { CategoryInterface } from "@/types/category";
import NavbarClientVer2 from "./components/NavbarClientVer2";
import NavbarVer3 from "./components/NavbarVer3";

const NavbarComponent = async () => {
  return (
    <nav className=" ">
      <NavbarVer3 />
      {/* <AppSidebar categories={getCategories} />
      <MainNavbar data={categories} /> */}
      {/* This is navbar */}
    </nav>
  );
};

export default NavbarComponent;
