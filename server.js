var URL = require('url');
var musicInfoService = require('./lib/music-info');

var valid = function(query){
	return query.artist && query.music;
};

var server = require('http').createServer(function(request, response) {
	var url = URL.parse(request.url, true);
	if (url.pathname != '/') return;
	
	if (!valid(url.query)) {
		response.writeHead(500);
		response.end('Invalid Input. Expected: ?music=Music Name  &artist=Artist');	
	};

	musicInfoService(url.query).get(function(result){
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(result));	
	});

}).listen(process.env.PORT || 3000);