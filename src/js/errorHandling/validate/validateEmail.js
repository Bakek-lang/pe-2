export function validateEmail(email) {
  const domain = "stud.noroff.no";
  const emailParts = email.split("@");

  if (emailParts.length === 2 && emailParts[1] === domain) {
    return true;
  } else {
    return false;
  }
}
