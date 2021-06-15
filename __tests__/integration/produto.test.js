const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

let server, agent;

// antes de todos os testes sobe o server
beforeAll((done) => {
  server = app.listen(4323, error => {
    if(error) done(error);
    agent = agent = request.agent(server);
    done();
  });
});

// depois que todos foram feitos, derruba o servidor e db
afterAll( (done) => {
  server.close(() => {
    mongoose.connection.close();
  });
  done();
});

describe('cadastrar de produto',() => {
  it("deve cadastrar um produto com sucesso", async () => {
    const response = await agent
      .post('/api/produtos')
      .send({
        nome: "celular",
        flg_ativo: true,
        valor: 1200.99
      });

    expect(response.status).toBe(201);
    expect(response.body.produto).toBeDefined();
  });

  it("deve retornar um erro 400 ao tentar cadastrar um produto", async () => {
    const response = await agent
      .post('/api/produtos')
      .send({
        nome: "celular",
        valor: 1200.99
      });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBeDefined();
  });
});

describe('listar produtos', () => {
  it("deve listar os produtos com sucesso", async () => {
    const response = await agent
      .get('/api/produtos')
      .send();

    expect(response.status).toBe(200);
    expect(response.body.produtos).toBeDefined();
  });
});