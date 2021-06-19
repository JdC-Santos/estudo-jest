const Produto = require('../../app/models/Produto');

describe('testa os descontos dos produto', () => {
  test('espera que o desconto seja 1800.00', async () => {
    const p1 = new Produto({
      nome: 'geladeira',
      flg_ativo: true,
      valor: 2000
    });

    const retorno = p1.valorComDesconto();

    expect(retorno).toBe(1800);
  });
});