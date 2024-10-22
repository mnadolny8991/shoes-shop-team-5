import * as validators from "@/lib/validators";

describe('validators', () => {
  test('email validator', () => {
    const validator = validators.emailValidator;
    // No special characters
    expect(validator('no:special@gmail.com')).not.toBe('');
    // No dots at the beggining and end
    expect(validator('.dots.at.start@gmail.com')).not.toBe('');
    expect(validator('dots.at.start@gmail.com.')).not.toBe('');
    // No consec dots
    expect(validator('dots..consec@gmail.com')).not.toBe('');
    // - and . allowed at domain name but not on the end
    expect(validator('dots.at.start@domain-example.aaa.com')).toBe('');
    expect(validator('dots.at.start@domain-example.aaa.com-')).not.toBe('');
    // valid TDL with at least 2 characters
    expect(validator('dots.at.start@domain-example.a')).not.toBe('');
  });

  test('password validator', () => {
    const validator = validators.passwordValidator;
    // At least 8 characters long
    expect(validator('AbC123;')).not.toBe('');
    expect(validator('AbC123;A')).toBe('');
    // At least one uppercase letter
    expect(validator('abc;1bc;')).not.toBe('');
    // At least one uppercase letter
    expect(validator('ABC;1BC;')).not.toBe('');
    // At least one number
    expect(validator('ABC;abc;')).not.toBe('');
    expect(validator('ABC;ab1;')).toBe('');
  });

  test('confirm password validator', () => {
    const firstPassword = 'ABC;ab1;';
    const validator = validators.confirmPasswordValdiator(firstPassword);
    // Passwords are the same
    expect(validator('ABC;ab1;')).toBe('');
    expect(validator('ABC;ab1')).not.toBe('');
  });

  test('name validator', () => {
    const validator = validators.nameValidator;
    // Name must have minimum 2 to 3 letters per word
    expect(validator('AA')).toBe('');
    expect(validator('A')).not.toBe('');
    // Contain only english characters
    expect(validator('chrząszć')).not.toBe('');
    // Should not contain a number
    expect(validator('123a')).not.toBe('');
  });

  test('phone validator', () => {
    const validator = validators.phoneValidator;
    // must contain only digits
    expect(validator('777222333a')).not.toBe('');
    // must contain at least 10 up to 15 characters
    expect(validator('7772223332')).toBe('');
    expect(validator('123456789')).not.toBe('');
  });
});