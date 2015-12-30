'use strict';

// local scripts
var orbColor = require('./color');
var listenForKeys = require('./keys');

// connect the ball
var sphero = require('sphero');
var orb = sphero('/dev/tty.Sphero-PRR-AMP-SPP');

orb.connect(() => {

	let color = orbColor(orb);

	// set up some basic orb stuff
	orb.detectCollisions();
	orb.setPowerNotification(1, (error, data) => {
		console.log('Power Notification Enabled');
	});
	orb.setAutoReconnect(1, 10, (error, data) => {
		console.log('Auto Reconnect Enabled');
	});

	// let us know you're alive in there
	color.set('green');
	orb.roll(10, 0);

	orb.on('error', (error, data) => {
		console.log('Error!\n', error, data);
	});
	
	orb.on('collision', (data) => {
		console.log('Collision!\n');

		color.set('red').reset(1000);
	});

	listenForKeys(orb);

});
