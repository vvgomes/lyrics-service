var http = require('http');
var jsdom = require('jsdom');

var options = {
  host: 'www.google.com.br',
  port: 80,
  path: '/cse?q='+encodeURIComponent('Kids MGMT')+'&cx=partner-pub-9911820215479768:27n8sq6qzwx',
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
    	var url = $('.a:first').text();
  	});

  });

}).end();