/** @format */

// components/Navbar.jsx

import { CategoryAPI } from "@/api/categories/category.api";
import MainNavbar from "./components/NavbarClient";
// import { AppSidebar } from "../../app-sidebar";
import { CategoryInterface } from "@/types/category";
import NavbarClientVer2 from "./components/NavbarClientVer2";
import NavbarVer3 from "./components/NavbarVer3";
import { StoreInterface } from "@/types/store";

interface Props {
  categories: CategoryInterface[];
  storeInfo: StoreInterface;
}
const NavbarComponent = async ({ categories, storeInfo }: Props) => {
  return (
    <nav className=" ">
      <NavbarVer3 categoriesProps={categories} storeInfoProps={storeInfo} />
      {/* <AppSidebar categories={getCategories} />
      <MainNavbar data={categories} /> */}
      {/* This is navbar */}
    </nav>
  );
};

export default NavbarComponent;
