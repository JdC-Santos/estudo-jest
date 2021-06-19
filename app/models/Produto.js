const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: {type: String, required: true },
  flg_ativo: {type: Boolean, required: false },
  valor: { type: Number, required: true }
});

ProdutoSchema.methods.valorComDesconto = function() {
  return this.valor - ((this.valor * 10) / 100);
};

module.exports = mongoose.model('produto', ProdutoSchema);