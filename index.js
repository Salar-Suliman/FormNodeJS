

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
app.get('/user/verify/:id', (req, res) => {
  console.log(req.params.id)
  //open your files folder fs.readDir
  fs.readFile(`./users/${req.params.id}.json`, (err, file) => {
    if (err) console.log('Error', err);
    else {
      var file = JSON.parse(file)
      //set that document status to confirmed
      if (file.uuid === req.params.id) {
        console.log("current file uuid:", file.uuid)
        file.status = "confirmed";
        //write file back
        fs.writeFile(`./users/${req.params.id}.json`, JSON.stringify(file), (err) => {
          if (err) {
            return console.log(err);
          }

          console.log("The Email was confirmed!");
          //redirect to /
          res.redirect("/");
        });
      }
    };
  });
});
app.listen(4000, () => console.log('Example app listening on port 4000!'))