var express = require('express');
var app = express();
var engines = require('consolidate');
//var routes = require('./routes.js');
var bodyParser = require('body-parser');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res) { res.send("hola"); });
//app.use("/",routes);

app.listen(port,ip,function() {
  console.log('Server running on http://%s:%s', ip, port);

});
