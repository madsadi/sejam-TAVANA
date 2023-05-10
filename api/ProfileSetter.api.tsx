import axios from "axios";
import {sejamApi} from "./constants";

export const addCustomerProfileInfo = async (body:any) => {
    let bodyToPost:any= {};
    Object.keys(body).map((item:any)=>{
        if (body[item] !== undefined && body[item] !== null && body[item] !== '' && item !== 'captcha' && item !== 'uuid'){
            bodyToPost[item] = body[`${item}`]
        }
    })
    const log = await axios.post(`${sejamApi}AddCustomerProfileInfo`,bodyToPost)
        .then(({data}) => {
            return data
        })
    return log
}
export const isSejami = async () => {
    const log = await axios.get(`${sejamApi}IsSejami`)
        .then(({data}) => {
            return data
        })
    return log
}
export const sejamStatus = async () => {
    const log = await axios.get(`${sejamApi}SejamStatus`)
        .then(({data}) => {
            return data
        })
    return log
}
export const getSejamKYCToken = async () => {
    const log = await axios.post(`${sejamApi}getSejamKYCToken`)
        .then(({data}) => {
            return data
        })
    return log
}
