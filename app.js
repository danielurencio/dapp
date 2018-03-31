var https = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var engines = require('consolidate');
var routes = require('./routes.js');
var bodyParser = require('body-parser');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var production = true;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use("/",routes);

if(production) {
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(port, ip, function () {
    console.log('listening on ' + port);
  }) } else {
  app.listen(3000,function() { console.log("development on 3000!"); });
}
