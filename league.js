const { createServer } = require('node:http');
const hostname = '192.168.0.4'; // IP
const port = 3000;

require('dotenv').config();//Modulo de .env
const axios = require('axios');//EL modulo de lol
//Estot requiere el api desde el .env archivo
const API_KEY = process.env.RIOT_API_KEY; 


//El createServer() método de http crea un nuevo servidor HTTP y lo devuelve. NODE OFICIAL
//https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
const server = createServer((req, res) => {
    //Cuando se crear el server mandamos un text plain a la respuesta del servidor desde una funcion asincronica
    // Mandando un Header que sea de texto plano
    // y un Hello world que se va a ver en pantalla
    res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Jeremito es Gei');
});

// Esto es un listener que nos dice que hace en el puerto encendido
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


async function getSummonerByName(summonerName,summonerTag) {
  try {
    const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}`, {
        
      headers: {
        'X-Riot-Token': API_KEY,
       
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del invocador:', error.message);
  }
}

async function main() {
  const summonerName = 'JEREMITO'; // Reemplaza con un nombre de invocador real
  const summonerTag= 'EMP'
  const summonerData = await getSummonerByName(summonerName,summonerTag);
  
  if (summonerData) {
    console.log('Datos del invocador:', summonerData);
  }
}

main();







