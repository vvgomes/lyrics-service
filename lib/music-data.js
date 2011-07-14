var http = require('http');
var jsdom = require('jsdom');


var MusicData = function(){

  var pattern = /(letras.terra.com.br)\/([a-zA-Z-]+\/[0-9]+)/;

  var from = function(url, callback){
    var options = extractUrl(url);

    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      var bodyarr = [];

      res.on('data', function (chunk) {
        bodyarr.push(chunk);
      });

      res.on('end', function(){    
        parse(bodyarr, callback);
      });

    }).end();
        
  };

  var parse = function(bodyarr, callback){
    var data = bodyarr.join('');
    jsdom.env({
        html: data,
        scripts: ['http://code.jquery.com/jquery-1.5.min.js']
      }, function (err, window) {
        callback(extract(window));
    });
  };

  var extract = function(window){
    var $ = window.jQuery;
    var artist = $('#identificador_artista')[0].innerHTML;
    var music = $('#identificador_musica')[0].innerHTML;
    var lyrics = $('#div_letra').text();    
    return {artist:artist, music:music, lyrics:lyrics};   
  };

  var extractUrl = function(url){
    var match = url.match(pattern);
    return {
      host: match[1], 
      port:80, 
      path: '/'+match[2]+'/' 
    }
  };

  return {
    from: from
  };
};

module.exports = MusicData();