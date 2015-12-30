'use strict';

var keypress = require('keypress');

module.exports = function listenForKeys (orb) {

	var calibrating = false;
	var paused = false;
	var speed = 80;
	var lastKey;

	// start emitting keypress events
	keypress(process.stdin);

	console.log(`Initial speed is set to: ${speed}`);

	process.stdin.on('keypress', (ch, key) => {
		if (key) {

			if (key.name === 'q') {
				orb.disconnect(() => {
					process.stdin.pause();
					console.log('Disconnecting Sphero');
					process.exit();
				});
			}
			
			if (key.name === 'p') {
				if (!paused) {
					process.stdin.pause();
				}

				console.log((paused ? 'Unp' : 'P') + 'aused');
				paused = !paused;
			}

			if (key.name === 'c') {
				if (calibrating) {
					orb.finishCalibration();
				} else {
					orb.startCalibration();
				}

				console.log((calibrating ? 'Finished ' : '') + 'Calibrating');
				calibrating = !calibrating;
			}

			if (key.name === 'up') {
				if (key.shift === true) {
					speed += 10;
					logSpeed();
				} else {
					orb.roll(speed, 0);
				}
			}

			if (key.name === 'right') {
				orb.roll(speed, 90);
			}

			if (key.name === 'down') {
				if (key.shift === true) {
					speed -= 10;
					logSpeed();
				} else {
					orb.roll(speed, 180);
				}
			}

			if (key.name === 'left') {
				orb.roll(speed, 270);
			}

			if (key.name === 'space') {
				orb.stop();
			}

			lastKey = key.name;
		}
	});

	process.stdin.setRawMode(true);
	process.stdin.resume();

	function logSpeed () {
		console.log(`Speed is now ${speed}`);
	}
};
