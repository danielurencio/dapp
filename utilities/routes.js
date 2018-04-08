var express = require('express');
var keyGen = require('./keyGen.js');
var transporter = require('./transporter.js');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'fondin';


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



router.post('/signup', function(req, res) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        db.collection("users").findOne({ 'email':req.body.email }, function(err,doc) {

	    if(!doc) {
		var obj = JSON.parse(JSON.stringify(req.body));
		var token = obj.email.replace(/@|\./g,'') + keyGen();
		obj.token = token;

                db.collection("users").insertOne(obj, function(err,result) {
                    client.close();

		    var mailOptions = {
		      from: 'fondin.authorization@gmail.com',
		      to: obj.email,
		      subject: 'Authenticate your account',
		      text: 'localhost:8081/' + token
		    };

		    transporter.sendMail(mailOptions, function(error, info){
		      if (error) {
		        console.log(error);
		      } else {
		        console.log('Email sent: ' + info.response);
		      }
		    });


		    res.send("1");
                });

	    } else {
		res.send("0");
	    }
	  
	});
    });
});



router.get(/.*__$/,function(req,res) {
  var token = req.path.substring(1);

  MongoClient.connect(url,function(err,client) {
      const db = client.db(dbName);
      db.collection("users").findOne({ 'token':token }, function(err,doc) {
          if(doc) {
	    delete doc.token;
	    doc.activated = true;

	    db.collection("users").update({ 'token':token }, doc, function() {
              res.send(token);
	    });

          } else {
            res.send("NO existe esta página.");
          }
      });
  });

});


//export this router to use in app.js
module.exports = router;
