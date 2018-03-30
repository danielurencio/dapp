var express = require('express');
var app = express();
var engines = require('consolidate');
var routes = require('./routes.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use("/",routes);

app.listen(3000,function() {
  console.log("ready on 3000!");
});
