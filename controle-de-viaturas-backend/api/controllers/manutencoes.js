const Manutencao = require('./../models/Manutencao');

const moment = require('moment');

module.exports = () => {
  const controller = {};

  controller.listarManutencoes = async (req, res) => {
    const { prefixo, quinzena } = req.query;
    
    let regExp = new RegExp(`${prefixo}`, 'gim');
    var query = { 'viatura.prefixo': regExp };
    
    var manutencoes = await Manutencao.find(prefixo ? query : {});

    if(quinzena)
      manutencoes = manutencoes.filter(({ data }) => {
        const dataPorExtenso = moment(data).format('D [de] MMMM [de] YYYY');
        let regExp = new RegExp(`${quinzena}`, 'gim');
        return regExp.test(`${dataPorExtenso}`);
      });

    return res.status(200).json(manutencoes);
  }

  controller.listarManutencoesPorQuinzena = async (req, res) => {
    const { prefixo } = req.query;
    
    let regExp = new RegExp(`${prefixo}`, 'gim');
    var query = { 'viatura.prefixo': regExp };
    
    var manutencoes = await Manutencao.find(prefixo ? query : {});

    var datas = manutencoes.map(({ _id, data }) => ({ _id, data }));

    /*if(quinzena)
      datas = datas.filter(({ data }) => {
        const dataPorExtenso = moment(data).format('D [de] MMMM [de] YYYY');
        let regExp = new RegExp(`${quinzena}`, 'gim');
        return regExp.test(dataPorExtenso);
      });*/

    datas.sort((a, b) => (a.data > b.data) ? - 1 : !!((a.data < b.data)));

    const quinzenas = {};

    datas.map(({ _id, data }) => {
      let dataPtBr = moment(data).format('D [de] MMMM [de] YYYY');

      let manutencao = manutencoes.filter(({ _id: id }) => id === _id)[0];
      let { viatura, checklist } = manutencao;

      if(!quinzenas[dataPtBr])
        quinzenas[dataPtBr] = {};

      quinzenas[dataPtBr] = { ...quinzenas[dataPtBr], [viatura.prefixo]: checklist };
    });

    return res.status(200).json(quinzenas);
  }

  controller.adicionarManutencao = (req, res) => {
    const { viatura, checklist, data, revisao } = req.body;
    const manutencao = { viatura, checklist, data, revisao };

    Manutencao.create(manutencao, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  }

  controller.atualizarManutencaoPorRevisao = async (req, res) => {
    const { revisao } = req.params;
    const manutencao = (await Manutencao.find({ revisao }))[0];
    
    const update = { $set: { ...req.body } };
    const options = { useFindAndModify: false };
    
    Manutencao.findByIdAndUpdate(manutencao._id, update, options, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  }

  controller.truncate = (req, res) => {
    Manutencao.deleteMany({}, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).send('Manutenções deletadas com sucesso.');
    });
  }

  controller.deletarManutencao = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };

    Manutencao.findByIdAndDelete(id, options, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).send('Manutenção deletada com sucesso.');
    });
  }

  return controller;
}