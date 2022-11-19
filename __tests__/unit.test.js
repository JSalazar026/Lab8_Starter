// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2

test('3 character hex code is valid color', () => {
  expect(functions.isHexColor('ABC')).toBe(true);
});
test('6 character hex code is valid color', () => {
  expect(functions.isHexColor('FF5733')).toBe(true);
});
test('3 character code with random letter is invalid color', () => {
  expect(functions.isHexColor('DN7')).toBe(false);
});
test('6 character code with random letter is invalid color', () => {
  expect(functions.isHexColor('290M70')).toBe(false);
});


test('Dates of the form X/XX/YYYY are valid dates', () => {
  expect(functions.isDate('1/21/2022')).toBe(true);
});
test('Dates of the form XX/X/YYYY are valid dates', () => {
  expect(functions.isDate('11/6/1985')).toBe(true);
});
test('Dates of the form XX/XX/YY are invalid dates', () => {
  expect(functions.isDate('01/16/01')).toBe(false);
});
test('Dates of the form X/X/YYYYY are invalid dates', () => {
  expect(functions.isDate('1/2/35402')).toBe(false);
});


test('Passwords starting with a letter, and 8 letters/numbers/underscores are strong', () => {
  expect(functions.isStrongPassword('Jk27_awes')).toBe(true);
});
test('Passwords starting with a letter, and 8 letters/underscores are strong', () => {
    expect(functions.isStrongPassword('Jk_aws_em')).toBe(true);
});
test('Otherwise valid passwords that are longer than 15 characters are not strong', () => {
  expect(functions.isStrongPassword('DeltaAlphaOmega6')).toBe(false);
});
test('Otherwise valid passwords that are shorter than 4 characters are not strong', () => {
  expect(functions.isStrongPassword('A_4')).toBe(false);
});


test('emails with .edu ending after the @ are valid emails', () => {
  expect(functions.isEmail('jlsalazar@ucsd.edu')).toBe(true);
});
test('emails with .com ending after the @ are valid emails', () => {
  expect(functions.isEmail('myOwnEmail@gmail.com')).toBe(true);
});
test('emails without the @ are not valid emails', () => {
  expect(functions.isEmail('ucsdStudentsAtaol.com')).toBe(false);
});
test('emails with no text after @ are not valid emails', () => {
  expect(functions.isEmail('jlsalazar@')).toBe(false);
});


test('Phone numbers of the form (XXX)XXX-XXXX are valid phone numbers', () => {
  expect(functions.isPhoneNumber('(839) 394-5023')).toBe(true);
});
test('Phone numbers of the form XXX-XXX-XXXX are valid phone numbers', () => {
  expect(functions.isPhoneNumber('234-294-1687')).toBe(true);
});
test('Phone numbers of the form XXXXXXXXXX are invalid phone numbers', () => {
  expect(functions.isPhoneNumber('8394502301')).toBe(false);
});
test('Phone numbers of the form (XXX) XXXXXXX are invalid phone numbers', () => {
  expect(functions.isPhoneNumber('(839) 39450231')).toBe(false);
});