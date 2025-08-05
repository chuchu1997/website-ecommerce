/** @format */

// components/Navbar.jsx

import { CategoryAPI } from "@/api/categories/category.api";
import MainNavbar from "./components/NavbarClient";
// import { AppSidebar } from "../../app-sidebar";
import { CategoryInterface } from "@/types/category";
import NavbarClientVer2 from "./components/NavbarClientVer2";
import { StoreInterface } from "@/types/store";

interface Props {
  storeInfo: StoreInterface;
  categories: CategoryInterface[];
}

const Navbar = async ({ storeInfo, categories }: Props) => {
  return (
    <nav className=" ">
      <NavbarClientVer2
        categoriesProps={categories}
        storeInfoProps={storeInfo}
      />
    </nav>
  );
};

export default Navbar;
