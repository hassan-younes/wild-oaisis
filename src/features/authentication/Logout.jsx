import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import SpinnerMini from "../../ui/SpinnerMini.jsx"
import useLogout from "./useLogout.js"
function Logout() {
    const {isLoading:isLoggingOut,mutate:logout}=useLogout()
    function handleClick(){
logout()
    }
    return (
       <ButtonIcon onClick={handleClick}>{isLoggingOut?<SpinnerMini/>:<HiArrowRightOnRectangle/>}</ButtonIcon>
    )
}

export default Logout
