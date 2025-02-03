export function shortenTitle(title, limit) {
  const characters = title.length;
  if (characters > limit) {
    return title.slice(0, limit) + "...";
  }

  return title;
}
