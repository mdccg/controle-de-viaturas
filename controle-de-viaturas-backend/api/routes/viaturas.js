module.exports = app => {
  const controller = app.controllers.viaturas;

  app.route('/api/v1/viaturas')
    .post(controller.adicionarViatura)
    .get(controller.listarViaturas);

  app.route('/api/v1/viaturas/:id')
    .put(controller.atualizarViatura)
    .delete(controller.deletarViatura);
}