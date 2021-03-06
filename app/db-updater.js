// Get modules 
var CronJob = require('cron').CronJob;
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var Building = require('./models/building');
Promise.promisifyAll(Building);
Promise.promisifyAll(Building.prototype);

module.exports = new CronJob('0 */5 * * * *', function() {
	console.log('Job Starting');

	// Array of bids
	var bids = [160, 166, 77, 12, 153, 50, 81, 85, 55, 114];

	// Base url
	var url = 'http://gtwhereami.herokuapp.com/locationinfo?bid=';

	bids.forEach(function(bid) {
		// Get the current occupancy of the building 
	  	request.getAsync(url + bid).then(function(res) {
	  		// Parse the response into JSON
	  		return JSON.parse(res.body);

	  	}).then(function(parsed) {
	  		// Update the building's occupancy
	  		return Building.findOneAndUpdateAsync({ bid: bid }, { $set: { occupancy: parsed.occupancy } }, { new: true });

	  	}).then(function(doc) {
	  		// We got the updated document
	  		console.log(doc.name, 'updated!');

	  	}).catch(function(err) {
	  		// Catch any error that happened along the way
	  		console.log('Error occured:', err);
	  	});
	});
	
}, null, false, 'America/New_York');