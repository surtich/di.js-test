import {Inject} from 'di';
import {UserDao} from '../dao/user';
import {UserModel} from '../model/user';

var di = require('di');

export class UserManager {
		
	@Inject(UserDao)
	constructor(userDao) {
		this.userDao = userDao;
	}
	
	init(callback) {
		this.userDao.init(callback);
	}
	
	addUser(email, name, callback) {
		this.userDao.addUser(new UserModel(email, name), callback);
	}
	
	getUser(email, callback) {
		this.userDao.getUser(email, callback);
	}
}