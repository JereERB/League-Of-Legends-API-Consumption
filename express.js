require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';
const API_KEY = process.env.RIOT_API_KEY;



//No esta el key del api
if (!API_KEY) {
  console.error('RIOT_API_KEY is not set in the environment variables');
  process.exit(1);
}


//Obtiene el summonerName
async function getSummonerByName(summonerName, summonerTag) {
  try {
    const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}`, {
      headers: {
        'X-Riot-Token': API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del invocador:', error.message);
    throw error;
  }
}



app.get('/json', (req, res) => {
  res.json({ nombre: "Mi nombre es Jeremy Rojas" });
});


app.get('/summoner/:name/:tag', async (req, res) => {

  try {
    const summonerName = req.params.name; // Reemplaza con un nombre de invocador real
    const summonerTag = req.params.tag;
    const summonerData = await getSummonerByName(summonerName, summonerTag);
    res.json(summonerData);
    
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del invocador' });
  }

});




app.listen(port, hostname, () => {
  console.log('Servidor ejecutándose en http://192.168.0.4:3000/');
});