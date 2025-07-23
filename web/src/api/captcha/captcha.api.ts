import api from "../interceptor";
const storeID = process.env.NEXT_PUBLIC_STORE_ID || 1;

const url = `/recaptcha`;



export const CaptchaAPI = {



    verifyCaptcha:async(token:string) => {
        return await api({
            method:"POST",
            url:`${url}/verify`,
            data:{
                token
            }
        })

    }

}