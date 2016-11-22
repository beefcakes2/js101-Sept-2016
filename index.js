const express = require ('express');
const superagent = require ('superagent');
const bodyParser = require('body-parser');


express()
      .get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
      })
      .use(bodyParser.json())
      .post('/signin', function (req, res) {
        var token = signin(req.body.username, req.body.password);
        res.json({
          token: token,
          success: token ? true : false
        })
      })
      .use(function(req, res, next) {
        var token = req.headers.authorization;
        console.log (token);
        if (authenticate(token)) {
          next();
        } else {
          res.status(401).json({
            succes: false
          });
        }
      })
      .get('/test', function (req, res) {
        res.json({
          success: true
        })
      })
      .listen(8000);

function signin (username, password) {
  var user = {
      jon: 'password1',
      stasi: 'password2'
  }
  if (password === user[username]) {
    return 'token';
  } else {
    return null;
  }
}

function authenticate (token){
  if (token === 'token') {
    return true;
  } else {
    return false;
  }
}
