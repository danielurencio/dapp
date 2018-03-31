var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';


var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}


router.get('/', function(req, res){
   var data = {
	title: 'fondín',
	suffix:'space',
	msg:'Este sitio está en construcción.',
	email:'E-mail',
	pswd:'Contraseña',
	btn: 'Regístrate',
	success:'¡Gracias!'
   };

   res.render('pages/index.html', data);
});



router.get('/confirm',function(req,res) {
  console.log(req.body);
  return res.render("pages/confirm.html");
});



router.post('/signup', function(req, res, next) {
    // Use connect method to connect to the server
    MongoClient.connect(mongoURL, function(err, client) {
        const db = client//.db(dbName);
        db.collection("inserts").findOne({ 'email':req.body.email }, function(err,doc) {

	    if(!doc) {
                db.collection("inserts").insertOne(req.body,function(err,result) {
                    client.close();
		    res.send("1");
                });
	    } else {
		res.send("0");
	    }
	  
	});
    });
});



//export this router to use in our index.js
module.exports = router;
