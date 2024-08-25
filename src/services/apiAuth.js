
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
export async function getCurrentUser(){
  const {data:session} = await supabase.auth.getSession()
  
  if(!session) return null;
const {data,error}=await supabase.auth.getUser()
if(error) throw new Error("user could not be loaded");
 console.log(data)
return data?.user 
}