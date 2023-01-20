import {backendHost} from '../configuration/host';

export function singIn(login, password) {
  return fetch(`${backendHost}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "login": login,
          "password": password
        }
      )
    }
  );
}

export function signUp(login, password) {
  return fetch(`${backendHost}/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "login": login,
          "password": password
        }
      )
    }
  );
}

