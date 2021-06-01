const Categoria = require('./../models/Categoria');

module.exports = () => {
  const controller = {};

  controller.listarCategorias = (req, res) => {
    Categoria.find(req.query, function(err, docs) {
      if(err) return res.status(500).json(err);

      return res.status(200).json(docs);
    });
  };

  controller.cadastrarCategoria = (req, res) => {
    Categoria.create(req.body, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).json(result);
    });
  }

  controller.atualizarCategoria = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };

    Categoria.findByIdAndUpdate(id, { $set: req.body }, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Categoria atualizada com sucesso.');
    });
  }

  controller.truncate = (req, res) => {
    const options = { useFindAndModify: false };

    Categoria.deleteMany({}, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Categorias deletadas com sucesso.');
    })
  }

  controller.deletarCategoria = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };

    Categoria.findByIdAndDelete(id, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Categoria deletada com sucesso.');
    });
  }

  return controller;
}