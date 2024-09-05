import { HiOutlineUser } from "react-icons/hi";
import styled from "styled-components";
import ButtonIcon from "../../ui/ButtonIcon";
import  Logout  from "./Logout";

const StyledHeaderMenus=styled.ul`
    display: flex;
    gap:0.3rem;
`;
export default function HeaderMenus(){
   return( <StyledHeaderMenus>
    <ButtonIcon>
    <HiOutlineUser/>
    </ButtonIcon>
    <ButtonIcon>
        <Logout/>
    </ButtonIcon>
    </StyledHeaderMenus>)
}