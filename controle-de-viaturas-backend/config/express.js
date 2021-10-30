const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const cors       = require('cors');
const consign    = require('consign');


module.exports = () => {
  const app = express();
  
  require('./../database');
  require('moment/locale/pt-br');

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  const corsOptions = {
    origin: 'https://bombeiros-aquidauana.web.app',
    optionsSuccessStatus: 200
  }

  // MIDDLEWARES
  app.use(bodyParser.json());
  app.use(cors(corsOptions));

  // ENDPOINTS
  consign({ cwd: 'api' })
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};