var http = require('http');
var server = http.createServer(function(request, response) {});
server.listen(1234, function() {
    console.log((new Date()) + ' Server is listening on port 1234');
});
var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(r){
    var connection = r.accept('echo-protocol', r.origin);
     var client = connection
    connection.on('message', function(message) {
        var msgString = message.utf8Data;
        client.sendUTF(msgString);
    });
    connection.on('close', function(reasonCode, description) {
        delete client;
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
