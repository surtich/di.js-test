var async = require('async');
var meld = require('meld');
import {Inject, Injector} from 'di';
import {UserManager} from './manager/user';
import {UserDaoMongo} from './dao/mongo/user';

var injector = new Injector([UserDaoMongo]);

var userManager = injector.get(UserManager);

var tests = {};

tests.init = function(callback) {
	userManager.init(callback);
};

tests.addUser = function(callback) {
	userManager.addUser("john@test.com", "John Smith", callback);
};

tests.getUser =	function(callback) {
	userManager.getUser("john@test.com", callback);
};


meld.around(tests, /user/i, function(methodCall) {
	var callback = methodCall.args[0];
	
	callback = meld.before(callback, function(err, result) {
		if (err) {
			//Dummy implementation. If there is an error, just ignore it.
			meld.joinpoint().args[0] = null;
			meld.joinpoint().args[1] = err;
		}
	});
	
	methodCall.proceed(callback);
});

async.series([tests.init, tests.addUser, tests.addUser, tests.getUser], function(err, results) {
	if (err) {
		console.log(err);
	} else {
		console.log('results: ',results);
	}
	
	process.exit(0);
});


