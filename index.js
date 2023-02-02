const express = require("express");
const cors = require("cors");

// const { router } = require("./src/config/router");

const {consultarRemedios, agendarRemedio, consumirRemedio, consultarMedicamentos, consultarDispositivos} = require("./src/routes/index");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(router);
app.get("/", (_req, res) => {
  res.status(200).send("<h3>Api funcionando</h3>")
});
app.get("/consultar/remedios", consultarRemedios.consultarRemedios);
app.get("/consultar/medicamentos", consultarMedicamentos.consultarMedicamentos);
app.post("/consultar/dispositivos", consultarDispositivos.consultarDispositivos);
app.post("/agendar", agendarRemedio.agendarRemedio);
app.post("/consumir", consumirRemedio.consumirRemedio);

app.listen("4000", () => {
  console.log("server running on port 4000");
});
