//Node configuration
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/dist')); //required to run app once served
app.use(express.static(__dirname + '/src')); //requiring use of folder for desktop web browser client

var port = process.env.PORT || 1337; //set port to use

app.listen(port, function() {
  console.log('ddEncounterCreator is running on ', port, ' port!');
});

module.exports = app;
