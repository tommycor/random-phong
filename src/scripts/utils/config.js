import * as THREE 	from "three";

var config = {
	
	canvas: {
		element : document.getElementById('container'),
		color : 0x000000
	},

	camera: {
		position : new THREE.Vector3(50, 50, 50),
		target : new THREE.Vector3(0, 0, 0)
	},

	axisHelper: true,
	
	lights: {
		ambient: {
			color : 0xffffff
		} 
	},

	plane: {
		x: 0,
		y: 0,
		z: 0,
		width: 20,
		height: 20,
		widthSegments: 10,
		heightSegments: 10
	},

	radiusSegments: 10,

	heightSegments: 10
}


module.exports = config;