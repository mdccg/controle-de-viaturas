const Viatura = require('./../models/Viatura');

const Categoria = require('./../models/Categoria');

module.exports = app => {
  const controller = {};

  controller.adicionarViatura = (req, res) => {
    Viatura.create(req.body, async function(err, result) {
      if(err) return res.status(500).json(err);

      var categoria;
      
      await Categoria.findById(result.categoria, function(err, doc) {
        if(err) return res.status(500).json(err);
        categoria = doc;
      })

      result.categoria = categoria;

      return res.status(200).json(result);
    });
  }

  controller.listarViaturas = (req, res) => {
    Viatura.find(req.query, async function(err, docs) {
      if(err) return res.status(500).json(err);

      var viaturas = [];

      for(let viatura of docs) {
        var categoria;
        
        await Categoria.findById(viatura.categoria, function(err, doc) {
          if(err) return res.status(500).json(err);
          categoria = doc;
        })
        
        viatura.categoria = categoria;
        viaturas.push(viatura);
      }

      return res.status(200).json(viaturas);
    });
  };

  controller.atualizarViatura = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };
    
    Viatura.findByIdAndUpdate(id, { $set: req.body }, options, function(err, doc) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viatura atualizada com sucesso.');
    })
  }

  controller.truncate = (req, res) => {
    const options = { useFindAndModify: false };

    Viatura.deleteMany({}, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viaturas deletadas com sucesso.');
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