import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { Page_Size } from "../../utils/constants";
export function useBookings() {
//filter
  const [searchParams]=useSearchParams();
  const filterValue= searchParams.get("status")
  const filter = !filterValue || filterValue==="all"?null:{field:"status",value:filterValue}
  const queryClient = useQueryClient()
// sort
  const sortValue=searchParams.get("sort-by")||"startDate-asc"
//pagination
const page= Number(searchParams.get("page"))||1


  const [sortby,direction]=sortValue.split("-")

  const {
    isLoading,
    data: {data:bookings,count}={},
    error,
  } = useQuery({
    queryKey: ["bookings",filter,sortValue,page,Page_Size],
    queryFn: ()=>getBookings({page,filter,sort:{sortby,direction}}),
  });
//prefetching data
const pageCount=Math.ceil(count/Page_Size)
if(page<pageCount)
queryClient.prefetchQuery({
  queryKey: ["bookings",filter,sortValue,page+1,Page_Size],
  queryFn: ()=>getBookings({page:page+1,filter,sort:{sortby,direction}}),
})
if(page>1)
queryClient.prefetchQuery({
  queryKey: ["bookings",filter,sortValue,page-1,Page_Size],
  queryFn: ()=>getBookings({page:page-1,filter,sort:{sortby,direction}}),
})
  return { isLoading, error, bookings,count };
}
