var URL = require('url');
var server = require('http').createServer(function(request, response) {
	var url = URL.parse(request.url, true);
	if (url.pathname != '/') return;
	
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify(url.query));
}).listen(8080);