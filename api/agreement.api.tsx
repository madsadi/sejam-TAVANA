import axios from "axios";
import {sejamApi} from "./constants";

export const getAllPossibleAgreements = async () => {
    const log = await axios.get(`${sejamApi}GetAllPossibleAgreements`)
        .then(({data}) => {
            return data
        })
    return log
}