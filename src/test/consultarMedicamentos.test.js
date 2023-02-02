const request = require("supertest");
const express = require("express");
const { supabase } = require("../services/clientSupabase");
const { consultarMedicamentos } = require("../routes/consultarMedicamentos");

jest.mock("../services/clientSupabase", () => {
  return {
    supabase: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [{ id: 1, nome: "Paracetamol" }, { id: 2, nome: "Ibuprofeno" }] })
    }
  };
});

describe("Endpoint /consultar/medicamentos", () => {
  const app = express();
  app.get("/consultar/medicamentos", consultarMedicamentos);

  it("Deve retornar lista de medicamentos", async () => {
    const response = await request(app).get("/consultar/medicamentos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, nome: "Paracetamol" }, { id: 2, nome: "Ibuprofeno" }]);
  });

  it("Deve retornar erro 500 em caso de exceção", async () => {
    supabase.from.mockImplementationOnce(() => {
      throw new Error("Erro inesperado");
    });

    const response = await request(app).get("/consultar/medicamentos");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Erro inesperado" });
  });
});
