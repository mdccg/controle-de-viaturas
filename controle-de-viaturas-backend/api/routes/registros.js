module.exports = app => {
  const controller = app.controllers.registros;

  app.route('/api/v1/historico')
    .get(controller.buscarHistorico);

  app.route('/api/v1/registros')
    .get(controller.buscarRegistros)
    .post(controller.registrar)
    .delete(controller.truncate);
  
  app.route('/api/v1/registros/:id')
    .delete(controller.deletarRegistro);
  
  app.route('/api/v1/registros/mensais/:mes/:ano')
    .delete(controller.deletarRegistrosMensais);
}