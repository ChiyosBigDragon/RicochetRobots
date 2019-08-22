const functions = require('firebase-functions');
const express = require('express');
const app = express();
// const admin = require('firebase-admin')
// admin.initializeApp(functions.config().firebase)

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
// const db = firebase.database();

// const server = app.listen(5000, function() {
// 	console.log('Node.js is listening to PORT:' + server.address().port);
// });

app.get('/develop/', (_req, res) => {
	console.log('GET DEV');
	// db.ref('move').set('unko');
	res.send('dev');
});
app.get('/develop/api/', (_req, res) => {
	console.log('GET UNKO');
	// db.ref('move').set('unko');
	res.send('unko');
});

exports.app = functions.https.onRequest(app);
