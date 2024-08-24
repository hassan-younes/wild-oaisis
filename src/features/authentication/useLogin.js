import { useMutation, useQueryClient } from "@tanstack/react-query";
import Login from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin(){
const navigate=useNavigate()
    const {mutate,isLoading}=useMutation({
    mutationFn:({email,password})=>Login({email,password}),
onSuccess:()=>{
    toast.success("user logged in successfully")
    navigate("/dashboard")
},
onError: (err) => toast.error(err.message),
})
return {mutate,isLoading}
}