const Checkpoint = require('./../models/Checkpoint');

module.exports = app => {
  const controller = {};

  controller.buscarCheckpoint = (req, res) => {
    Checkpoint.find(function(err, docs) {
      if(err) return res.status(500).json(err);

      var checkpoint;

      if(!docs.length) {
        checkpoint = { ultimoMilitar: '', data: new Date().toISOString() };
        Checkpoint.create(checkpoint, function(err, doc) {
          if(err) return res.status(500).json(err);
        });
      } else
        checkpoint = docs.shift();
      
      return res.status(200).json(checkpoint);
    });
  };

  controller.atualizarCheckpoint = (req, res) => {
    const { ultimoMilitar, data } = req.body;
    
    var checkpoint = { ultimoMilitar, data };

    Checkpoint.find(function(err, docs) {
      if(err) return res.status(500).json(err);

      if(!docs.length) {
        Checkpoint.create(checkpoint, function(err, doc) {
          if(err) return res.status(500).json(err);
          return res.status(200).json(doc);
        });

      } else {
        var desatualizado = { ...docs.shift()._doc },
            { _id } = desatualizado, 
            options = { useFindAndModify: false };

        Checkpoint.findByIdAndUpdate(_id, checkpoint, options, function(err, result) {
          if(err) return res.status(500).json(err);
          return res.status(200).send('Checkpoint atualizado com sucesso.');
        });
      }
    });
  }

  return controller;
}