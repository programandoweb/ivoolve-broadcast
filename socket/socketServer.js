const socketIo    =     require('socket.io');
module.exports        =   function (server) {
  const io            =   socketIo(server);
  io.on('connection', (socket) => {
    
    console.log("Se conectaron",socket.id)

    socket.on('order', (grupo) => {
      console.log("On recibido",grupo)
      io.emit("orderByGroup",grupo)      
    }); 
    
    socket.on('disconnect', () => {
      console.log("reduxSocket desconectar")
    });  
    
  })

}
