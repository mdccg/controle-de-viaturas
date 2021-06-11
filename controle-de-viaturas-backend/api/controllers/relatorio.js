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
    Relatorio.find({}, async function(err, docs) {
      if(err) return res.status(500).json(err);

      if(!docs.length)
        await Relatorio.create(req.body);

      else {
        var { _id } = docs.pop();
        var options = { useFindAndModify: false };
        req.body._id = _id;

        Relatorio.findByIdAndUpdate(_id, { $set: req.body }, options, function(err, result) {
          if(err) return res.status(500).json(err);
        });
      };
    });

    return res.status(200).json({ ok: true });
  }

  return controller;
}