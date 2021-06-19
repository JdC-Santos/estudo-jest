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

// depois que todos os testes foram feitos, derruba o servidor e db
afterAll( (done) => {
  server.close(() => { mongoose.connection.close(); });
  done();
});

describe('cadastrar produto',() => {
  it("deve cadastrar um produto com sucesso", async () => {
    const response = await agent
      .post('/api/produtos')
      .send({
        nome: "celular",
        flg_ativo: true,
        valor: 1200.99
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('produto');

    produto = response.body.produto;
  });

  it("deve retornar erro 400 ao tentar cadastrar um produto", async () => {
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

describe('editar produto',() => {
  it("deve editar um produto com sucesso", async () => {

    //primeiro cadastra o produto
    const responseCadProduto = await agent
      .post('/api/produtos')
      .send({
        nome: "celular",
        flg_ativo: true,
        valor: 1200.99
      });

    // entao envia a requisição para editar o produto
    const responseDelProduto = await agent
      .put('/api/produtos/'+ responseCadProduto.body.produto._id)
      .send({
        nome: "celular",
        flg_ativo: true,
        valor: 1000.00
      });

    expect(responseDelProduto.status).toBe(201);
    expect(responseDelProduto.body).toHaveProperty('msg');
  });

  it("deve retornar erro 400 ao tentar editar um produto", async () => {

    // primeiro cadastra o produto
    const responseCadProduto = await agent
      .post('/api/produtos')
      .send({
        nome: "celular",
        flg_ativo: true,
        valor: 1200.99
      });

    // entao envia a requisição para editar o produto
    const responseDelProduto = await agent
      .put('/api/produtos/'+ responseCadProduto.body.produto._id)
      .send({
        nome: "celular",
        flg_ativo: true,
        campoInvalido: 1000.00,
      });

    expect(responseDelProduto.status).toBe(400);
    expect(responseDelProduto.body).toHaveProperty('msg');
  });
});

describe('listar produtos', () => {
  it("deve listar os produtos com sucesso", async () => {
    const response = await agent.get('/api/produtos').send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('produtos');
  });

  it("deve listar um produto pelo ID", async () => {

    //primeiro recupera todos os produtos já cadastrados
    const response = await agent.get('/api/produtos').send();
    
    // faz a requisição do primeiro produto da lista
    const resProduto = await agent.get('/api/produtos/' + response.body.produtos[0]._id).send();

    expect(resProduto.status).toBe(200);
    expect(resProduto.body).toHaveProperty('produto');
  });
});

describe('remover produto', () => {
  it("deve remover um produto com sucesso", async () => {

    //primeiro cadastra o produto
    const responseCadProduto = await agent
      .post('/api/produtos')
      .send({
        nome: "celular",
        flg_ativo: true,
        valor: 1200.99
      });

    // entao envia a requisição para deletar o produto
    const responseDelProduto = await agent
      .delete('/api/produtos/'+ responseCadProduto.body.produto._id)
      .send();

    expect(responseDelProduto.status).toBe(200);
    expect(responseDelProduto.body).toHaveProperty('msg');
  });

  it("deve retornar uma mensagem de erro ao tentar remover um produto", async () => {

    // entao envia a requisição para deletar o produto
    const responseDelProduto = await agent
      .delete('/api/produtos/id-invalido')
      .send();

    expect(responseDelProduto.status).toBe(500);
    expect(responseDelProduto.body).toHaveProperty('msg');
  });
});