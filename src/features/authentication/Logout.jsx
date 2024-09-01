import Button from "../../ui/Button"
import SpinnerMini from "../../ui/SpinnerMini.jsx"
import useLogout from "./useLogout.js"
function Logout() {
    const {isLoading:isLoggingOut,mutate:logout}=useLogout()
    function handleClick(){
logout()
    }
    return (
       <Button onClick={handleClick} size="small">{isLoggingOut?<SpinnerMini/>:"Log out"}</Button>
    )
}

export default Logout
