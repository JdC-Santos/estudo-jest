const ctrl = require('./controller');

module.exports = (express) => {
  const Router = express.Router();

  Router.get('/produtos/:_id?', ctrl.get);
  Router.post('/produtos', ctrl.save);
  Router.put('/produtos/:_id', ctrl.save);
  Router.delete('/produtos/:_id', ctrl.remove);

  return Router;
}