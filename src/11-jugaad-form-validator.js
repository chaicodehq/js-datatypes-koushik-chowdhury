/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  let errors = {};

  if (typeof formData !== 'object' || formData === null) {
    return { isValid: false, errors: { form: 'Invalid form data' } };
  }

  let { name, email, phone, age, pincode, state, agreeTerms } = formData;

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
    errors.name = 'Name must be 2-50 characters';
  }

  if (typeof email !== 'string') {
    errors.email = 'Invalid email format';
  } else {
    let atIndex = email.indexOf('@');
    let lastAtIndex = email.lastIndexOf('@');
    let dotIndex = email.indexOf('.', atIndex);

    if (atIndex === -1 || atIndex !== lastAtIndex || dotIndex === -1) {
      errors.email = 'Invalid email format';
    }
  }

  if (typeof phone !== 'string' || phone.length !== 10) {
    errors.phone = 'Invalid Indian phone number';
  } else {
    let firstChar = phone.charAt(0);

    if (!['6', '7', '8', '9'].includes(firstChar)) {
      errors.phone = 'Invalid Indian phone number';
    }

    for (let i = 0; i < phone.length; i++) {
      if (phone[i] < '0' || phone[i] > '9') {
        errors.phone = 'Invalid Indian phone number';
        break;
      }
    }
  }

  let parsedAge = age;

  if (typeof age === 'string') {
    parsedAge = parseInt(age);
  }

  if (isNaN(parsedAge) || !Number.isInteger(parsedAge) || parsedAge < 16 || parsedAge > 100) {
    errors.age = 'Age must be an integer between 16 and 100';
  }

  if (typeof pincode !== 'string' || pincode.length !== 6 || pincode.startsWith('0')) {
    errors.pincode = 'Invalid Indian pincode';
  } else {
    for (let i = 0; i < pincode.length; i++) {
      if (pincode[i] < '0' || pincode[i] > '9') {
        errors.pincode = 'Invalid Indian pincode';
        break;
      }
    }
  }

  let stateValue = formData?.state ?? '';

  if (typeof stateValue !== 'string' || stateValue.trim() === '') {
    errors.state = 'State is required';
  }

  if (Boolean(agreeTerms) !== true) {
    errors.agreeTerms = 'Must agree to terms';
  }

  let isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
}
