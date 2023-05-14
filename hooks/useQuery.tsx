import { useState, useEffect } from 'react';
import axios from 'axios';


const useQuery = ({ url='',params={},revalidateOnMount=false }) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState<any>(null);

    const fetchData = async (query:any={}) => {
        let bodyToQuery:any={};
        if (query){
            Object.keys(query).map((item:any)=>{
                if (query[item]!==null && query[item]!==undefined && query[item]!==''){
                    bodyToQuery[item]=query[item]
                }
            })
        }
        await axios.get(url , {params:bodyToQuery})
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setQuery(query)
                setLoading(false);
            });
    };
    const fetchAsyncData = async (query:any={},endpoint='',responseType:any='') => {
        let bodyToQuery:any={};
        if (query){
            Object.keys(query).map((item:any)=>{
                if (query[item]!==null && query[item]!==undefined && query[item]!==''){
                    bodyToQuery[item]=query[item]
                }
            })
            setQuery(bodyToQuery)
        }
        return axios.get(url || endpoint, {params:bodyToQuery,responseType:responseType})
    };

    useEffect(() => {
        if (revalidateOnMount) fetchData(params);
    }, []);

    return { data, error, loading,query, fetchData,fetchAsyncData };
};

export default useQuery;