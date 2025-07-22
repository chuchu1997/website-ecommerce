import api from "../interceptor"



const url =  "/stores"


const storeID = process.env.NEXT_PUBLIC_STORE_ID || 1;

export const StoreAPI =  {

 getStoreInfo: async ()=>{
      return  await api({
            method:"GET",
            url:`${url}/${storeID}`
        })
    }
}