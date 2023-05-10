import axios from "axios";
import {sejamApi} from "./constants";

export const getAllPossibleAgreements = async () => {
    const log = await axios.get(`${sejamApi}GetAllPossibleAgreements`)
        .then(({data}) => {
            return data
        })
    return log
}

export const getAllAgreements = async () => {
    const log = await axios.get(`${sejamApi}GetAllAgreements`)
        .then(({data}) => {
            return data
        })
    return log
}

export const approveAgreements = async (body:any) => {
    const log = await axios.post(`${sejamApi}ApproveUserAgreements`,{agreements:body})
        .then(({data}) => {
            return data
        })
    return log
}