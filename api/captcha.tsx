import axios from "axios";
import {captchaApi} from "./constants";

export const createCaptchaApi = async (id:string) => {
    const create = await axios.get(`${captchaApi}create?id=${id}`,
        {
            responseType: 'blob',
            headers: {
                'Accept':'*/*',
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return create
}
