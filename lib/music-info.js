var http = require('http');
var jsdom = require('jsdom');
var musicData = require('./music-data');

var musicInfo = function(musicInput){

  var options = (function(){
    var musicString = escape(musicInput.music + ' ' + musicInput.artist);
    var path = '/cse?q={musicString}&cx=partner-pub-9911820215479768:27n8sq6qzwx&nojs=1';
    return {
      host: 'www.google.com.br',
      port: 80,
      path: path.replace('{musicString}', musicString)
    };
  })();

  var get = function(callback){
    var req = http.request(options, function(res) {
    res.setEncoding('utf8');
		
    var bodyarr = [];

    res.on('data', function (chunk) {
      bodyarr.push(chunk);
    });

    res.on('end', function(){
      var data = bodyarr.join('');
			console.log('data: '+data);
      retrieveMusicData(data, callback);
    });

    }).end();  
  };

  var retrieveMusicData = function(rawdata, callback){
      jsdom.env({
        html: rawdata
      }, function (err, window) {
          getMusicData(window, callback);
      });    
  };

  var getMusicData = function(window, callback){
    var result = window.document.getElementsByClassName('l')[0];
    if(!result){
      callback({artist:'', music:'not found', lyrics:''});
    }else{
      var url = result.getAttribute('href');
      musicData.from(url, function(result){
        callback(result);
      }); 
    }
  };

  return {
    get: get
  };
};

module.exports = musicInfo;