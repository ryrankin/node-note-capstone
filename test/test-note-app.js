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
			data: faker.date.past()
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
			resNotes.date.should.equal(notes.content);
		});
	});
});

	describe('POST endpoint', function(){

		const newNote = {
			title: faker.lorem.sentence(),
			content: faker.lorem.text(),
			date: faker.lorem.date()
		}
	});

	return chai.request(app)
	.post('/notes')
	.send(newNote)
	.then(function(res){
		res.should
	})

})





