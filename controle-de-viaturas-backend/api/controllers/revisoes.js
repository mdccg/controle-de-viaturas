const Revisao = require('./../models/Revisao');

const getViatura = require('./../functions/getViatura');
const atualizarChecklist = require('./../functions/atualizarChecklist');

const Topico = require('./../models/Topico');
const Manutencao = require('./../models/Manutencao');

const moment = require('moment');

module.exports = () => {
  const controller = {};

  controller.listarRevisoes = async (req, res) => {
    const revisoes = [];

    for(const revisao of await Revisao.find({})) {
      revisao.viatura = await getViatura(revisao.viatura);
      revisao.checklist = await atualizarChecklist(revisao.checklist);

      if(!revisao.viatura) {
        await Revisao.findByIdAndDelete(revisao._id);
        continue;
      }

      revisoes.push(revisao);
    }

    return res.status(200).json(revisoes);
  };

  controller.buscarRevisaoPorViatura = async (req, res) => {
    const { viatura } = req.params;
    const revisao = (await Revisao.find({ viatura })).pop();

    if(!revisao)
      return res.status(500).send('Revisão não encontrada.');
    else {
      revisao.viatura = await getViatura(revisao.viatura);
      revisao.checklist = await atualizarChecklist(revisao.checklist);
      
      return res.status(200).json(revisao);
    }
  }

  controller.adicionarRevisao = async (req, res) => {
    const { viatura } = req.params;
    
    var hojeIso = moment(moment().format('YYYY-MM-DD'));
    var query = {
      'viatura._id': `${viatura}`,
      data: {
        $gte: hojeIso.clone().toDate(),
        $lte: hojeIso.clone().endOf('day').toDate()
      }
    };

    const manutencoes = await Manutencao.find(query);
    console.log(manutencoes);
    console.log(hojeIso.toDate());

    if(manutencoes.length) {
      // TODO Cadastrar uma manutenção com o id de cada revisão
      return res.status(200).send('Já foi cadastrada hoje!');

    } else {
      const concluida = false;
      const checklist = [];

      for(const topico of await Topico.find({})) {
        const checklistItem = { topico, revisado: false, comentario: '' };
        checklist.push(checklistItem);
      }

      const revisao = { viatura, concluida, checklist };
      
      Revisao.create(revisao, function(err, result) {
        if(err) return res.status(500).json(err);
        return res.status(200).json(result);
      });
    }
  }

  controller.atualizarRevisaoPorViatura = async (req, res) => {
    const { viatura } = req.params;
    const revisao = (await Revisao.find({ viatura })).pop();
    
    if(!revisao) return res.status(500).send('Revisão não encontrada.');

    const { _id } = revisao;
    const  update = { $set: { ...req.body } };
    const options = { useFindAndModify: false };

    Revisao.findByIdAndUpdate(_id, update, options, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  }

  controller.truncate = (req, res) => {
    const options = { useFindAndModify: false };
    
    Revisao.deleteMany({}, options, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).send('Revisões deletadas com sucesso.');
    });
  }

  controller.deletarRevisaoPorViatura = (req, res) => {
    const { viatura } = req.params;
    const update = { viatura };
    const options = { useFindAndModify: false };

    Revisao.deleteMany(update, options, function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  }

  return controller;
}