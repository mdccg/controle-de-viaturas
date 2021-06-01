const Militar = require('./../models/Militar');

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const config = require('config');

/**
 *  Para a amostra disponível no GitHub,
 * não será necessária a confirmação de
 *                     um administrador.
 */
const AGUARDAR_NOTIFICACAO = true;

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET || config.get('secret'));
}

module.exports = app => {
  const controller = {};

  controller.buscarMilitares = (req, res) => {
    Militar.find(req.query, function(err, docs) {
      if(err) return res.status(500).json(err);

      return res.status(200).json(docs);
    });
  };

  controller.autenticarMilitar = async (req, res) => {
    const { email, senha } = req.body;

    const militar = await Militar.findOne({ email }).select('+senha');

    if(!militar)
      return res.status(400).send('E-mail não cadastrado.');

    if(!await bcrypt.compare(senha, militar.senha))
      return res.status(400).send('Senha inválida.');
      
    militar.senha = undefined;

    return res.status(200).json({
      militar,
      token: generateToken({ _id: militar._id })
    });
  }

  controller.validarToken = (req, res) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
      return res.status(401).send('Token não encontrado.');
  
    const partes = authHeader.split(' ');
  
    if(partes.length !== 2)
      return res.status(401).send('Token mal formatado.');
  
    const [Bearer, token] = partes;
  
    if(Bearer !== 'Bearer')
      return res.status(401).send('Token mal formatado.');
  
    jwt.verify(token, process.env.SECRET || config.get('secret'), function(err, decoded) {
      if(err) return res.status(401).send('Token inválido.');
  
      return res.status(200).json({ _id: decoded._id });
    });
  }

  controller.cadastrarMilitar = async (req, res) => {
    const { email } = req.body;

    if(await Militar.findOne({ email }))
      return res.status(400).send('E-mail já cadastrado.');

    const militar = { ...req.body, tipo: 'Usuário', ativo: !AGUARDAR_NOTIFICACAO };
    
    Militar.create(militar, function(err, result) {
      if(err) return res.status(500).json(err);

      result.senha = undefined;

      return res.status(200).json({
        militar: result,
        token: generateToken({ _id: militar._id })
      });
    });
  }

  controller.atualizarMilitar = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };

    Militar.findByIdAndUpdate(id, { $set: req.body }, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Militar atualizado com sucesso.');
    });
  }

  controller.truncate = (req, res) => {
    Militar.deleteMany({}, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Militares deletados com sucesso.');
    });
  }

  controller.deletarMilitar = (req, res) => {
    const { id } = req.params;
    const options = { useFindAndModify: false };

    Militar.findByIdAndDelete(id, options, function(err, result) {
      if(err) return res.status(500).json(err);

      return res.status(200).send('Militar deletado com sucesso.');
    });
  }

  return controller;
}