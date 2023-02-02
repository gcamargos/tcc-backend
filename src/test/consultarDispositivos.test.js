const request = require("supertest");
const { consultarDispositivos } = require("../routes/consultarDispositivos");
const express = require("express");
const app = express();
app.use(express.json());
app.post("/consultar/dispositivos", consultarDispositivos);


describe("/consultar endpoint", () => {

  it("deve retornar 200 e status 'ok' quando os parâmetros necessários são fornecidos", async () => {
    const response = await request(app)
      .post("/consultar/dispositivos")
      .send({
        "medicamento": "Advil"
      });
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar 200 e status 'ok' quando os parâmetros necessários são fornecidos mas não possui cadastro desse medicamento", async () => {
    const response = await request(app)
      .post("/consultar/dispositivos")
      .send({
        "medicamento": "Advil Fora do banco"
      });
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar 400 e uma mensagem de erro quando os parâmetros obrigatórios estiverem ausentes", async () => {
    const response = await request(app)
    .post("/consultar/dispositivos")
    .send({
      "medicamentoAtributoErrado": "Advil"
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Não foi passado o atributo medicamento");
  });
});