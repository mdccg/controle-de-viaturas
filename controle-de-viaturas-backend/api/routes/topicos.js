module.exports = app => {
  const controller = app.controllers.topicos;

  app.route('/api/v1/topicos')
    .get(controller.listarTopicos)
    .post(controller.adicionarTopico)
    .delete(controller.truncate);

  app.route('/api/v1/topicos/:id')
    .put(controller.atualizarTopico)
    .delete(controller.deletarTopico);

  app.route('/api/v1/topicos/array')
    .post(controller.adicionarTopicos);
}