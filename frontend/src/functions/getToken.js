function getToken() {
  let token = localStorage.getItem('@token');
  return token || undefined;
}

export default getToken;