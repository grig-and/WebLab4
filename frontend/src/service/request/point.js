import {backendHost} from "../configuration/host"

export function getPoints() {
  return fetch(`${backendHost}/points/get`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }
  )
}

export function sendPoint(x, y, r) {
  return fetch(`${backendHost}/points/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify(
        {
          "x": x,
          "y": y,
          "r": r
        }
      )
    }
  )
}

export function clearPoints() {
  return fetch(`${backendHost}/points/clear`,
    {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }
  )
}
