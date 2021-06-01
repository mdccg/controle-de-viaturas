function getUsuario() {
  let usuario = localStorage.getItem('@usuario');
  return JSON.parse(usuario) || {};
}

export default getUsuario;