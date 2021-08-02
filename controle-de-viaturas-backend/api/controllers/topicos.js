const Topico = require('./../models/Topico');

module.exports = () => {
  const controller = {};

  controller.listarTopicos = async (req, res) => {
    const topicos = await Topico.find({});
    return res.status(200).json(topicos);
  };

  controller.adicionarTopico = (req, res) => {
    var { titulo, descricao } = req.body;
    
    if(!descricao)
      descricao = '';
    
    const topico = { titulo, descricao };

    Topico.create(topico, async function(err, result) {
      if(err) return res.status(500).json(err);
      
      const { _id } = (await Topico.findOne({ titulo, descricao }));
      
      return res.status(200).json({ _id });
    });
  }

  controller.adicionarTopicos = async (req, res) => {
    for(const topico of req.body) 
      await Topico.create(topico, function(err, result) {});
    
    return res.status(200).send('Tópicos cadastrados com sucesso.');
  }

  controller.atualizarTopico = (req, res) => {
    const { id } = req.params;
    const update = { $set: { ...req.body } };
    const options = { useFindAndModify: false };
    Topico.findByIdAndUpdate(id, update, options, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).send('Tópico atualizado com sucesso.');
    });

  }

  controller.truncate = (req, res) => {
    const options = { useFindAndModify: false };
    Topico.deleteMany({}, options, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).send('Tópicos deletados com sucesso.');
    });
  }

  controller.deletarTopico = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };
    Topico.findByIdAndDelete(id, options, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).send('Tópico deletado com sucesso.');
    });
  }

  return controller;
}