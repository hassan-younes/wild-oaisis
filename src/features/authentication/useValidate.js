import { useState } from "react";
import { validEmail, validPassword } from "./Regex";
function useValidate(formData) {
  const { fullName, email, password, passwordConfirm } = formData;
  const [error, setError] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [validation, setValidation] = useState(true);
  function validate() {
    setValidation(true);
    if (fullName !== "") {
      fullName.length <= 5
        ? setError((error) => ({
            ...error,
            fullName: "please enter a user Full Name",
          }))
        : setError((error) => ({ ...error, fullName: "valaid" }));
    } else {
      setError((error) => ({ ...error, fullName: "" }));
    }
    if (email !== "") {
      !validEmail.test(email)
        ? setError((error) => ({ ...error, email: "email is invalid" }))
        : setError((error) => ({ ...error, email: "valaid" }));
    } else {
      setError((error) => ({ ...error, email: "" }));
    }
    if (password !== "") {
      password.length <= 8
        ? setError((error) => ({
            ...error,
            password: "password needs a minimum of 8 charcter",
          }))
        : !validPassword.test(password)
        ? setError((error) => ({ ...error, password: "password is invalid" }))
        : setError((error) => ({ ...error, password: "valaid" }));
    } else {
      setError((error) => ({ ...error, password: "" }));
    }
    if (passwordConfirm !== "") {
      passwordConfirm !== password
        ? setError((error) => ({
            ...error,
            passwordConfirm: "passwords need to be matched",
          }))
        : setError((error) => ({ ...error, passwordConfirm: "valaid" }));
    } else {
      setError((error) => ({ ...error, passwordConfirm: "" }));
    }
    if (
      error.fullName !== "valaid" ||
      error.email !== "valaid" ||
      error.password !== "valaid" ||
      error.passwordConfirm !== "valaid"
    )
      setValidation(false);
    return validation;
  }
  return { error, validate, validation };
}

export default useValidate;
