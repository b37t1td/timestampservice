
var express = require('express');
var app = express();

var monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
 'August', 'September', 'October', 'November', 'December'];

var pad = function(n) { return n < 10 ? '0' + n : n; }

var parseTime = function(url) {
  var time = null;

  url = url.replace(/^\//,'');
  if (url.match(/^\d+$/)) {
    time = new Date(Number(url) * 1000);
  } else {
    time = new Date(decodeURIComponent(url));
  }
  var unix = null;
  var natural = null; 

  if (time.getMonth()) {
    unix = Math.floor(time.getTime() / 1000);
    natural = monthes[time.getMonth()] + ' ' + pad(time.getDate()) + ', ' + time.getFullYear();
  }
  
  return {
    unix : unix,
    natural : natural
  }
}

app.use('/', express.static('public'));
app.get('/*', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(parseTime(req.url));
});


app.listen(8080);
