import React, { useState } from 'react';
import axios from 'axios';


const useMutation = ({ url = '', method = "POST" }: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const mutate = async (body: any = {}, params = {}, headers = {}) => {
        const purifyObject = (input: any) => {
            if (body?.formData) {
                return body?.formData
            } else {
                let bodyToQuery: any = {};
                Object.keys(input).map((item: any) => {
                    if (input[item] !== null && input[item] !== undefined && input[item] !== '') {
                        bodyToQuery[item] = input[item]
                    }
                })
                return bodyToQuery
            }
        }
        return axios({
            url: url,
            method: method,
            headers: headers,
            data: purifyObject(body),
            params: purifyObject(params)
        });
    };

    return { data, loading, mutate };
};

export default useMutation;