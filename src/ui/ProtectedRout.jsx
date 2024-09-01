import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import useUser from "../features/authentication/useUser"
import Spinner from "./Spinner"
const FullPage=styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
function ProtectedRout({children}) {
    const navigate=useNavigate()
    const {isAuthenticated,user,isLoading}=useUser()
    useEffect(function(){
        if(!isAuthenticated && !isLoading) navigate(-1)
       },[isAuthenticated,isLoading,navigate])
    if(isLoading) return( 
        <>
    <FullPage>
    <Spinner/>
    </FullPage>
    </>)
      
    return (
        children
    )
}

export default ProtectedRout
