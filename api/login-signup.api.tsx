import axios from "axios";
import {idpApi,sejamApi} from "./constants";

export const smsNotification = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const log = await axios.get(`${idpApi}notifications/register/sms?${bodyToQuery.join('&')}`)
        .then(({data}) => {
            return data
        })
    return log
}

export const verifyToken = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const log = await axios.get(`${sejamApi}ValidateTokenAndMarketer?${bodyToQuery.join('&')}`)
        .then(({data}) => {
            return data
        })
    return log
}

export const register = async (body:any) => {
    let bodyToPost:any= {};
    Object.keys(body).map((item:any)=>{
        if (item !== 'passwordConfirm'){
            bodyToPost[item] = body[`${item}`]
        }
    })
    const log = await axios.post(`${idpApi}register`,bodyToPost)
        .then(({data}) => {
            return data
        })
    return log
}