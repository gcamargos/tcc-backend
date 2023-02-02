const {supabase} = require("../services/clientSupabase");

const consultarMedicamentos = async (_req, res) => {
  try{
    const getMedicamentoss =  await supabase.from('medicamentos').select();
    res.status(200).send(getMedicamentoss.data);
  }catch(err){
    res.status(500).send({error: "Erro inesperado"});
  }
}

exports.consultarMedicamentos = consultarMedicamentos;