import axios from "axios";
import {sejamApi} from "./constants";

export const getRegistrationState = async () => {
    const log = await axios.get(`${sejamApi}GetRegistrationState`)
        .then(({data}) => {
            return data
        })
    return log
}
