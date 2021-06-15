const ctrl = require('./controller');

module.exports = (express) => {
  const Router = express.Router();

  Router.get('/produtos', ctrl.list);
  Router.post('/produtos', ctrl.save);

  return Router;
}