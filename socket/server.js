require('dotenv').config();
const express   =   require('express');
const http      =   require('http');
const cors      =   require('cors'); // Importa el paquete cors
const app       =   express();
const server    =   http.createServer(app);

const PORT = process.env.PORT || 6150;

// Configuración del servidor Express
app.use(cors());

app.use(express.static(__dirname + '/public'))

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Importar y configurar el servidor de WebSocket
require('./socketServer')(server);
//http://live.programandoweb.net/
//http://realtime.programandoweb.net/