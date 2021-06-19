const ProdutoCtrl = {};
const Produto = require('../models/Produto');

ProdutoCtrl.get = async (req, res) => {
  try {
    const { _id } = req.params;

    let retorno = {};

    if(_id) {
      retorno.produto = await Produto.findOne({ _id });
    } else {
      retorno.produtos = await Produto.find();
    }

    res.status(200).json(retorno);
  } catch(e) {
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

    let produto = { nome, flg_ativo, valor };

    if (_id) {
      produto = await Produto.updateOne({ _id },{ $set: produto}, {useFindAndModify: false});
    } else {
      produto = await (new Produto(produto)).save();
    }
    
    res.status(201).json({"msg": "Produto cadastrado com sucesso", produto});
  } catch(e) {
    console.log(e);
    res.status(500).json({"msg": "Erro ao listar os produtos!"});
  }
}

ProdutoCtrl.remove = async (req, res) => {
  try {
    const { _id } = req.params;

    const ret = await Produto.deleteOne({ _id });

    if (!ret.deletedCount) throw new Error('Erro ao deletar o Produto');

    res.status(200).json({"msg": "Produto removido com sucesso"});
  } catch(e) {
    res.status(500).json({"msg":"Erro interno ao tentar remover o produto"});
  }
}

module.exports = ProdutoCtrl;