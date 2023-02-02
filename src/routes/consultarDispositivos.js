const axios = require("axios");
const {supabase} = require("../services/clientSupabase");

const consultarDispositivos = async (req, res) => {
  try{
    const body = req.body;
    if(!body.medicamento) throw new Error("400");
    const getDispositivosApi = await axios.get("http://tads.jcloud.net.br/gleidson/devices.php");
    const dispositivosDisponiveisApi = getDispositivosApi?.data;
    if (!dispositivosDisponiveisApi){
      throw new Error("404");
    }
    
    // const getDispositivosBD = await supabase.from('dispositivos').select('dispositivo');
    // const dispositivosDisponiveisBD = getDispositivosBD?.data;
    // if (!dispositivosDisponiveisBD) {
    //   throw new Error("404");
    // }
    // dispositivosDisponiveisBD.forEach((item) => {
    //   console.log(item.dispositivo);
    //   if(!dispositivosDisponiveisApi.includes(item.dispositivo)){

    //   }
    // });

    const getDispositivos =  await supabase.from('medicamentos').select(`dispositivo(dispositivo, descricao)`).eq('medicamento', body.medicamento);
    const dispositivosDisponiveisBD = getDispositivos?.data;
    if (!dispositivosDisponiveisBD) {
      throw new Error("404");
    }
    const dispositivos = dispositivosDisponiveisBD.filter(item => dispositivosDisponiveisApi.includes(item.dispositivo.dispositivo));
    res.status(200).send(dispositivos);
  }catch(err){
    if(err.message === "400") {
      res.status(400).send({error: "Não foi passado o atributo medicamento"});
    }
    else if(err.message === "404") {
      res.status(400).send({error: "Não foi possível realizar todas as conexões necessárias"});
    }
    else {
      res.status(500).send({error: err.message});
    }
  }
}

exports.consultarDispositivos = consultarDispositivos;