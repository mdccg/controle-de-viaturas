const Agenda = require('./../models/Agenda');

module.exports = () => {
  const controller = {};

  controller.listarDias = async (req, res) => {
    const agenda = await Agenda.find({});
    const agendaVazia = JSON.stringify(agenda) === '[]';

    if(agendaVazia)
      await Agenda.create({ dias: [] }, function(err, result) {
        if(err) return res.status(500).json(err);
        return res.status(200).json([]);
      });
    else {
      const { dias } = agenda.pop();
      return res.status(200).json(dias);
    }
  }

  controller.atualizarDias = async (req, res) => {
    const dias = req.body;

    const agenda = await Agenda.find({});
    const agendaVazia = JSON.stringify(agenda) === '[]';

    if(agendaVazia) 
      await Agenda.create(dias, function(err, result) {});
    else {
      const { _id } = agenda.pop();
      const update = { $set: { dias } };
      const options = { useFindAndModify: false };

      await Agenda.findByIdAndUpdate(_id, update, options, function(err, result) {
        if(err) return res.status(500).json(err);
      });
    }

    return res.status(200).json(dias);
  }

  return controller;
}