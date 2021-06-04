function encerrarSessao() {
  localStorage.removeItem('@usuario');
  localStorage.removeItem('@token');

  window.location.pathname = '/';
}

export default encerrarSessao;