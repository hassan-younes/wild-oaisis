import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const [searchParams]=useSearchParams();
    
  const filterValue =searchParams.get("discount") || "all";
  let filteredCabins=[];
  if (!isLoading){
  if (filterValue === "all") filteredCabins=cabins;
  if (filterValue === "no-discount") filteredCabins=cabins.filter(cabin=> cabin.discount === 0);
  if (filterValue === "with-discount") filteredCabins=cabins.filter(cabin=> cabin.discount > 0);
}  
  
  const sortValue=searchParams.get("sort-by") || "name-asc";
  const [field,direction]=sortValue.split("-")
  const modifier= direction === "asc" ? 1 : -1;
  const sortedCabins=(filteredCabins.sort((a,b)=>(a[field]-b[field])*modifier))
  return { isLoading, error, sortedCabins,cabins };
}
