 
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useState } from "react";
import { validEmail, validPassword } from './Regex';


function SignupForm() {
  const [formData,setFormdata]=useState({fullName:"",email:"",password:"",passwordConfirm:"" })
  const {fullName,email,password,passwordConfirm}=formData
  const [error,setError]=useState({fullName:"",email:"",password:"",passwordConfirm:"" })
  function validate(){
let validation = true;
   { (fullName === "")? setError((error)=>({...error,fullName:"please enter a user Full Name"})):setError((error)=>({...error,fullName:"valaid"}))
    }
  if(email!==""){!validEmail.test(email)? setError((error)=>({...error,email:"email is invalid"})):setError((error)=>({...error,email:"valaid"}))
    }
   if(password!==""){ password.length<=8? setError((error)=>({...error,password:"password needs a minimum of 8 charcter"})):!validPassword.test(password)? setError((error)=>({...error,password:"password is invalid"})):setError((error)=>({...error,password:"valaid"}));
    }
    if(passwordConfirm!==""){(passwordConfirm !== password)? setError((error)=>({...error,passwordConfirm:"passwords need to be matched"})):setError((error)=>({...error,passwordConfirm:"valaid"}))
   }
  if (error.fullName!==""||error.email!==""||error.password!==""||error.passwordConfirm!=="") validation=false
    return validation
  }
  function handleSubmit(e){
e.preventDefault();


}


  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Full name" error={error.fullName}>
        <Input onBlur={validate} error={error.fullName} type="text" value={fullName} name="fullName" id="fullName" onChange={(e)=>setFormdata((data)=>({...data,fullName:e.target.value}))} />
      </FormRow>

      <FormRow label="Email address" error={error.email}>
        <Input onBlur={validate} error={error.email} type="text" value={email} id="email" name="email" onChange={(e)=>setFormdata((data)=>({...data,email:e.target.value}))} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={error.password}>
        <Input onBlur={validate} error={error.password} type="password" value={password}  id="password" name="password" onChange={(e)=>setFormdata((data)=>({...data,password:e.target.value}))} />
      </FormRow>

      <FormRow label="Repeat password" error={error.passwordConfirm}>
        <Input onBlur={validate} error={error.passwordConfirm} type="password" value={passwordConfirm} onChange={(e)=>setFormdata((data)=>({...data,passwordConfirm:e.target.value}))}  id="passwordConfirm" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
