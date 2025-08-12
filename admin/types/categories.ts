import { SeoType } from "./seo";




export enum CategoryVariant {
  NEWS = "NEWS",
  COURSES = "COURSES",
  SERVICES = "SERVICES",
  PROMOTION = "PROMOTION",
  CONTACT ="CONTACT",
  PROJECTS ="PROJECTS"
}


interface CategoryBase { 
    name:string;
    slug:string;
    storeId:number;
    imageUrl:string;
    description:string;
    parentId?:number|null;
    position?:number
    variant?:CategoryVariant
    seo?:SeoType
    createdAt?:Date;
    updatedAt?:Date;
}

export interface CategoryInterface extends CategoryBase{
    id:number;
};

export interface CategoryWithChildren extends CategoryInterface {
  children?: CategoryWithChildren[];
}
export interface CreateCategoryInterface extends Omit<CategoryBase,"createdAt"|"updatedAt">{
};
export interface UpdateCategoryInterface extends Omit<CategoryInterface,"id">{
    updatedAt:Date;

}