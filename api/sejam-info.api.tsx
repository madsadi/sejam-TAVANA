import axios from "axios";
import {sejamApi} from "./constants";
import {bankAccount} from "../components/main/sejam-info/types";

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

export const registerBankAccount = async (body: { bankAccounts:bankAccount|any[] }) => {
    const log = await axios.post(`${sejamApi}RegisterBankAccount`,body)
        .then(({data}) => {
            return data
        })
    return log
}

export const searchCountry = async (CountryName:string) => {
    const log = await axios.get(`${sejamApi}SearchCountry?CountryName=${CountryName}`)
        .then(({data}) => {
            return data
        })
    return log
}

export const searchProvince = async (CountryId:number,ProvinceName:string) => {
    const log = await axios.get(`${sejamApi}searchProvince?CountryId=${CountryId}&ProvinceName=${ProvinceName}`)
        .then(({data}) => {
            return data
        })
    return log
}
export const searchCity = async (query:{CountryId: number, ProvinceId: number, CityName: string}) => {
    const log = await axios.get(`${sejamApi}searchCity?CountryId=${query.CountryId}&ProvinceId=${query.ProvinceId}&CityName=${query.CityName}`)
        .then(({data}) => {
            return data
        })
    return log
}