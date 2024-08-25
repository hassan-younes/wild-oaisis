import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useUser(){
    const navigate=useNavigate()
    const {data,error,isLoading}=useQuery({
        queryKey:["user"],
        queryFn: getCurrentUser,
        onError:(err)=>{toast.error("please sign in first")
           
        }
    })
    
        
    

    return {data,isLoading}
}