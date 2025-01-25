import { useState, useEffect } from "react";

const useFetchProducts = (url)=> {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{


        const fetchData = async ()=> {

            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error('Error fetching Data.');
                }
                const result = await response.json();
                setData(result)
            }
            catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }

        };

        fetchData();

    },[])

    return { data,loading,error};

}


export default useFetchProducts;