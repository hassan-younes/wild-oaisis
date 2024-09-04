import { useEffect, useState,useRef } from "react";
import useLogin from "./useLogin";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const {mutate:login,isLoading:isloggingin,error}=useLogin()
  const [email, setEmail] = useState("hassanyounes783@gmail.com");
  const [password, setPassword] = useState("hassan11..");
  const ref =useRef()
  function handleSubmit(e,error) {
    e.preventDefault();;
    if(!email || !password) return
    login({email,password})
  
    }

  
  useEffect(function()
  {
    ref.current.focus()
    
    if(error){
      setEmail("")
      setPassword("")
  }},[error,ref])

  return (
    <Form  onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
        ref={ref}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          required
          disabled={isloggingin}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isloggingin}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button variation={isloggingin? "logging":"primary"} disabled={isloggingin} size="large">{isloggingin? <SpinnerMini/> :"Login"}</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
