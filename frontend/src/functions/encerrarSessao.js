function encerrarSessao() {
  localStorage.removeItem('@usuario');
  localStorage.removeItem('@token');
}

export default encerrarSessao;