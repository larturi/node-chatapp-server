

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

           // Validar el JWT
           // Si el token no es valido, desconectar

           // Saber que usuario esta activo mediante el uid del token

           // Emitir todos los usuarios conectados

           // Unirme a una sala especifica

           // Escuchar cuando un cliente manda un mensaje

           // Desconectar usuario y marcar en la BD

           // Emitir todos los usuarios conectados
        
        });
    }


}


module.exports = Sockets;