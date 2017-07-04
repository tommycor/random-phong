import * as THREE 			from "three";
import config 				from '../utils/config';
import raf 					from '../utils/raf';
import mapper 				from '../utils/mapper';
import getIntersectionMouse	from '../utils/getIntersectionMouse';

module.exports = {

	init: function() {
		this.render  	= this.render.bind(this);
		this.onResize	= this.onResize.bind(this);
		this.onMove		= this.onMove.bind(this);
		this.onClick	= this.onClick.bind(this);

		this.clock   	= new THREE.Clock();
		this.cameraPos		= new THREE.Vector3( config.camera.position.x, config.camera.position.y, config.camera.position.z );
		this.currentCameraPos = new THREE.Vector3( this.cameraPos.x, this.cameraPos.y, this.cameraPos.z );
		this.plane   	= null;
		this.spotLight 	= null;
		
		this.scene 	   	= new THREE.Scene();
		this.container 	= config.canvas.element;
		this.canvas 	= document.createElement("canvas");

		this.camera 		   = new THREE.PerspectiveCamera(45, this.ratio, 15, 3000);
		this.camera.position.x = config.camera.position.x;
		this.camera.position.y = config.camera.position.y;
		this.camera.position.z = config.camera.position.z;
		this.camera.lookAt(config.camera.target);

		this.spotLightPosition = { x: 0, y: 0, z: 0 };

		if ( config.axisHelper ) {
			this.axisHelper =  new THREE.AxisHelper( 5 );
			this.scene.add( this.axisHelper );
		}

		//// RENDERER
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(config.canvas.color, 1.0);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.shadowMapEnabled = true;

		this.spotLight = new THREE.SpotLight( config.lights.spotLight.color, config.lights.spotLight.intensity, config.lights.spotLight.distance, config.lights.spotLight.angle );
		this.spotLight.position.set( config.lights.spotLight.position.x, config.lights.spotLight.position.y, config.lights.spotLight.position.z );
		this.spotLight.castShadow = true;
		this.spotLight.shadowDarkness = 0.5;
		this.spotLight.shadowCameraVisible = true;
		this.scene.add( this.spotLight );

		this.geometry = new THREE.PlaneGeometry( config.plane.width, config.plane.height,  config.plane.widthSegments, config.plane.heightSegments );
		this.material = new THREE.MeshPhongMaterial({
			color: 				config.plane.color,
			ambiant: 			config.plane.ambiant,
			emissive: 			config.plane.emissive,
			emissiveIntensity: 	config.plane.emissiveIntensity,
			specular: 			config.plane.specular,
			shininess: 			config.plane.shininess,
		});
		this.randomize();

		this.plane = new THREE.Mesh( this.geometry, this.material );
		this.plane.position.x = config.plane.x;
		this.plane.position.y = config.plane.y;
		this.plane.position.z = config.plane.z;
		this.plane.castShadow = true;
		this.plane.receiveShadow = true;
		this.scene.add( this.plane );

		this.fakePlaneGeometry 		= new THREE.PlaneGeometry( config.plane.width, config.plane.height,  2, 2 );
		this.fakePlaneMaterial 		= new THREE.MeshBasicMaterial({color: 0xffffff});
		this.fakePlane 				= new THREE.Mesh( this.fakePlaneGeometry, this.fakePlaneMaterial );
		this.fakePlane.visible 		= true;

		this.fakePlaneMaterial.transparent 	= true;
		this.fakePlaneMaterial.opacity 		= 0;

		this.fakePlane.position.x 	= config.plane.x;
		this.fakePlane.position.y 	= config.plane.y;
		this.fakePlane.position.z 	= 10;
		this.scene.add( this.fakePlane );

		//// AMBIANT LIGHT
		this.ambient = new THREE.AmbientLight( config.lights.ambient.color );

		//// ADD OBJECTS TO SCENE
		this.scene.add( this.ambient );

		//// ADD CANVAS TO DOM
		this.container.appendChild( this.renderer.domElement );

		this.onResize();

		//// REGIST RENDERER
		raf.register( this.render );
		raf.start();

		window.addEventListener( 'resize', this.onResize );
		window.addEventListener( 'mousemove', this.onMove );
		window.addEventListener( 'click', this.onClick );
	},

	setFaceColor: function( face ) {
	},

	onClick: function( event ) {
	},

	onMove: function( event ) {
		var position = getIntersectionMouse( event, this.fakePlane, this.camera );

		if( position != void 0 ) {
			this.spotLightPosition = position;
		}
	},

	onResize: function() {
		this.canvas.width = this.container.offsetWidth;
		this.canvas.height = this.container.offsetHeight;

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.ratio = window.innerWidth / window.innerHeight;

		this.camera.aspect = this.ratio;
		this.camera.updateProjectionMatrix();

		this.halfWidth = window.innerWidth * .5;
		this.halfHeight = window.innerHeight * .5;
	},

	render: function() {
		let delta = this.clock.getDelta();

		this.spotLight.position.x += ( this.spotLightPosition.x - this.spotLight.position.x ) * .1;
		this.spotLight.position.y += ( this.spotLightPosition.y - this.spotLight.position.y ) * .1;
		this.spotLight.position.z += ( 10 - this.spotLight.position.z ) * .1;

		this.renderer.render(this.scene, this.camera);
	},

	randomize: function() {
		for( var i = 0 ; i < this.geometry.vertices.length ; i++ ) {
			this.geometry.vertices[i].x += Math.random() * 2 - 1;
			this.geometry.vertices[i].y += Math.random() * 2 - 1;
			this.geometry.vertices[i].z += Math.random() * 12 - 6;
		}

		this.geometry.verticesNeedUpdate = true;
	}
};