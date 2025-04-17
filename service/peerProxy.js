const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
    // Create a websocket object
    const socketServer = new WebSocketServer({ server: httpServer });

    // helper that any module can call
    function broadcast(payload, excludeSocket = null) {
        const msg = JSON.stringify(payload);
        socketServer.clients.forEach((client) => {
            if (client !== excludeSocket && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    }

    socketServer.on('connection', () => console.log('[WS] client connected'));

    socketServer.on('connection', (socket) => {
        socket.isAlive = true;

        // Forward messages to everyone except the sender
        socket.on('message', function message(data) {
            broadcast(JSON.parse(data), socket);
        });

        // Respond to pong messages by marking the connection alive
        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    // Periodically send out a ping message to make sure clients are alive
    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        });
    }, 10000);

    return { broadcast }
}

module.exports = { peerProxy };
