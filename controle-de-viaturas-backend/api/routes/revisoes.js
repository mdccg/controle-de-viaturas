module.exports = app => {
  const controller = app.controllers.revisoes;

  app.route('/api/v1/revisoes')
    .get(controller.listarRevisoes)
    .delete(controller.truncate);
    
  app.route('/api/v1/revisoes/:viatura')
    .get(controller.buscarRevisaoPorViatura)
    .post(controller.adicionarRevisao)
    .put(controller.atualizarRevisaoPorViatura)
    .delete(controller.deletarRevisaoPorViatura);
}