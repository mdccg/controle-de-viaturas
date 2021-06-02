const Registro = require('./../models/Registro');

const Militar = require('./../models/Militar');

const capitalize = require('./../functions/capitalize');

const moment = require('moment');

module.exports = app => {
  const controller = {};

  controller.buscarRegistros = (req, res) => {
    Registro.find(req.query, async function(err, docs) {
      if(err) return res.status(500).json(err);

      var registros = [];

      for(var registro of docs) {
        var militar = await Militar.findById(registro.signatario);
        registros.push({ ...registro._doc, signatario: militar });
      }

      return res.status(200).json(registros);
    });
  }
  
  controller.buscarHistorico = (req, res) => {
    Registro.find(req.query, async function(err, docs) {
      if(err) return res.status(500).json(err);

      const datas = {};
      
      var registros = [];

      for(var registro of docs) {
        var militar = await Militar.findById(registro.signatario);
        registros.push({ ...registro._doc, signatario: militar });
      }

      var datasIso8601 = registros.map(doc => ({ _id: doc._id, data: doc.createdAt }));

      datasIso8601.sort(function(a, b) {
        return (a.data > b.data) ? - 1 : ((a.data < b.data) ? 1 : 0);
      });

      datasIso8601.map(({ _id, data }) => {
        const mes = capitalize(`${moment(data).format('MMMM [de] YYYY')}`);

        if(datas[mes] === undefined)
          datas[mes] = [];
        
        datas[mes].push(registros.filter(registro => registro._id === _id).pop());
      });

      return res.status(200).json(datas);
    });
  }

  controller.registrar = (req, res) => {
    Registro.create(req.body, async function(err, result) {
      if(err) return res.status(500).json(err);

      var signatario;
      
      await Militar.findById(result.signatario, function(err, result) {
        if(err) return res.status(500).json(err);
        signatario = result;
      });
      
      result.signatario = signatario;

      return res.status(200).json(result);
    });
  }

  controller.truncate = (req, res) => {
    const options = { useFindAndModify: false };

    Registro.deleteMany({}, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Registros deletados com sucesso.');
    });
  }

  controller.deletarRegistro = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };

    Registro.findByIdAndDelete(id, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Registro deletado com sucesso.');
    })
  }

  return controller;
}