const Topico = require('./../models/Topico');

async function atualizarChecklist(checklist = []) {
  const identificadoresAdicionados = checklist.map(({ topico }) => topico._id);

  // REMOVER TÓPICOS DELETADOS
  for(const { topico: { _id } } of checklist) {
    let indice = identificadoresAdicionados.indexOf(_id);

    const topicoAtualizado = await Topico.findById(_id);

    if(!topicoAtualizado) {
      checklist = checklist.filter(({ topico }) => topico._id !== _id);
      continue;
    }
    
    checklist[indice].topico = topicoAtualizado;
  }

  const identificadoresTopicos = (await Topico.find({})).map(({ _id }) => _id);
  const identificadoresNaoAdicionados = identificadoresTopicos.filter(_id => !identificadoresAdicionados.includes(_id));

  for(const identificador of identificadoresNaoAdicionados) {
    const topico = await Topico.findById(identificador);
    const checklistItem = { topico, revisado: false, comentario: '' };
    
    checklist.push(checklistItem);
  }

  return checklist;
}

module.exports = atualizarChecklist;