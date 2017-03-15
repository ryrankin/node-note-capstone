const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
const {Notes} = require('../models');
const {DATABASE_URL} = require('../config');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);


function tearDownDb(){
	return new Promise((resolve, reject) => {
		console.warn('Deleting database');
		mongoose.connection.dropDatabase()
		.then(result => resolve(result))
		.catch(err => reject(err))
	});
}


function seedNoteData(){
	console.info('seeding note data');
	const seedData = [];
	for(let i=1; i <= 10; i++){
		seedData.push({
			title: faker.lorem.sentence(),
			content: faker.lorem.text(),
			date: faker.date.recent()
		});
	}
	return Notes.insertMany(seedData);
}

describe ('notes API resource', function(){

	before(function(){
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function(){
		return seedNoteData();
	});

	afterEach(function(){
		return tearDownDb();
	});

	after(function(){
		return closeServer();
	})


	describe('GET endpoint', function(){

		it('should return all existing note posts', function(){

			let res;
			return chai.request(app)
			.get('/notes')
			.then(function(_res){
				res = _res;
				res.should.have.status(200);
				res.body.should.have.length.of.at.least(1);
				return Notes.count();
				})
			.then(function(count){
				res.body.should.have.length.of(count);
			});
		});

		it('should return notes with right fields', function(){

			let resNotes;
			return chai.request(app)
			.get('/notes')
			.then(function(res){
				res.should.have.status(200);
				res.should.be.json;
				res.should.be.a('array');
				res.body.should.have.length.of.at.least(1);

				res.body.forEach(function(notes){
					notes.should.be.a('object');
					notes.should.include.keys('id', 'title', 'content', 'date');
				});
			resNotes = res.body[0];
			return Notes.findById(resNotes.id).exec();
			})
		.then(function(notes){

			resNotes.title.should.equal(notes.title);
			resNotes.content.should.equal(notes.content);
			resNotes.date.should.equal(notes.date);
		});
	});
});

	describe('POST endpoint', function(){

		it('should add a new note', function(){

		const newNote = {
			title: faker.lorem.sentence(),
			content: faker.lorem.text(),
			date: faker.date.recent()
		};

		return chai.request(app)
			.post('/notes')
			.send(newNote)
			.then(function(res){
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.include.keys(
					'id', 'title', 'content', 'date');

				res.body.id.should.not.be.null;
				res.body.title.should.equal(newNote.title);
				res.body.content.should.equal(newNote.content);
				res.body.date.should.equal(newNote.date);
					return Notes.findById(res.body.id).exec();
	
		})
		.then(function(notes){
			notes.title.should.equal(newNote.title);
			notes.content.should.equal(newNote.content);
			notes.date.should.equal(newNote.date);
		});
	});
});

		describe('PUT endpoint', function(){
			
			it('should update fields sent', function(){
				const updateData = {
					title: 'test note title here',
					content: 'test content for note is right here',
					date: faker.date.recent()
				};

				return Notes
					.findOne()
					.exec()
					.then(function(notes){
						updateData.id = notes.id;

						return chai.request(app)
							.put(`/notes/${notes.id}`)
							.send(updateData);
					})

					.then(function(res){
						res.should.have.status(201);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.title.should.equal(updateData.title);
						res.body.content.should.equal(updateData.content);
						res.body.date.should.equal(updateData.date);

						return Notes.findById(updateData.id).exec();
					})
					.then(function(notes){
						notes.title.should.equal(updateData.title);
						notes.content.should.equal(updateData.content);
						notes.date.should.equal(updateData.date);
					});
				});
			});

		describe('DELETE endpoint', function(){
			it('should delete a note by id', function(){

				let notes;

				return Notes
				.findOne()
				.exec()
				.then(function(_notes){
					notes = _notes;
					return chai.request(app).delete(`/notes/${notes.id}`);
				})
				.then(function(res){
					res.should.have.status(204);
					return Notes.findById(notes.id).exec();
				})
				.then(function(_notes){
					should.not.exist(_notes);
				});
			});
		});
	});





















