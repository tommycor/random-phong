import * as THREE 	from "three";

import config 		from '../utils/config';
import raf 			from '../utils/raf';
import mapper 		from '../utils/mapper';

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
		this.composer 	= null;
		
		this.cylinders 	= Array();
		this.scene 	   	= new THREE.Scene();
		this.container 	= config.canvas.element;
		this.canvas 	= document.createElement("canvas");

		this.camera 		   = new THREE.PerspectiveCamera(45, this.ratio, 15, 3000);
		this.camera.position.x = config.camera.position.x;
		this.camera.position.y = config.camera.position.y;
		this.camera.position.z = config.camera.position.z;
		this.camera.lookAt(config.camera.target);

		if ( config.axisHelper ) {
			this.axisHelper =  new THREE.AxisHelper( 5 );
			this.scene.add( this.axisHelper );
		}

		//// RENDERER
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(config.canvas.color, 1.0);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		//// AMBIANT LIGHT
		this.ambient = new THREE.AmbientLight( config.lights.ambient.color );

		//// ADD OBJECTS TO SCENE
		this.scene.add( this.ambient );

		for( let i = 0 ; i < config.cylinders.length ; i++ ) {
			let cylinderConfig = config.cylinders[i];

			let cylinderGeometry = new THREE.CylinderGeometry( cylinderConfig.width, cylinderConfig.width, cylinderConfig.height, config.radiusSegments, config.heightSegments, false );
			let cylinderMaterial = new THREE.MeshBasicMaterial({
				vertexColors: THREE.FaceColors
			});

			cylinderGeometry.computeFaceNormals();

			for( let j = 0 ; j < cylinderGeometry.faces.length ; j++ ) {
				this.setFaceColor( cylinderGeometry.faces[j] );
			}

			let cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );

			this.scene.add( cylinder );

			this.cylinders.push( cylinder );

		}


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
		console.log('mwellow', face.normal.dot( new THREE.Vector3( 0, 0, 1 ) ));

		if( face.normal.dot( new THREE.Vector3( 0, 0, 1 ) ) === 0 ) {
			face.color = THREE.Vector3( 0, 0, 0 );
		}
	},

	onClick: function( event ) {
	},

	onMove: function( event ) {
		this.cameraPos.x = event.clientX - this.halfWidth;
		this.cameraPos.y = event.clientY - this.halfHeight;
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

		this.currentCameraPos.x += ( ( this.cameraPos.x * .7) - this.currentCameraPos.x ) * 0.01;
		this.currentCameraPos.y += ( ( this.cameraPos.y * .8) - this.currentCameraPos.y ) * 0.01;

		this.camera.position.set( this.currentCameraPos.x, this.currentCameraPos.y, this.currentCameraPos.z );
		this.camera.lookAt(config.camera.target);

		this.renderer.render(this.scene, this.camera);
	}

};