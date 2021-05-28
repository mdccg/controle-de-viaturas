module.exports = app => {
  const controller = app.controllers.registros;

  app.route('/api/v1/registros')
    .get(controller.buscarHistorico)
    .post(controller.registrar)
    .delete(controller.limparHistorico);
  
  app.route('/api/v1/registros/:id')
    .delete(controller.deletarRegistro);
}