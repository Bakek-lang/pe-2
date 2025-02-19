/**
 * Shortens a text by limiting it to a specified number of words.
 *
 * If the text contains more words than the provided limit, this function truncates the text
 * to the first `limit` words and appends an ellipsis ("..."). If the text has `limit` words or fewer,
 * it returns the original text unchanged.
 *
 * @param {string} text - The text to be shortened.
 * @param {number} limit - The maximum number of words allowed in the returned text.
 * @returns {string} The shortened text if it exceeds the word limit; otherwise, the original text.
 */
export function shortenText(text, limit) {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
}
