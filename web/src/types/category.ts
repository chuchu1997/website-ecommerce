import { ProductInterface } from "./product";
import { SeoInterface } from "./seo";













export enum CategoryVariant {
  NEWS = "NEWS",
  COURSES = "COURSES",
  SERVICES = "SERVICES",
  PROMOTION = "PROMOTION",
  CONTACT ="CONTACT",
}


interface CategoryBase { 
    name:string;
    slug:string;
    storeId:number;
    imageUrl:string;
    description:string;
    parentId?:number|null;
    variant?:CategoryVariant;
    products?:ProductInterface[]
    seo?:SeoInterface
    createdAt?:Date;
    updatedAt?:Date;

    


}
export interface CategoryInterface extends CategoryBase{
    id:number;
    subCategories: CategoryInterface[];

};

// export interface CreateCategoryInterface extends Omit<CategoryBase,"createdAt"|"updatedAt">{
// };
// export interface UpdateCategoryInterface extends Omit<CategoryInterface,"id">{
//     updatedAt:Date;

// }