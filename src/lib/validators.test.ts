import * as validators from "./validators";

describe('validators', () => {
  test('email validator', () => {
    const validator = validators.emailValidator;
    expect(validator('no:special@gmail.com')).not.toBe('');
    expect(validator('.dots.at.start@gmail.com')).not.toBe('');
    expect(validator('dots.at.start@gmail.com.')).not.toBe('');
    expect(validator('dots..consec@gmail.com')).not.toBe('');
    expect(validator('.dots.at.start@gmail.com')).not.toBe('');
    expect(validator('dots.at.start@domain-example.aaa.com')).toBe('');
    expect(validator('dots.at.start@domain-example.aaa.com-')).not.toBe('');
    expect(validator('dots.at.start@domain-example.a')).not.toBe('');
  })
});