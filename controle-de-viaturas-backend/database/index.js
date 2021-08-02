const mongoose = require('mongoose');

const uris = process.env.MONGODB_URL || 'mongodb://localhost/controle-de-viaturas-db';

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(uris)
  .then(() => console.log('o/** Malfeito feito.'))
  .catch(err => console.error(err));

mongoose.connection.on('connected', () => console.log('o/** Eu juro solenemente não fazer nada de bom.'));
mongoose.connection.on('disconnected', () => console.log('o/** Malfeito feito.'));
mongoose.connection.on('error', err => console.error(err));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('o/** Avada Kedavra!');
    process.exit(0);
  });
});