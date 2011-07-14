var http = require('http');
var jsdom = require('jsdom');


var MusicData = function(){

  var pattern = /(letras.terra.com.br)\/([a-zA-Z-]+\/[0-9]+)/;

  var from = function(url, callback){
    var options = extract(url);

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
       
          callback({artist:artist, music:music, text:text})

        });

      });

    }).end();
        
  };

  var extract = function(url){
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

  exports.MusicData = MusicData;