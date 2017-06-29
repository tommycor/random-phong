import * as THREE 	from "three";

var config = {
	
	canvas: {
		element : document.getElementById('container'),
		color : 0xf4eddf
	},

	camera: {
		position : new THREE.Vector3(0, 0, 50),
		target : new THREE.Vector3(0, 0, 0)
	},

	axisHelper: false,
	
	lights: {
		ambient: {
			color : 0xffffff
		} 
	},

	cylinders: [
		{
			x: 0,
			y: 0,
			z: 0,
			width: 10,
			height: 10,
			depth: 10,
			rotX: 0,
			rotY: 0,
			rotZ: 0,
			inverted: false
		}
	],

	radiusSegments: 10,

	heightSegments: 10
}


module.exports = config;