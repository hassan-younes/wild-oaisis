import { HiOutlineUser } from "react-icons/hi";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

import  Logout  from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu=styled.ul`
    display: flex;
    align-items: center;
    gap:0.5rem;
  
`;

export default function HeaderMenus(){
const navigate=useNavigate()
return( 
    <StyledHeaderMenu>
    <li>
    <DarkModeToggle/>
    </li>
    <li>
    <ButtonIcon onClick={()=>navigate("/account")}>
    <HiOutlineUser/>
    </ButtonIcon>
    </li>
    <li>
    <ButtonIcon>
        <Logout/>
    </ButtonIcon>
    </li>
   
    </StyledHeaderMenu>)
}