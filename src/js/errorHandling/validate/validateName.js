export function validateName(name) {
  const namePattern = /^[a-zA-Z0-9_]+$/;
  return namePattern.test(name);
}
