module.exports = function(express) {
  const Router = express.Router();

  Router.get('/', function(req, res) {
    console.log('funcionando...');
    res.send('funcionando...');
  })

  return Router;
}