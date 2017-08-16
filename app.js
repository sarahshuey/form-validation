const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');

// Create app
const app = express();

// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.get('/', function(req, res){
  res.render('form')
});
app.post('/', function(req, res){
  console.log("email is " + req.body.email);

  //Call req.checkBody function.
    //Pass inputs to validate.
    //Tell middleware which validators to apply (chain one or more).
    req.checkBody("name", "You must enter your name").notEmpty();
    req.checkBody("email", "You must enter a valid Email").notEmail();

    // req.checkBody("dropdown", "You must select an option").
    let results = {};
    results.name = req.body.name;
    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
    //   // Render validation error messages
    //   var form = errors;
      res.render('form',{errors: errors});
    }  else {
      res.render('form');
  }
});

app.listen(3000);
