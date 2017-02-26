exports.DATABASE_URL = 'mongodb://ryrankin:Mn7u5g5a223@ds161179.mlab.com:61179/note-cap' ||
				process.env.DATABASE_URL ||
				global.DATABASE_URL ||
				'mongo://localhost/note-cap';

exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/test-note-app');

exports.PORT = process.env.PORT || 8080;