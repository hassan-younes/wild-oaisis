import styled from "styled-components"
import useUser from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
const FullPage=styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
function ProtectedRout({children}) {
    const navigate=useNavigate()
    const {data:user,isLoading}=useUser()
    if(isLoading) return( 
        <>
    <FullPage>
    <Spinner/>
    </FullPage>
    </>)
    if(!user){ navigate("/login")}
    return (
        children
    )
}

export default ProtectedRout
