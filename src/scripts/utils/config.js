import * as THREE 	from "three";

var config = {
	
	canvas: {
		element : document.getElementById('container'),
		color : 0x000000
	},

	camera: {
		position : new THREE.Vector3(0, 0, 100),
		target : new THREE.Vector3(0, 0, 0)
	},

	axisHelper: false,
	
	lights: {
		ambient: {
			color : 0x333333
		},
		spotLight: {
			color: 0xffffff,
			position: {
				x: 10,
				y: 10,
				z: 3
			},
			intensity: 1,
			distance: 100,
			angle: Math.PI * 1,
			castShadow: true
		}
	},

	plane: {
		x: 0,
		y: 0,
		z: 0,
		width: 100,
		height: 100,
		widthSegments: 30,
		heightSegments: 30,
		// color: 0xffffff,
		// emissive: 0x999999,
		color: 0x2334b6,
		ambient: 0x8844AA,
		emissive: 0x000000,
		emissiveIntensity: 1,
		specular: 1,
		shininess: 300,
	},

	radiusSegments: 10,

	heightSegments: 10
}


module.exports = config;