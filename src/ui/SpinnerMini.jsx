import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled(BiLoaderAlt)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;
const SpinnerContainer=styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`

export default function SpinnerMini({process=""}){
 
 if(process==="") return <Spinner/>
 
 return (
 <SpinnerContainer>
<span>{process}</span><span><Spinner/></span>
</SpinnerContainer>)
}
