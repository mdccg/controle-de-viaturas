module.exports = app => {
  const controller = app.controllers.agenda;

  app.route('/api/v1/agenda')
    .get(controller.listarDias)
    .put(controller.atualizarDias);
}