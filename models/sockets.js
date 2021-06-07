const { 
    usuarioConectado, 
    usuarioDesconectado, 
    getUsuarios,
    grabarMensaje
} = require("../controllers/sockets");
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

            // Unir al usuario a una sala de socketIO
            socket.join(uid);

            // Escuchar cuando el cliente emite un mensaje personal
            socket.on('mensaje-personal', async (payload) => {
                const mensaje = await grabarMensaje(payload);
                console.log(mensaje);
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
            });

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