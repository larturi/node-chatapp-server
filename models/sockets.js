const { usuarioConectado, usuarioDesconectado, getUsuarios } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");
class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => {

            const [ valido, uid ] = comprobarJWT(socket.handshake.query['x-token']);

            if (!valido) {
                console.log('Socket no identificado. JWT no valido.');
                return socket.disconnect();
            }

            await usuarioConectado(uid);

            // Emitir todos los usuarios conectados
            this.io.emit( 'lista-usuarios', await getUsuarios() );

            socket.on('disconnect', async () => {
                await usuarioDesconectado(uid);
                this.io.emit( 'lista-usuarios', await getUsuarios() );
            });
        
        });
    }

}

module.exports = Sockets;