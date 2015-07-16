var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.sendFile('/public/index.html');
}).listen(process.env.PORT || 1337);