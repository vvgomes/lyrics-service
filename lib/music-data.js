var http = require('http');
var jsdom = require('jsdom');

var options = {
  host: 'letras.terra.com.br',
  port: 80,
  path: '/mgmt/1202272/',
};

var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  var bodyarr = [];

  res.on('data', function (chunk) {
  	bodyarr.push(chunk);
  });

  res.on('end', function(){
  	var data = bodyarr.join('');

  	jsdom.env({
    	html: data,
    	scripts: [
      		'http://code.jquery.com/jquery-1.5.min.js'
    	]
  	}, function (err, window) {
    	var $ = window.jQuery;
     
      var artist = $('#identificador_artista').text();
      var music = $('#identificador_musica').text();
      var text = $('#div_letra').text();
     
      console.log(artist, music);
      console.log(text);
  	});

  });

}).end();