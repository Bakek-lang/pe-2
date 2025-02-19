/**
 * Validates if the provided email belongs to the "stud.noroff.no" domain.
 *
 * The function checks that the email contains exactly one "@" symbol and that
 * the domain part of the email is "stud.noroff.no".
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns `true` if the email is valid and belongs to the "stud.noroff.no" domain; otherwise, returns `false`.
 */
export function validateEmail(email) {
  const domain = "stud.noroff.no";
  const emailParts = email.split("@");

  if (emailParts.length === 2 && emailParts[1] === domain) {
    return true;
  } else {
    return false;
  }
}
