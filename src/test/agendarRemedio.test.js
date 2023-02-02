const request = require("supertest");
const { agendarRemedio } = require("../routes/agendarRemedio");
const express = require("express");
const app = express();
app.use(express.json());
app.post("/agendar", agendarRemedio);


describe("/agendar endpoint", () => {

  it("deve retornar 200 e status 'ok' quando os parâmetros necessários são fornecidos", async () => {
    const response = await request(app)
      .post("/agendar")
      .send({ dataRemedio: "2022-12-25", nomeRemedio: "Aspirin", dispositivoId: "12345" });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("deve retornar 400 e uma mensagem de erro quando os parâmetros obrigatórios estiverem ausentes", async () => {
    const response = await request(app)
      .post("/agendar")
      .send({ dataRemedio: "2022-12-25", nomeRemedio: "Aspirin" });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Não foram passados os atributos corretamente");
  });
});