var express = require('express');
var app = express();
var key = require('./public/key');

app.use('/', express.static('public'))

app.get('/key', function(req, res){
    res.send(key);
})

app.listen(3000, function () {
  console.log('listening on port 3000!')
})