var http = require('http');
var jsdom = require('jsdom');

var musicData = function(){
  var pattern = /(letras.terra.com.br)\/([\w-\(\)\[\]]+\/[0-9]+)/;

  var from = function(url, callback){
    var options = extractUrl(url);

    var req = http.request(options, function(res) {
      res.setEncoding('binary');

      var bodyarr = [];

      res.on('data', function (chunk) {
        bodyarr.push(chunk);
      });

      res.on('end', function(){
        var data = bodyarr.join('');
        parse(data, callback);
      });

    }).end();
        
  };

  var parse = function(data, callback){
    jsdom.env({
        html: data,
      }, function (err, window) {
        callback(extract(window));
    });
  };

  var extract = function(window){
    var $ = function(id) {return window.document.getElementById(id)};
    var artist = $('identificador_artista').innerHTML;
    var music = $('identificador_musica').innerHTML;
    var lyrics = $('div_letra').innerHTML;   
    return {artist:artist, music:music, lyrics:lyrics};   
  };

  var extractUrl = function(url){
    var match = url.match(pattern);
    return {
      host: match[1], 
      port:80, 
      path: '/'+match[2]+'/'
    };
  };

  return {
    from: from
  };
};

module.exports = musicData();