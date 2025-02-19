/**
 * Checks if a given string is a valid URL.
 *
 * This function attempts to create a new URL object from the provided string.
 * If the creation succeeds, the URL is considered valid and the function returns `true`.
 * If an error is thrown during the URL creation, the function catches the error and returns `false`.
 *
 * @param {string} urlString - The string to be validated as a URL.
 * @returns {boolean} `true` if the string is a valid URL, otherwise `false`.
 */
export function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}
