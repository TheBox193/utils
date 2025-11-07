const sanitizePhoneNumber = (phoneNumber: string | number): string => {
  // Strip to digits
  let phoneNumberSanitized = String(phoneNumber).replace(/\D/g, '');
  // Remove leading country code
  if (phoneNumberSanitized.length === 11) {
    phoneNumberSanitized = phoneNumberSanitized.slice(1);
  }
  return String(phoneNumberSanitized);
};

export default sanitizePhoneNumber;
