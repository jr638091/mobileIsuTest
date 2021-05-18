const emailRegex: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const phoneNumberRegex: RegExp =
  /^\+?([0-9]{2})\)?[- ]?([0-9]{4})[- ]?([0-9]{4})$/;

const dateRegex: RegExp =
  /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]|6[0-9]):\d{2}.\d{3}Z$/;

function isEmail(email: string): boolean {
  return emailRegex.test(email);
}

function isPhoneNumber(phoneNumber: string | undefined): boolean {
  if (phoneNumber === undefined) {
    return false;
  }
  return phoneNumberRegex.test(phoneNumber);
}

function isDate(date: string | undefined): boolean {
  if (date === undefined) {
    return false;
  }
  return dateRegex.test(date);
}

export { isEmail, isPhoneNumber, isDate };
