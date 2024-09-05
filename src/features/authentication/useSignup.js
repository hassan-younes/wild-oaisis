import { useMutation } from "@tanstack/react-query";
import { Signup } from "../../services/apiAuth";
import toast from "react-hot-toast";
export default function useSignup() {
  const {
    mutate: signup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      Signup({ fullName, email, password }),
    onSuccess: () => {
      toast.success("user signedUp correctly");
    },
    onError: () => {
      toast.error("there was an error try again please");
    },
  });
  return { signup, error, isLoading };
}
