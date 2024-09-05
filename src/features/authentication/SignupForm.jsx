import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useEffect, useState,useRef } from "react";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import useValidate from "./useValidate";
function SignupForm() {
  const [formData,setFormdata]=useState({fullName:"",email:"",password:"",passwordConfirm:"" })
  const {fullName,email,password,passwordConfirm}=formData
  const {signup,isLoading}=useSignup()
  const ref=useRef()
  const{error,validate,isFormValid:validation}=useValidate(formData)
console.log(error)
   async function handleSubmit(e){
    e.preventDefault();
 
    if (!validation){return ref.current.focus()}
    signup({fullName,email,password},
      {onSettled:()=>{
        setFormdata({fullName:"",email:"",password:"",passwordConfirm:"" })
      }}
    )
  }

  useEffect(function()
    {
     ref.current.focus()
    },[ref]);
  
function hanldeOnChange(e){
  setFormdata((data)=>({...data,passwordConfirm:e.target.value}))
  validate()
}
return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Full name" error={error.fullName}>
        <Input disabled={isLoading} ref={ref} onBlur={validate} error={error.fullName} type="text" value={fullName} name="fullName" id="fullName" onChange={(e)=>setFormdata((data)=>({...data,fullName:e.target.value}))} />
      </FormRow>

      <FormRow label="Email address" error={error.email}>
        <Input disabled={isLoading} onBlur={validate} error={error.email} type="text" value={email} id="email" name="email" onChange={(e)=>setFormdata((data)=>({...data,email:e.target.value}))} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={error.password}>
        <Input disabled={isLoading} onBlur={validate} error={error.password} type="password" value={password}  id="password" name="password" onChange={(e)=>setFormdata((data)=>({...data,password:e.target.value}))} />
      </FormRow>

      <FormRow label="Repeat password" error={error.passwordConfirm}>
        <Input disabled={isLoading} onBlur={validate} error={error.passwordConfirm} type="password" value={passwordConfirm} onChange={(e)=>setFormdata((data)=>({...data,passwordConfirm:e.target.value}))}  id="passwordConfirm" />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading } minWidth="asd" variation={isLoading? "loading":"primary"}>{!isLoading?"Create new user":<SpinnerMini process="Creating.."/>}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
