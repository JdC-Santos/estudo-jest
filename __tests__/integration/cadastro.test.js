const request = require('supertest');
const app = require('../../app');
const Produto = require('../../app/models/Produto');
const mongoose = require('mongoose');

describe('deve testar as formas de cadastro dos produtos', () => {
  it("deve cadastrar um produto com sucesso", async () => {
      const response = await request(app)
      .post('/api/produtos')
      .send({
        nome: "celular",
        flg_ativo: true,
        valor: 1200.99
      });

      expect(response.status).toBe(201);    
  });

  // fecha a conexão com o mongo ao finalizar os testes.
  afterAll(done => {
    mongoose.connection.close()
    done();
  });
});