import {Provide} from 'di';
import {UserDao} from '../user';

@Provide(UserDao)
export class UserDaoMemory {
	
	constructor() {
		this.users = {};
	}
	
	addUser(user, callback) {
		if (this.users[user.email] === undefined) {
			this.users[user.email] = user;
			callback(null, true);
		} else {
			callback('Duplicated User', false);
		}
	}
	
	getUser(email, callback) {
		callback(null, this.users[email]);
	}
	
}
