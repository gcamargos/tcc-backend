const request = require("supertest");
const { supabase } = require("../services/clientSupabase");
const { consumirRemedio } = require("../routes/consumirRemedio");
const express = require("express");
const app = express();
app.use(express.json());
app.post("/consumir", consumirRemedio);

jest.mock("../services/clientSupabase");

describe("Test endpoint /consumir", () => {
  afterEach(() => {
    supabase.from.mockClear();
  });
  test("Deve retornar 400 e erro quando não foram passados atributos corretamente", async () => {
    const response = await request(app).post("/consumir").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Não foram passados os atributos corretamente" });
    expect(supabase.from).not.toHaveBeenCalled();
  });

});
