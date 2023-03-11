import axios from "axios";
import {sejamApi} from "./constants";

export const getSejamInfo = async () => {
    const log = await axios.get(`${sejamApi}GetSejamInfo`)
        .then(({data}) => {
            return data
        })
    return log
}

export const getBankAccounts = async () => {
    const log = await axios.get(`${sejamApi}GetAllBankAccounts`)
        .then(({data}) => {
            return data
        })
    return log
}