import { useMutation, useQueryClient } from "@tanstack/react-query";
import Login from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: ({ email, password }) => Login({ email, password }),
    onSuccess: (user) => {
      toast.success("user logged in successfully");

      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("provided email or password are incorrect"),
  });
  return { mutate, isLoading, error };
}
