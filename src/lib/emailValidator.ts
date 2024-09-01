const emailValidator = (inputVal: string) => {
  if (
    !new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(inputVal)
  ) {
    return 'Enter a valid email address';
  } else {
    return '';
  }
};

const passwordValidator = (inputVal: string) => {
  if (
    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(inputVal)
  ) {
    return 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers';
  } else {
    return '';
  }
};

const confirmPasswordValdiator = (inputVal: string, firstPass: string) => {
  if (inputVal != firstPass) {
    return 'Passwords should be the same';
  } else {
    return '';
  }
};

export { emailValidator, passwordValidator, confirmPasswordValdiator };
