import { useNavigate } from "react-router-dom";
import supabase from "./supabase";
// Login api
async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("user could not logged in");
  }

  return data;
}

export default Login;

// Log out api
async function Logout() {
  const { error, isLoading } = await supabase.auth.signOut();

  if (error) {
    throw new Error("user could not logged in");
  }

  return { isLoading };
}

export { Logout };

// getting user information
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;
  const { data, error } = await supabase.auth.getUser();
  return data?.user;
}
async function Signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: fullName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}
export { Signup };
