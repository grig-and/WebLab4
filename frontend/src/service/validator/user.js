const regularExpression = "^[A-Za-z0-9_]{3,14}$";

export function isLoginValid(login) {
  return (login !== '' && login.match(regularExpression));
}

export function isPasswordValid(password) {
  return password.length >= 4;
}

export function areEqual(p1, p2) {
  return p1 === p2 & '' !== p2;
}
