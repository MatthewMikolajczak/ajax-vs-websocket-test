var http = require('http'),
      fs = require('fs'),
     url = require('url'),
 choices = ["hello world", "goodbye world"];

http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    if(path=="/message"){
        request.on('data', (chunk) => {
            var message = chunk;
            console.log("request recieved");
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end(message);
            console.log("message sent");
        })
    }else{
        fs.readFile('./index.html', function(err, file) {
            if(err) {
                // error
                return;
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(file, "utf-8");
        });
    }
}).listen(1234);
console.log("server initialized");
