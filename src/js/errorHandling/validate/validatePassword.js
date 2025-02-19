/**
 * Validates if the provided password meets the minimum length requirement.
 *
 * The function checks that the password is at least 8 characters long.
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} Returns `true` if the password is at least 8 characters long; otherwise, returns `false`.
 */
export function validatePassword(password) {
  return password.length >= 8;
}
