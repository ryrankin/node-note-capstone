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


	})

})





