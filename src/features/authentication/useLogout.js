import { useMutation, useQueryClient } from "@tanstack/react-query";
import {Logout} from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout(){
const navigate=useNavigate()
    const {mutate,isLoading,error}=useMutation({
    mutationFn:Logout,
onSuccess:()=>{
    toast.success("user logged out successfully")
    navigate("/login")
},
onError: (err) => toast.error("There was an error try again"),
})
return {mutate,isLoading,error}
}