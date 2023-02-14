const {supabase} = require("../services/clientSupabase");
const { google } = require('googleapis');
const { OAuth2 } = google.auth
require('dotenv').config();

const oAuth2Client = new OAuth2(
  process.env.KEY_P,
  process.env.KEY_S
)

oAuth2Client.setCredentials({
  refresh_token: process.env.KEY_R,
})


const agendarRemedio = async (req, res) => {
  try{
    const body = req.body;
    if(!(body.dataRemedio && body.dispositivoId)) throw new Error("400");
    if(!body.nomeRemedio) body.nomeRemedio = '';
    const bdResponse = await supabase.from('remedios').insert({nome: body.nomeRemedio, agendado: body.dataRemedio, dispositivo: body.dispositivoId});
    if(bdResponse.error) throw new Error("500");
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
  
    const eventStartTime = new Date(body.dataRemedio);
    eventStartTime.setHours(eventStartTime.getHours() - 3);
    const eventEndTime = new Date(body.dataRemedio);
    eventEndTime.setHours(eventEndTime.getHours() - 2);
 

    const event = {
      summary: `Remédio`,
      location: `Dispositivo ${body.dispositivoId}`,
      description: `Hora de tomar o remédio ${body.nomeRemedio}`,
      colorId: 1,
      start: {
        dateTime: eventStartTime,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: eventEndTime,
        timeZone: 'America/Sao_Paulo',
      },
    }
    let responseEvent = '';
    calendar.freebusy.query(
      {
        resource: {
          timeMin: eventStartTime,
          timeMax: eventEndTime,
          timeZone: 'America/Sao_Paulo',
          items: [{ id: 'primary' }],
        },
      },
      (err, response) => {
        if (err) responseEvent = 'Erro no agendamento: ' + err;
        else{
          const eventArr = response.data.calendars.primary.busy;
      
          if (eventArr.length === 0) {
            calendar.events.insert(
              { calendarId: 'primary', resource: event },
              err => {
                if (err) responseEvent = 'Erro ao criar o agendamento: ' + err;
                else{
                  responseEvent = 'Agendamento criado com sucesso';
                }
              }
            )
          }else {
            responseEvent = 'Agenda cheia'
          }
        }
        console.log(responseEvent);
      });
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
