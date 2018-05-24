

var uuidv4 = require('uuid/v4');
var express = require('express');
var app = express();
var fs = require('fs');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/user/create', (req, res) => {

  var id = uuidv4();
  var obj = {
    "uuid": id, //every user should become a uuid. https://www.npmjs.com/package/uuid
    "email": req.query.email, //from form
    "pw": req.query.pw, //from form
    "status": "unconfirmed", //default value unconfirmed, every register is first unconfirmed
    "session": true //depending on the RememberMe checkbox
  }

  fs.writeFile(`./users/${id}.json`, JSON.stringify(obj), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('ths file was saved');
      res.redirect('/')
      console.log(req.query);
  });


})
app.get('/users/verify/:uuid', function (req, res) {
console.log(req.params);

  res.send('Got a PUT request at /user')
})
app.listen(4000, () => console.log('Example app listening on port 4000!'))