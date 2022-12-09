const {supabase} = require("../services/clientSupabase");

const consumirRemedio = async (req, res) => {
  try{
    const body = req.body;
    if(!(body.dataRemedioConsumido && body.nomeRemedio)) throw new Error("400");
    const {error} =  await supabase.from('remedios').update({consumido: body.dataRemedioConsumido}).eq("nome", body.nomeRemedio);
    if(error === null){
      res.status(200).send({status: "ok"});
    }else{
      res.status(500).send({status: "Erro ao encontrar dados"});
    }
  }catch(error){
    if(error instanceof Error) {
      const resStatus = Number(error.message);
      res.status(resStatus).send({error: "Dados inválidos"})
    }
    res.status(500).send({error : "Erro inesperado"});
  }
  }

  exports.consumirRemedio = consumirRemedio;