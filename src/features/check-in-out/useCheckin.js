import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
export function useCheckin() {
  const id=useParams('bookingId')

  const queryClient = useQueryClient();

  const { mutate, isLoading ,data} = useMutation({
    mutationFn: (bookingId)=>updateBooking(bookingId,{
      status:"checked-in",
      isPaid: true
    }),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["booking"] });
      toast.success(`booking ${id.bookingId} successfully checked in`);
    },
    onError: (err) => toast.error(err.message),
  });

  return {mutate,isLoading };
}
