export async function storeAuthToken(token, user) {
  console.log("encryptedStorage -> storeUserSession", token);
  window.localStorage.setItem(
    "auth_token",
    JSON.stringify({
      token,
      ...user,
    })
  );
}

export async function retrieveAuthToken() {
  const session = window.localStorage.getItem("auth_token");

  if (session !== undefined) {
    const json = await JSON.parse(session);
    return json;
  }
}

export async function removeAuthToken() {
  window.localStorage.removeItem("auth_token");
}
