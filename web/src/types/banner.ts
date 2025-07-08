



export interface CTAInterface {
  title: string;
  link: string;
}


export interface BannerInterface  {
    id:number;
    title:string;
    description:string;
    imageUrl:string;
    link:string;
    postion:number;
    cta?:CTAInterface;
}
