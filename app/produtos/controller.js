const ProdutoCtrl = {};
const Produto = require('../models/Produto');

ProdutoCtrl.list = async (req, res) => {
  try {
    const produtos = await Produto.find();

    res.status(200).json({ produtos });
  } catch(e) {
    console.log(e);
    res.status(500).json({"msg": "Erro ao listar os produtos!"});
  }
}

ProdutoCtrl.save = async (req, res) => {
  try {
    const { nome = null, flg_ativo = null, valor = null } = req.body;
    const { _id = null } = req.params;

    // se um dos campos nao for informado
    if (!nome || !flg_ativo || !valor) {
      return res.status(400).json({"msg": "Por favor, preencha corretamente os campos"});
    }

    const p = new Produto({ nome, flg_ativo, valor });

    if (_id) p._id = _id;

    const produto = await p.save();
    
    res.status(201).json({"msg": "Produto cadastrado com sucesso", produto});
  } catch(e) {
    console.log(e);
    res.status(500).send({"msg": "Erro ao listar os produtos!"});
  }
}

module.exports = ProdutoCtrl;