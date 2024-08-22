import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

import { useMoveBack } from "../../hooks/useMoveBack";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const moveBack=useMoveBack()
  const { isLoading, mutate} = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      moveBack();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate };
}
