/**
 * Validates the input email based on the following rules:
 * - No special characters befor "@".
 * - Dots allowed but not at start/end.
 * - No consecutive dots.
 * - The domain can consist of alphanumeric characters, hyphens (-), and dots (.).
 * - Hyphens cannot be at the start or end of a domain name component and cannot appear consecutively.
 * - The domain must end with a valid TLD consisting of at least two alphabetic characters.
 *
 * @param {string} inputVal - The email to validate.
 * @returns {string} - An error message if the email does not meet the criteria, otherwise an empty string.
 */
const emailValidator = (inputVal: string) => {
  const emailRegEx = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!emailRegEx.test(inputVal)) {
    return 'Enter a valid email address';
  } else {
    return '';
  }
};

/**
 * Validates the input password based on the following rules:
 * - Must contain at least 8 characters.
 * - Must contain at least one uppercase letter.
 * - Must contain at least one lowercase letter.
 * - Must contain at least one number.
 *
 * @param {string} inputVal - The password to validate.
 * @returns {string} - An error message if the password does not meet the criteria, otherwise an empty string.
 */
const passwordValidator = (inputVal: string) => {
  const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
  );
  if (!passwordRegex.test(inputVal)) {
    return 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers';
  } else {
    return '';
  }
};

/**
 * Validates the confirm password based on the following rules:
 * - Checks if confirm password matches a password
 *
 * @param {string} inputVal - The password to validate.
 * @returns {function(string):string} - A function that returns an error message if the confrim password does not match the password, otherwise an empty string
 */
const confirmPasswordValdiator = (firstPass: string) => {
  return (inputVal: string) => {
    if (inputVal != firstPass) {
      return 'Passwords should be the same';
    } else {
      return '';
    }
  };
};

/**
 * Validates the input password based on the following rules:
 * - Must contain at least 3 characters.
 * - Must only contains letters from the english alphabet.
 *
 * @param {string} inputVal - The password to validate.
 * @returns {string} - An error message if the password does not meet the criteria, otherwise an empty string.
 */
const nameValidator = (name: string) => {
  const nameRegex = new RegExp(/^[a-zA-Z]{2,}(?: [a-zA-Z]{3,})*$/);
  if (!nameRegex.test(name)) {
    return 'Name must have minimum 2 to 3 letters per word and should not contain numbers';
  } else {
    return '';
  }
};

/**
 * Validates the input phone number based on the following rules:
 * - Must contain only digits.
 * - Must be between 10 and 15 characters long.
 *
 * @param {string} inputVal - The phone number to validate.
 * @returns {string} - An error message if the phone number does not meet the criteria, otherwise an empty string.
 */
const phoneValidator = (inputVal: string) => {
  const phoneRegex = new RegExp(/^\d{10,15}$/);
  if (!phoneRegex.test(inputVal)) {
    return 'Phone number must be between 10 and 15 digits long and contain only numbers';
  } else {
    return '';
  }
};

/**
 * Validates the input address (street, appartment, block) based on the following rules:
 * - Must contain at least 6 characters.
 * - Numbers and both uppercase and lowercase letters are allowed.
 * - Whitespace characters (spaces, tabs, etc.) are allowed.
 * - Common punctuation characters often found in addresses are allowed.
 *
 * @param {string} inputVal - The address to validate.
 * @returns {string} - An error message if the address does not meet the criteria, otherwise an empty string.
 */
const addressValidator = (name: string) => {
  const nameRegex = new RegExp(/^[0-9A-Za-z\s\.,#'-]{6,}$/);
  if (!nameRegex.test(name)) {
    return 'Address must contain at least 6 characters';
  } else {
    return '';
  }
};

/**
 * Validates the input zip code based on the following rules:
 * - Must be 5 digits possibly followed by a hyphen and 4 digits that designated a more specific location
 *
 * @param {string} inputVal - The zip code to validate.
 * @returns {string} - An error message if the zip code does not meet the criteria, otherwise an empty string.
 */
const zipCodeValidator = (inputVal: string) => {
  const zipCodeRegex = new RegExp(/^\d{5}(?:-?\d{4})?$/);
  if (!zipCodeRegex.test(inputVal)) {
    return 'zip code must be 5 digits possibly followed by a hyphen and 4 digits';
  } else {
    return '';
  }
};

/**
 * Validates the input city name based on the following rules:
 * - Must contain at least 2 characters.
 * - Must only contains letters, spaces, apostrophes, hyphens, and periods.
 *
 * @param {string} inputVal - The city name to validate.
 * @returns {string} - An error message if the city name does not meet the criteria, otherwise an empty string.
 */
const cityValidator = (inputVal: string): string => {
  const nameRegex = new RegExp(/^[A-Za-zÀ-ÿ\s'-\.]{2,100}$/);
  if (!nameRegex.test(inputVal)) {
    return 'City name must have minimum 2 letters and should contain only letters, spaces, apostrophes, hyphens, and periods';
  } else {
    return '';
  }
};

/**
 * Validates the input state name based on the following rules:
 * - Must contain at least 2 characters.
 * - Must only contains letters, spaces, apostrophes, hyphens, and periods.
 *
 * @param {string} inputVal - The state name to validate.
 * @returns {string} - An error message if the state name does not meet the criteria, otherwise an empty string.
 */
const stateValidator = (inputVal: string): string => {
  const nameRegex = new RegExp(/^[A-Za-zÀ-ÿ\s'-\.]{2,100}$/);
  if (!nameRegex.test(inputVal)) {
    return 'State name must have minimum 2 letters and should contain only letters, spaces, apostrophes, hyphens, and periods';
  } else {
    return '';
  }
};

export {
  emailValidator,
  passwordValidator,
  confirmPasswordValdiator,
  nameValidator,
  phoneValidator,
  addressValidator,
  zipCodeValidator,
  cityValidator,
  stateValidator,
};
