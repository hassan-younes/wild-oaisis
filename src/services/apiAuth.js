import supabase from "./supabase"
async function Login({email,password}) {
  
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          })
          if (error) {
            console.error(error);
            throw new Error("user could not logged in");
          }
          console.log(data)
   return data
}

export default Login
