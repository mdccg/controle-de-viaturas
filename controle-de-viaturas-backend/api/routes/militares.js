module.exports = app => {
  const controller = app.controllers.militares;

  app.route('/api/v1/militares')
    .get(controller.buscarMilitares)
    .post(controller.cadastrarMilitar)
    .delete(controller.truncate);

  app.route('/api/v1/militares/:id')
    .put(controller.atualizarMilitar)
    .delete(controller.deletarMilitar);

  app.route('/api/v1/login')
    .get(controller.validarToken)
    .post(controller.autenticarMilitar);
}