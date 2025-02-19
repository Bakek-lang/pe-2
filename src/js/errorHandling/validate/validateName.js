/**
 * Validates if the provided name contains only letters, numbers, or underscores.
 *
 * The function checks that the name matches the pattern `/^[a-zA-Z0-9_]+$/`,
 * ensuring it only includes alphanumeric characters and underscores.
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} Returns `true` if the name is valid; otherwise, returns `false`.
 */
export function validateName(name) {
  const namePattern = /^[a-zA-Z0-9_]+$/;
  return namePattern.test(name);
}
