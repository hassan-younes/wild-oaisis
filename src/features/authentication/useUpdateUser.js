import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updataUserData } from "../../services/apiAuth";
export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (data) => updataUserData(data),
    onSuccess: ({ user }) => {
      {
        console.log("from useUpdateuser", user);
        toast.success("User data has updated");
        queryClient.invalidateQueries(["user"]);
        queryClient.setQueryData(["user"], user);
      }
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate, isLoading, error };
}
