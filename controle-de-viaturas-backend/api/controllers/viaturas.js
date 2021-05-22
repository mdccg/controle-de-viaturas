const Viatura = require('./../models/Viatura');

module.exports = app => {
  const controller = {};

  controller.adicionarViatura = (req, res) => {
    const { prefixo, km, nivelCombustivel, comentario } = req.body,
          viatura = { prefixo, km, nivelCombustivel, comentario };

    Viatura.create(viatura, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).json(result);
    });
  }

  controller.listarViaturas = (req, res) => {
    Viatura.find(function(err, docs) {
      if(err) return res.status(500).json(err);

      return res.status(200).json(docs);
    });
  };

  controller.atualizarViatura = (req, res) => {
    const { id } = req.params,
          { prefixo, km, nivelCombustivel, comentario } = req.body,
          viatura = { prefixo, km, nivelCombustivel, comentario },
          options = { useFindAndModify: false };
    
    Viatura.findByIdAndUpdate(id, viatura, options, function(err, doc) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viatura atualizada com sucesso.');
    })
  }

  controller.deletarViatura = (req, res) => {
    const { id } = req.params,
          options = {};

    Viatura.findByIdAndDelete(id, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viatura deletada com sucesso.');
    })
  }

  return controller;
}