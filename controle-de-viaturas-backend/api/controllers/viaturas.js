const Viatura = require('./../models/Viatura');

const Categoria = require('./../models/Categoria');

const getViatura = require('./../functions/getViatura');

module.exports = app => {
  const controller = {};

  controller.adicionarViatura = async (req, res) => {
    var categoria = await Categoria.findById(req.body.categoria);
    var viaturasPorCategoria = await Viatura.find({ "categoria": categoria._id });
    req.body.indiceCategoria = viaturasPorCategoria.length + 1;

    Viatura.create(req.body, async function(err, result) {
      if(err) return res.status(500).json(err);

      result.categoria = categoria;

      return res.status(200).json(result);
    });
  }

  controller.adicionarViaturas = async (req, res) => {
    for(var viatura of req.body) {
      var categoria = await Categoria.findById(viatura.categoria);
      var viaturasPorCategoria = await Viatura.find({ "categoria": categoria._id });
      viatura.indiceCategoria = viaturasPorCategoria.length + 1;

      Viatura.create(viatura, function(err, result) {
        if(err) return res.status(500).json(err);
      });
    }
    
    res.status(200).send('Viaturas cadastradas com sucesso.');
  }

  controller.listarViaturas = (req, res) => {
    var filtro = [];
    var chaves = Object.keys(req.query);
    
    for(let chave of chaves) {
      var objeto = {};
      
      /* 
       * Quaisquer atributos
       * que não precisem de
       *   expressão regular
       * 
       *   ||
       *   ||
       *   \/
       */
      if(['_id', 'categoria', 'indiceCategoria'].includes(chave)) {
        let objeto = { [chave]: req.query[chave] };
        filtro.push(objeto);
        continue;
      }

      objeto[chave] = new RegExp(`\\b${req.query[chave]}`, 'gim');
      filtro.push(objeto);
    }

    Viatura.find(/* sobrecarga de "método" => */ filtro.length > 0 ? { $or: filtro } : {}, async function(err, docs) {
      if(err) return res.status(500).json(err);

      var viaturas = [];

      for(let viatura of docs) {
        var categoria = await Categoria.findById(viatura.categoria);
        
        viatura.categoria = categoria;
        viaturas.push(viatura);
      }

      return res.status(200).json(viaturas);
    });
  };

  controller.atualizarViatura = async (req, res) => {
    const { id } = req.params;
    
    var viaturaAntiga = await Viatura.findById(id);

    // quando a categoria for modificada
    if (`${viaturaAntiga.categoria}` !== `${req.body.categoria}`) {
      var viaturasAntigaCategoria = (await Viatura.find({ "categoria": viaturaAntiga.categoria }));
      
      for (let i = viaturaAntiga.indiceCategoria; i < viaturasAntigaCategoria.length; ++i) {
        const filter = { _id: viaturasAntigaCategoria[i]._id };
        const update = { $set: { indiceCategoria: viaturasAntigaCategoria[i].indiceCategoria - 1 } };
        const options = { useFindAndModify: false };
        await Viatura.updateOne(filter, update, options);
      }

      const novoIndice = (await Viatura.find({ "categoria": req.body.categoria })).length + 1;
      req.body.indiceCategoria = novoIndice;
    }

    Viatura.findByIdAndUpdate(id, { $set: req.body }, { useFindAndModify: false }, function(err, doc) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viatura atualizada com sucesso.');
    });
  }

  controller.buscarViaturasEspecificas = async (req, res) => {
    var filtro = [];
    var chaves = Object.keys(req.query);
    
    for(let chave of chaves) {
      var objeto = {};
      
      /* 
       * Quaisquer atributos
       * que não precisem de
       *   expressão regular
       * 
       *   ||
       *   ||
       *   \/
       */
      if(['_id', 'categoria', 'indiceCategoria'].includes(chave)) {
        let objeto = { [chave]: req.query[chave] };
        filtro.push(objeto);
        continue;
      }

      objeto[chave] = new RegExp(`\\b${req.query[chave]}`, 'gim');
      filtro.push(objeto);
    }

    Viatura.find(/* sobrecarga de "método" => */ filtro.length > 0 ? { $and: filtro } : {}, async function(err, docs) {
      if(err) return res.status(500).json(err);

      var viaturas = [];

      for(let viatura of docs) {
        var categoria = await Categoria.findById(viatura.categoria);
        
        viatura.categoria = categoria;
        viaturas.push(viatura);
      }

      if (!viaturas.length)
        return res.status(404).send('Nenhuma viatura foi encontrada.'); 

      return res.status(200).json(viaturas);
    });
  }

  controller.reidentificarViaturas = async (req, res) => {
    const categorias = await Categoria.find({});

    for (let categoria of categorias) {
      let query = { "categoria": categoria._id };

      let viaturas = (await Viatura.find(query));
      
      for (let i = 0; i < viaturas.length; ++i) {
        let viatura = await getViatura(viaturas[i]._id);
        viatura.indiceCategoria = i + 1;
        viaturas[i] = viatura;

        await Viatura.findByIdAndUpdate(viatura._id, viatura, { useFindAndModify: false });
      }
    }

    return res.status(200).send('Identificadores atualizados com sucesso.');
  }

  controller.truncate = (req, res) => {
    const options = { useFindAndModify: false };

    Viatura.deleteMany({}, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viaturas deletadas com sucesso.');
    });
  }

  controller.deletarViatura = async (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };

    const { categoria, indiceCategoria } = (await Viatura.findById(id));
    var viaturasAntigaCategoria = (await Viatura.find({ categoria }));

    for (let i = indiceCategoria; i < viaturasAntigaCategoria.length; ++i) {
      const filter = { _id: viaturasAntigaCategoria[i]._id };
      const update = { $set: { indiceCategoria: viaturasAntigaCategoria[i].indiceCategoria - 1 } };
      const options = { useFindAndModify: false };
      await Viatura.updateOne(filter, update, options);
    }

    Viatura.findByIdAndDelete(id, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Viatura deletada com sucesso.');
    });
  }

  return controller;
}