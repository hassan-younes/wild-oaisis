import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
export function useCheckout() {
  const id=useParams('bookingId')

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id)=>updateBooking(id,{
      status:"checked-out"
    }),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["booking"] });
      toast.success(`booking ${id.bookingId} successfully checked in`);
    },
    onError: (err) => toast.error(err.message),
  });

  return {mutate,isLoading };
}
