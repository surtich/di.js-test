var use = require('di/dist/cjs/testing').use;
var inject = require('di/dist/cjs/testing').inject;

import {UserManager} from '../src/manager/user';
import {UserDaoMemory} from '../src/dao/memory/user';

describe('test DI', function() {

  beforeEach(use(UserDaoMemory));
  
  it('add an user', inject(UserManager, function(userManager) {
    userManager.addUser('test_email', 'test_name', function(err, result) {
		expect(result).toBe(true);
	});
  }));
  
  it('add a duplicated user', function() {
		inject(UserManager, function(userManager) {
			runs(function() {
					userManager.addUser('test_email', 'test_name', function(err, result) {
						expect(result).toBe(true);
					});
			});
			runs(function() {
					userManager.addUser('test_email', 'test_name', function(err, result) {
						expect(result).toBe(false);
					});
			});
		});
  });
  
  
  it('get an user', function() {
		inject(UserManager, function(userManager) {
			runs(function() {
					userManager.addUser('test_email', 'test_name', function(err, result) {
						expect(result).toBe(true);
					});
			});
			runs(function() {
					userManager.getUser('test_email', function(err, result) {
						expect(result.name).toBe('test_name');
					});
			});
		});
  });
  
});
