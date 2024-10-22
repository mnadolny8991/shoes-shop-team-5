import * as validators from "./validators";

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
});