const { Router } = require("express");
const routes = require("../routes/index");

const router = Router();

router.get("/consultar/remedios", routes.consultarRemedios.consultarRemedios);
router.get("/consultar/medicamentos", routes.consultarMedicamentos.consultarMedicamentos);
router.get("/consultar/dispositivos", routes.consultarDispositivos.consultarDispositivos);
router.post("/agendar", routes.agendarRemedio.agendarRemedio);
router.post("/consumir", routes.consumirRemedio.consumirRemedio);

exports.router = router;