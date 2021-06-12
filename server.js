require('dotenv').config();

const app = require('./app');

app.listen(process.env.PORTA, () => {
  console.log('server ouvindo na porta: %d',process.env.PORTA);
});