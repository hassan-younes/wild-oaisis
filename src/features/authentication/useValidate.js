import { useState, useEffect } from "react";
import { validEmail, validPassword } from "./Regex";

function useValidate(formData) {
  const { fullName, email, password, passwordConfirm } = formData;

  const [error, setError] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Helper function for validation
  const validateField = (value, validCheck, errorMessage) => {
    if (value === "") return "";
    return validCheck ? "valid" : errorMessage;
  };

  function validate() {
    setError({
      fullName: validateField(
        fullName,
        fullName.length > 5,
        "please enter a valid Full Name"
      ),
      email: validateField(email, validEmail.test(email), "email is invalid"),
      password: validateField(
        password,
        password.length >= 5 && validPassword.test(password),
        password.length <= 8
          ? "password needs a minimum of 8 characters"
          : "password is invalid"
      ),
      passwordConfirm: validateField(
        passwordConfirm,
        passwordConfirm === password,
        "passwords need to be matched"
      ),
    });
  }

  useEffect(() => {
    const isValid =
      error.fullName === "valid" &&
      error.email === "valid" &&
      error.password === "valid" &&
      error.passwordConfirm === "valid";

    setIsFormValid(isValid);
    setIsDisabled(!isValid);
  }, [error]);

  return { error, isDisabled, validate, isFormValid };
}

export default useValidate;
