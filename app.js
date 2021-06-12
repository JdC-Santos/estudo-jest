const express = require('express');
const app = express();

// recupera todas as rotas do app
app.use('/api', require('./app/index')(express));

module.exports = app;