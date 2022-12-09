const {supabase} = require("../services/clientSupabase");

const agendarRemedio = async (req, res) => {
  try{
    const body = req.body;
    if(!(body.dataRemedio && body.nomeRemedio)) throw new Error("400");
    await supabase.from('remedios').insert({nome: body.nomeRemedio, agendado: body.agendado});
    res.status(200).send({status: "ok"});
  }catch(error){
    res.status(500).send({error : error});
   }
  }

  exports.agendarRemedio = agendarRemedio;
