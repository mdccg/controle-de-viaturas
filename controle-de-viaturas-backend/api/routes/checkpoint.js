module.exports = app => {
  const controller = app.controllers.checkpoint;

  app.route('/api/v1/checkpoint')
    .get(controller.buscarCheckpoint)
    .put(controller.atualizarCheckpoint);
}