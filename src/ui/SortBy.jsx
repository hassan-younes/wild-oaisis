import { useSearchParams } from "react-router-dom"
import Select from "./Select"
function SortBy({options}) {
    const [searchParams,setSearchParams]=useSearchParams()
    function handleChange(e){
      
       searchParams.set("sort-by",e.target.value)
       setSearchParams(searchParams)
    }
    return (
        <Select onChange={handleChange}>
            {options.map((option,index)=>
                 <option 
                 value={option.value} key={index}>{option.label}</option>)}
        </Select>
    )
}

export default SortBy
