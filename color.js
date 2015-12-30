'use strict';

var pick = require('lodash').pick;
var delay = require('lodash').delay;
var gradient = require('gradient');

module.exports = function orbColor (orb) {

	if (!(this instanceof orbColor)) {
		return new orbColor(orb);
	}

	this.oldColor = this.color = 'green'; // default colors

	this.set = function setOrbColor (color) {
		this.color = color;

		orb.getColor((error, data) => {
			this.oldColor = pick(data, ['red', 'green', 'blue']);

			_fade(this.oldColor, color);
		});

		return this; // chainable
	};

	this.reset = function resetOrbColor (duration) {
		delay(() => {
			_fade(this.color, this.oldColor);
		}, duration || 1000);

		return this; // chainable
	};

	this.get = function getOrbColor () {
		return this.color;
	};

	return this; // chainable

	function _fade (oldColor, newColor) {
		var colors = [oldColor, newColor].map(_fixRGB);
		var grad = gradient(colors, 5);

		console.log(`fading from ${colors[0]} to ${colors[1]}`)

		grad.toArray('hexString').forEach((color) => {
			orb.color(color);
		});
	};

	function _fixRGB (color) {
		if (typeof color === 'object') {
			return `rgb(${color.red}, ${color.green}, ${color.blue})`;
		}

		return color;
	};
};
