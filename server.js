const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const {DATABASE_URL, PORT} = require('./config');
const {Note} = require('./models');

app.use(morgan('common'));
app.use(bodyParser.json())

mongoose.Promise = global.Promise;



app.get('/notes', (req, res) =>{
	Notes
		.find()
		.exec()
		.then(notes => {
			res.json(notes.map(note => note.apiRepr()));
		})

		.catch(
			err => {
				console.error(err);
				res.status(500).json({error: 'Internal server error'});
			});
		});

app.get('notes/:id', (req, res) => {
	Notes
		.findById(req.params.id)
		.exec()
		.then(note => res.json(note.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'something has gone wrong'});
		});
});



app.post





app.use('*', function(req, res){
	res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(datbaseUrl=DATABASE_URL, port=PORT){
	return new Promise((resolve, reject) => {
		mongoose.connect(datbaseUrl, err => {
			if (err){
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}


function closeServer(){
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) =>{
			console.log('Closing server');
			server.close(err => {
				if(err){
					return reject(err);
				}
				resolve();
			});
		});
	});
}


if(require.main === module){
	runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};





