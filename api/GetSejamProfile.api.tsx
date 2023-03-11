import axios from "axios";
import {sejamApi} from "./constants";

export const getSejamProfile = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const log = await axios.get(`${sejamApi}GetSejamProfile?${bodyToQuery.join('&')}`)
        .then(({data}) => {
            return data
        })
    return log
}