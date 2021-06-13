const express = require('express');
require('./config/db');

const app = express();

app.use(express.json());

// recupera todas as rotas do app
app.use('/api', require('./app/index')(express));

module.exports = app;