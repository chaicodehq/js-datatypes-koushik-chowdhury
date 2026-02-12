/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  // Your code here

  if (typeof passenger !== 'object' || passenger === null) {
    return 'INVALID PASS';
  }

  const { name, from, to, classType } = passenger;

  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof from !== 'string' ||
    from.trim() === '' ||
    typeof to !== 'string' ||
    to.trim() === '' ||
    typeof classType !== 'string' ||
    classType.trim() === ''
  ) {
    return 'INVALID PASS';
  }

  const normalizedClass = classType.toLowerCase();

  if (normalizedClass !== 'first' && normalizedClass !== 'second') {
    return 'INVALID PASS';
  }

  function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const nameUpper = name.toUpperCase();
  const fromTitle = toTitleCase(from.trim());
  const toTitle = toTitleCase(to.trim());
  const classUpper = normalizedClass.toUpperCase();

  const passID = classUpper.charAt(0) + from.trim().slice(0, 3).toUpperCase() + to.trim().slice(0, 3).toUpperCase();

  return `MUMBAI LOCAL PASS
---
Name: ${nameUpper}
From: ${fromTitle}
To: ${toTitle}
Class: ${classUpper}
Pass ID: ${passID}`;
}
