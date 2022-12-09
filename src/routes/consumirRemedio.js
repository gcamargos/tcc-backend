const {supabase} = require("../services/clientSupabase");

const consumirRemedio = async (req, res) => {
  try{
    const body = req.body;
    if(!(body.dataRemedioConsumido && body.nomeRemedio)) throw new Error("400");
    await supabase.from('remedios').update({consumido: body.dataRemedioConsumido}).eq("nome", body.nomeRemedio);
    res.status(200).send({status: "ok"});
  }catch(error){
    res.status(500).send({error : "Erro inesperado"});
  }
  }

  exports.consumirRemedio = consumirRemedio;
