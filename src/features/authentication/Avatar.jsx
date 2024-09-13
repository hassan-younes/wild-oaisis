import styled from "styled-components";
import useUser from "./useUser";

const Styledavatar=styled.div`
    display:flex;
    align-items: center;
    gap:0.5rem;    
    margin-left: auto;
`;
const Image=styled.img`
    width: 4rem;
    border-radius: 50%;
`;
function Avatar() {
    const {user}=useUser()
    const{ id:userId,user_metadata:{fullName,photoName}}=user

    const imagePath="https://hypssvjzqqqotzbfvhph.supabase.co/storage/v1/object/public/avatars/"
    const image= photoName?imagePath+userId+"/"+photoName:"/default-user.jpg"

 
 
    return (
        <Styledavatar>
        <Image src={image} alt="" />
        <p>{fullName}</p>
        </Styledavatar>
    )
}

export default Avatar
