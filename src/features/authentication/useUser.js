import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useUser(){
    const navigate=useNavigate()
    const {data:user,isLoading}=useQuery({
        queryKey:["user"],
        queryFn: getCurrentUser,

    })

    console.log()
        
    

    return {user,isAuthenticated:user?.role==="authenticated",isLoading}
}