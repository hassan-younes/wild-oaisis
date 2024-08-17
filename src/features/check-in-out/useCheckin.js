import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
export function useCheckin() {
  const id=useParams('bookingId')

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (obj)=>updateBooking(obj.bookingId,obj.data),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["booking"] });
      toast.success(`booking ${id.bookingId} successfully checked in`);
    },
    onError: (err) => toast.error(err.message),
  });

  return {mutate,isLoading };
}
