module.exports = app => {
  const controller = app.controllers.categorias;

  app.route('/api/v1/categorias')
    .get(controller.listarCategorias)
    .post(controller.cadastrarCategoria)
    .delete(controller.truncate);

  app.route('/api/v1/categorias/:id')
    .put(controller.atualizarCategoria)
    .delete(controller.deletarCategoria);
}