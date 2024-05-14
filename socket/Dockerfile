# Usa una imagen base oficial de Node.js
FROM node:16-alpine AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Comando para iniciar la aplicación (ajusta según el comando para iniciar tu aplicación)
CMD [ "node", "server.js" ]

#docker build -t programandoweb/evolve:socket-broadcast .
#sudo docker push programandoweb/evolve:socket-broadcast
#sudo docker pull programandoweb/evolve:socket-broadcast
#sudo docker run -d --name ivoolve-broadcast-socket -p6150:6150 --restart=always programandoweb/evolve:socket-broadcast


