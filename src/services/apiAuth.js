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
  if (!session) return;
  const { data } = await supabase.auth.getUser();
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

  return data, error;
}
export { Signup };

// Update user data
export async function updataUserData({
  userId,
  photoName,
  fullName = "",
  avatar = "s",
  password = "",
}) {
  if (!password) {
    const { error, data } = await supabase.auth.updateUser({
      data: {
        fullName: fullName,
      },
    });
    if (error) {
      throw new Error(error.message);
    }

    if (!avatar) return data;
    const { error: photoNameError } = await supabase.auth.updateUser({
      data: {
        photoName: photoName,
      },
    });
    const imageName = userId + "/" + photoName;
    const { error: errorImage } = await supabase.storage
      .from("avatars")
      .upload(imageName, avatar, {
        upsert: true,
      });
    if (errorImage || photoNameError) {
      throw new Error(errorImage.message);
    }
    return data;
  } else {
    const { error, data } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
