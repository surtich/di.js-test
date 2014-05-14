import {Provide} from 'di';
import {UserDao} from '../user';

var MongoClient = require('mongodb').MongoClient;
var colUsers = null;

@Provide(UserDao)
export class UserDaoMongo {
	
	constructor() {
	}
	
	init(callback) {
		MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
			if (err) {
				callback(err);
			} else {
				colUsers = db.collection('users');
				colUsers.ensureIndex({ email: 1 }, { unique: true }, function(err, results) {
					callback(err, 'connected');
				});
			} 
		});
	}
	
	addUser(user, callback) {
		colUsers.insert(user, callback);
	}
	
	getUser(email, callback) {
		colUsers.find({email: email}).toArray(callback);
	}
	
}
