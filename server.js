const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const searchString = '';

const {DATABASE_URL, PORT} = require('./config');
const {Notes} = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json())
app.use(express.static('client'));
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

app.get('/notes/:id', (req, res) => {
	Notes
		.findById(req.params.id)
		.exec()
		.then(note => res.json(note.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Something has gone wrong'});
		}); 
	});

app.get('/search', (req, res) => {
	var searchString = req.query.search;
	console.log(searchString);
	Notes.find({$text: {$search: searchString}})
	.limit(10)
	.exec(function(err, notes){
		if(err){
			res.status(500).json({error: 'Search went wrong'});
		} else {
			res.json(notes.map(note => note.apiRepr()));
		}
	});
});



app.post('/notes', (req, res) => {
	const requiredFields = ['title', 'content', 'date'];
	for(let i=0; i < requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	Notes
		.create({
			title: req.body.title,
			content: req.body.content,
			date: req.body.date
		})
		.then(note => res.status(201).json(note.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Something has gone wrong'});
		});
});


app.delete('/notes/:id', (req, res) =>{
	Notes
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).json({message: 'success'});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Something has gone wrong'});
		});
	});



app.put('/notes/:id', (req, res) =>{
	if (!req.body.id){
		return res.status(400).json({
			error: 'Missing ID'
		});
	}
	const updated = {};
	const updateableFields = ['title', 'content', 'date'];
	updateableFields.forEach(field => {
		if (field in req.body){
			updated[field] = req.body[field];
		}
	});
	console.log(updated);

	Notes
		.findByIdAndUpdate(req.body.id, {$set: updated}, {new: true})
		.then(updatedNote => res.status(201).json(updatedNote.apiRepr()))
		.catch(err => res.status(500).json({message : 'Something went wrong'}));
});


app.delete('/notes/:id', (req, res) => {
	Notes
		.findByIdAndRemove(req.params.id)
		.then(() => {
			console.log(`Deleted blog post with id \`${req.params.ID}\``);
			res.status(204).end();
		});
});

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
		return new Promise((resolve, reject) => {
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





