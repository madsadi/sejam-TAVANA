import axios from "axios";
import {fileServerApi} from "./constants";

export const getContent = async () => {
    const log = await axios.get(`${fileServerApi}get-content?fileOwnerSoftware=1`)
        .then(({data}) => {
            return data
        })
    return log
}

export const uploadPhoto = async (body: any) => {
    const log = await axios.post(`${fileServerApi}upload`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(({data}) => {
            return data
        })
    return log
}

export const downloadContent = async (id: string) => {
    const log = await axios.get(`${fileServerApi}download?id=${id}`, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(({data}) => {
            return data
        })
    return log
}