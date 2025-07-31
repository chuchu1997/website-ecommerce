import { CategoryAPI } from "@/api/categories/category.api"
import { CategoryInterface } from "@/types/category"
import { fetchSafe } from "@/utils/fetchSafe"
import CategoriesListClient from "./categories-list";




export const CategoriesListSSR =  async ()=>{

    let categories:CategoryInterface[] = [];

    
    const res  = await fetchSafe(()=> CategoryAPI.getAllCategoriesOfStore({
        currentPage:1,
        limit:999,
        justGetParent:false
    }),{
        data:{
            categories:[]
        }
    })  
    console.log("DEBUG categories response:", res);


        categories = res?.data?.categories ?? [];





    return <CategoriesListClient categoriesProps={categories}/>
}