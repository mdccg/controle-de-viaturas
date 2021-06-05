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
    Registro.find({}, async function(err, docs) {
      if(err) return res.status(500).json(err);

      const datas = {};
      
      var registros = [];

      for(var registro of docs) {
        var militar = await Militar.findById(registro.signatario);
        
        var encontrado = Object.values(req.query).join('') === '';

        var { data: dataEsperada } = req.query;

        var dataObtida    = moment(registro.createdAt).format('DD/MM/YYYY');
        var horarioObtido = moment(registro.createdAt).format('HH[:]mm');

        if(dataEsperada) {
          let regExp = new RegExp(`\\b${dataEsperada}`, 'gm');
          
          encontrado = regExp.test(dataObtida) || regExp.test(horarioObtido);
        }

        for(let chave of Object.keys(req.query)) {
          let regExp = new RegExp(`\\b${req.query[chave]}`, 'gim');
          
          if(!['data'].includes(chave) && regExp.test(militar[chave])) {
            encontrado = true;
            break;
          }
        }

        if(encontrado)
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

  controller.deletarRegistrosMensais = async (req, res) => {
    const { mes, ano } = req.params;

    const primeiroDia = moment(`01/${mes}/${ano}`, 'DD/MM/YYYY');
    const ultimoDia   = moment(primeiroDia).clone().endOf('month');

    const filtro = {
      createdAt: {
        $gte: primeiroDia.toDate(),
        $lte: ultimoDia.toDate()
      }
    };

    Registro.find(filtro, function(err, docs) {
      if(err) return res.status(500).json(err);

      for(let registro of docs) {
        Registro.findByIdAndDelete(registro._id, function(err, result) {
          if(err) return res.status(500).json(err);
        });
      }

      return res.status(200).send('Registros deletados com sucesso.');
    });
  }

  return controller;
}