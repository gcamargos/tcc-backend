const {supabase} = require("../services/clientSupabase");

const agendarRemedio = async (req, res) => {
  try{
    const body = req.body;
    if(!(body.dataRemedio && body.nomeRemedio && body.dispositivoId)) throw new Error("400");
    await supabase.from('remedios').insert({nome: body.nomeRemedio, agendado: body.dataRemedio, dispositivo: body.dispositivoId});
    res.status(200).send({status: "ok"});
  }catch(error){
    if(error.message === "400") {
      res.status(400).send({error: "Não foram passados os atributos corretamente"});
    }else{
      res.status(500).send({error : error});
    }
   }
}

exports.agendarRemedio = agendarRemedio;
