module.exports = (express) => {
  const Router = express.Router();

  Router.use(require('./produtos/router')(express));

  return Router;
}