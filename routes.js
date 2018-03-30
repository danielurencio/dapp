var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';



router.get('/', function(req, res){
   var data = {
	title: 'fondín',
	msg:'Este sitio está en construcción.',
	email:'E-mail',
	pswd:'Contraseña',
	btn: 'Regístrate',
	success:'¡Gracias!'
   };

   res.render('pages/index.html', data);
});



router.post('/signup', function(req, res) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        db.collection("inserts").insertOne(req.body,function(err,result) {
            client.close();

        });
    });
});



//export this router to use in our index.js
module.exports = router;
