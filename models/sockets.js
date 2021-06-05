const { comprobarJWT } = require("../helpers/jwt");
class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            const [ valido, uid ] = comprobarJWT(socket.handshake.query['x-token']);

            if (!valido) {
                console.log('Socket no identificado. JWT no valido.');
                return socket.disconnect();
            }

            console.log('Cliente conectado', uid);

           // Validar el JWT
           // Si el token no es valido, desconectar

           // Saber que usuario esta activo mediante el uid del token

           // Emitir todos los usuarios conectados

           // Unirme a una sala especifica

           // Escuchar cuando un cliente manda un mensaje

           // Desconectar usuario y marcar en la BD

           // Emitir todos los usuarios conectados

           socket.on('disconnect', () => {
               console.log('Cliente desconectado');
           })
        
        });
    }


}


module.exports = Sockets;