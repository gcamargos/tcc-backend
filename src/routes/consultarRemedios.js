const {supabase} = require("../services/clientSupabase");

const consultarRemedios = async (_req, res) => {
  try{
    const getRemedios =  await supabase.from('remedios').select();
    res.status(200).send(getRemedios.data);
  }catch(err){
    res.status(500).send({error: "Erro inesperado"});
  }
}

exports.consultarRemedios = consultarRemedios;