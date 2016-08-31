var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/feed', function(req, res) {
  request('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', function (error, response, body) {
  	
    var dataObj = JSON.parse(body);
    console.log(dataObj);
    if (!error && response.statusCode === 200) {
      res.render('feed', {feed: dataObj});
    }
  });
});

var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});