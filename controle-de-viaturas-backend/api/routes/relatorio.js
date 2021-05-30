module.exports = app => {
  const controller = app.controllers.relatorio;

  app.route('/api/v1/relatorio')
    .get(controller.buscarRelatorio)
    .put(controller.atualizarRelatorio);
}