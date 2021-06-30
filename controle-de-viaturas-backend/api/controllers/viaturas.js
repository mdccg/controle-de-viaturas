const Viatura = require('./../models/Viatura');

const Categoria = require('./../models/Categoria');

module.exports = app => {
  const controller = {};

  controller.adicionarViatura = (req, res) => {
    Viatura.create(req.body, async function(err, result) {
      if(err) return res.status(500).json(err);

      var categoria = await Categoria.findById(result.categoria);

      result.categoria = categoria;

      return res.status(200).json(result);
    });
  }

  controller.adicionarViaturas = (req, res) => {
    for(const viatura of req.body) {
      Viatura.create(viatura, function(err, result) {
        if(err) return res.status(500).json(err);
      });
    }
    
    res.status(200).send('Viaturas cadastradas com sucesso.');
  }

  controller.listarViaturas = (req, res) => {
    var filtro = [];
    var chaves = Object.keys(req.query);
    
    for(let chave of chaves) {
      var objeto = {};
      
      objeto[chave] = new RegExp(`\\b${req.query[chave]}`, 'gim');
      filtro.push(objeto);
    }

    Viatura.find(filtro.length > 0 ? { $or: filtro } : {}, async function(err, docs) {
      if(err) return res.status(500).json(err);

      var viaturas = [];

      for(let viatura of docs) {
        var categoria = await Categoria.findById(viatura.categoria);
        
        viatura.categoria = categoria;
        viaturas.push(viatura);
      }

      viaturas.sort(function(a, b) {
        return (a.createdAt < b.createdAt) ? - 1 : ((a.createdAt > b.createdAt) ? 1 : 0);
      })

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