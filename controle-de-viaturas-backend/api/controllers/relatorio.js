const Relatorio = require('./../models/Relatorio');

module.exports = app => {
  const controller = {};

  controller.buscarRelatorio = (req, res) => {
    Relatorio.find({}, async function(err, docs) {
      if(err) return res.status(500).json(err);

      var relatorio = {};
      if(!docs.length) {
        relatorio = { tipo: 'A atualizar', relatorio: {} };
        await Relatorio.create(relatorio, function(err, result) {
          if(err) return res.status(500).json(err);
        });

      } else
        relatorio = docs.pop();

      return res.status(200).json(relatorio);
    });
  };

  controller.atualizarRelatorio = (req, res) => {
    const { tipo, relatorio } = req.body;
    var relatorioAtualizado = { tipo, relatorio };

    Relatorio.find({}, async function(err, docs) {
      if(err) return res.status(500).json(err);

      if(!docs.length)
        await Relatorio.create(relatorioAtualizado);

      else {
        var { _id } = docs.pop();
        var options = { useFindAndModify: false };
        relatorioAtualizado._id = _id;

        Relatorio.findByIdAndUpdate(_id, relatorioAtualizado, options, function(err, result) {
          if(err) return res.status(500).json(err);
        });
      };
    });

    return res.status(200).send('Relatório atualizado com sucesso.');
  }

  return controller;
}