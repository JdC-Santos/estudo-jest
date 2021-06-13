module.exports = function(express) {
  const Router = express.Router();

  Router.post('/produtos', function(req, res) {
    res.status(201).send('produto cadastrado');
  });

  return Router;
}