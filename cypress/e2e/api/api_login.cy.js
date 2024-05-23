/// <reference types="Cypress" />

describe("Teste Funcional de login", () => {
  it("Deve realizar o login com sucesso", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/login",
      body: {
        email: "fulano@qa.com",
        password: "teste",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Login realizado com sucesso");
    });
  });

  it("Deverá validar senha incorreta", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/login",
      body: {
        email: "fulano@qa.com",
        password: "senhaIncorreta",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal("Email e/ou senha inválidos");
    });
  });

  it("Deverá cadastrar usuário", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/usuarios",
      body: {
        nome: "Fulano da Silva",
        email: "beltrano@qa.com.br",
        password: "teste",
        administrador: "true",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
    });
  });

  it.only("Deverá buscar usuário cadastrado usuário", () => {
    const nome = "Fulano da Silva";
    cy.request({
      method: "GET",
      url: "http://localhost:3000/usuarios?nome=${nome}",
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
