function putUsuario(usuario = {}) {
  localStorage.setItem('@usuario', JSON.stringify(usuario));
}

export default putUsuario;