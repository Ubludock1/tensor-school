import { useContext, useEffect, useState } from "react";
import MyType from "./Type";
import { useNavigate } from "react-router-dom";

function useFetch(query:string,token:string){
    const [data,setData] = useState<MyType>({} as MyType);
    const navigate = useNavigate();

    useEffect(()=>{
        if(token!==""){
            fetch(query, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                  }
                  else {
                    return res.json()
                  }
            }).then((dataa) => {
                setData(dataa);
            }).catch(function (error) {
                navigate("/eroor:"+error)
            }) 
        }
    },[query,token]);

    return data;
}
export default useFetch;