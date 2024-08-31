import { ChangeEvent, useEffect, useState } from "react";

type Values = {
  [key: string]: string;
};

type Errors = {
  [key: string]: string | null;
};

const useValidate = () => {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [isInteracted, setIsInteracted] = useState(false);

  const validate = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = { ...errors, email: null };
          setErrors(newObj);
        }
        break;

      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          });
        } else {
          let newObj = { ...errors, password: null };
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const handleFirstInteraction = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let val = event.target.value;

    setIsInteracted(true);
    validate(name, val);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    if (isInteracted) validate(name, val);

    setValues({
      ...values,
      [name]: val,
    });
  };
  return {
    values,
    errors,
    handleChange,
    handleFirstInteraction,
  };
};

export default useValidate;
