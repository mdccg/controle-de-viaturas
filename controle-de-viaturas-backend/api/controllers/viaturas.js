const Viatura = require('./../models/Viatura');

module.exports = app => {
  const controller = {};

  controller.adicionarViatura = (req, res) => {
    const { prefixo, categoria, km, nivelCombustivel, comentario } = req.body;
    const viatura = { prefixo, categoria, km, nivelCombustivel, comentario };

    Viatura.create(viatura, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).json(result);
    });
  }

  controller.listarViaturas = (req, res) => {
    Viatura.find(function(err, docs) {
      if(err) return res.status(500).json(err);
      
      /*
      const viaturas = {};
      const categorias = [...new Set(docs.map(doc => doc.categoria))];
      
      for(const categoria of categorias)
        viaturas[categoria] = docs.filter(doc => doc.categoria === categoria);
      */
      
      return res.status(200).json(docs);
    });
  };

  controller.atualizarViatura = (req, res) => {
    const { id } = req.params;
    const { prefixo, categoria, km, nivelCombustivel, comentario } = req.body;
    const viatura = { prefixo, categoria, km, nivelCombustivel, comentario };
    const options = { useFindAndModify: false };
    
    Viatura.findByIdAndUpdate(id, viatura, options, function(err, doc) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viatura atualizada com sucesso.');
    })
  }

  controller.deletarViatura = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };

    Viatura.findByIdAndDelete(id, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viatura deletada com sucesso.');
    })
  }

  return controller;
}