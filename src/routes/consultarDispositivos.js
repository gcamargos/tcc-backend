const axios = require("axios");
const {supabase} = require("../services/clientSupabase");

const consultarDispositivos = async (req, res) => {
  try{
    const getDispositivosApi = await axios.get("http://tads.jcloud.net.br/gleidson/devices.php");
    const dispositivosDisponiveisApi = getDispositivosApi?.data;

    if (!dispositivosDisponiveisApi){
      throw new Error("500");
    }
    
    const getDispositivos =  await supabase.from('remedios').select('dispositivo');
    const dispositivosDisponiveisBD = getDispositivos?.data;

    if (!dispositivosDisponiveisBD) {
      throw new Error("500");
    }
    const dispositivosDisponiveisBDFiltered = dispositivosDisponiveisBD.map((item) => item.dispositivo);

    const dispositivosDisponiveis = dispositivosDisponiveisApi.filter(item => !dispositivosDisponiveisBDFiltered.includes(item));

    const dispositivos = await supabase.from('dispositivos').select('dispositivo, descricao').in('dispositivo', dispositivosDisponiveis);

    res.status(200).send(dispositivos?.data);
  }catch(err){
    if(err.message === "500") {
      res.status(400).send({error: "Não foi possível realizar todas as conexões necessárias"});
    }
    else {
      res.status(500).send({error: err.message});
    }
  }
}

exports.consultarDispositivos = consultarDispositivos;