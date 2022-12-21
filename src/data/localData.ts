const LOCALSTORAGE_USERNAME = "GameRPS-userName";

export function getUserNameFromLocalStorage() {
  return localStorage.getItem(LOCALSTORAGE_USERNAME);
}

export function setUserNameToLocalStorage(userName: string) {
  return localStorage.setItem(LOCALSTORAGE_USERNAME, userName);
}
