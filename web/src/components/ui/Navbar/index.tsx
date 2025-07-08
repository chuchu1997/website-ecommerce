/** @format */

// components/Navbar.jsx

import { CategoryAPI } from "@/api/categories/category.api";
import MainNavbar from "./components/NavbarClient";
import { AppSidebar } from "../../app-sidebar";
import { CategoryInterface } from "@/types/category";
import NavbarClient from "./components/NavbarClient";

const Navbar = async () => {
  let categories: CategoryInterface[] = [];

  try {
    const response = await CategoryAPI.getAllCategoriesOfStore({
      justGetParent: false,
    });

    if (response.status === 200) {
      const data = response.data as { categories: CategoryInterface[] };
      categories = data.categories;
    }
  } catch (error) {
    console.log("BASE url", process.env.API_INTERNAL_URL);
    console.error("Failed to fetch categories in Navbar:", error);
  }

  //LẤY TẤT CẢ CATEGORIES BAO GỒM CẢ CATEGORY CON!!

  return (
    <nav className=" ">
      <NavbarClient />
      {/* <AppSidebar categories={getCategories} />
      <MainNavbar data={categories} /> */}
      {/* This is navbar */}
    </nav>
  );
};

export default Navbar;
