/**
 * Shortens a title if it exceeds the specified character limit.
 *
 * If the length of the title is greater than the provided limit, the function truncates
 * the title to the limit and appends an ellipsis ("..."). If the title is within the limit,
 * it returns the title unchanged.
 *
 * @param {string} title - The title to be shortened.
 * @param {number} limit - The maximum number of characters allowed for the title.
 * @returns {string} The shortened title if it exceeds the limit; otherwise, the original title.
 */
export function shortenTitle(title, limit) {
  const characters = title.length;
  if (characters > limit) {
    return title.slice(0, limit) + "...";
  }

  return title;
}
