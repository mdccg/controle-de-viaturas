const Registro = require('./../models/Registro');

const capitalize = require('./../functions/capitalize');

const moment = require('moment');

module.exports = app => {
  const controller = {};

  controller.buscarHistorico = (req, res) => {
    Registro.find(req.query, function(err, docs) {
      if(err) return res.status(500).json(err);

      const datas = {};

      var datasIso8601 = docs.map(doc => ({ _id: doc._id, data: doc.data }));
      datasIso8601.sort(function(a, b) {
        return (a.data > b.data) ? - 1 : ((a.data < b.data) ? 1 : 0);
      });

      datasIso8601.map(({ _id, data: dataIso8601 }) => {
        const mes = capitalize(`${moment(dataIso8601).format('MMMM [de] YYYY')}`);
        const data = moment(dataIso8601).format('DD/MM/YYYY');

        if(datas[mes] === undefined)
          datas[mes] = [];
        
        datas[mes].push(docs.filter(doc => doc._id === _id).pop());
      });

      return res.status(200).json(datas);
    });
  }

  controller.registrar = (req, res) => {
    const { data, ultimoMilitar, viaturas } = req.body;
    const registro = { data, ultimoMilitar, viaturas };

    Registro.create(registro, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).json(result);
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

  controller.limparHistorico = (req, res) => {
    const options = { useFindAndModify: false };

    Registro.deleteMany({}, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Histórico limpado com sucesso.');
    })
  }

  return controller;
}