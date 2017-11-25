var vm = new Vue({
  el: '#mycounter',
  data: {
    count: 0
  },
  methods: {
    countUp: function() {
            this.count++; 
            changeRotateSpeed (); 
      }
  }
});
  
var vm_stop = new Vue({
  el: '#mystop',
  methods: {
    hsStop: function() {
            Speed_0(); 
    }
  }
});

let scene = new THREE.Scene();
let controls;
let renderer;
let camera;
let howManyChara;
let model = [];
let geometry;
let material;

function renderBrain () {
  'use strict';
  let light;
  let ambient;
  let gridHelper;
	let axisHelper;
  let lightHelp;
  let width = 1200;
  let height = 1200;
//	let modelPath ;

   //light
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 200, 80);
  scene.add(light);
  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

	//camera
  camera = new THREE.PerspectiveCamera(45, width /　height, 1 , 1000);
  camera.position.set(0, 400, 300);
  camera.lookAt(scene.position);

  // helper 現在は非表示
  //gridHelper = new THREE.GridHelper(200, 50);
  //scene.add(gridHelper);
  //axisHelper = new THREE.AxisHelper(1000);
  //scene.add(axisHelper);
  //lightHelper = new THREE.DirectionalLightHelper(light , 20)
  //scene.add(lightHelper);

  //controls
  controls = new THREE.OrbitControls(camera);
  //cameraの自動回転
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xefefef);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

	//modelPath = 'src/bear.json';
	//modelPath = 'src/handspiner_3d.json';
  //modelPath = '../src/data/handspiner_3d_geo.json';
  modelPath = './src/data/handspiner_3d_geo.json';
	//modelPath = '/Users/yoshimurahiroyuki/workspace/threejs/src/handspiner.json';

  let loader = new THREE.JSONLoader();　　
  loader.load(modelPath, function(geo, mat) {　　　
    geometry = geo;
    material = mat;

		for (let i=0; i < howManyChara; i++ ) {
      let phongMat = new THREE.MeshPhongMaterial(mat);
      model[i] = new THREE.Mesh(geo, phongMat);

			let randX = 600 * Math.random()-300;
			let randY = 600 * Math.random()-300;
			let randZ = 400 * Math.random()-200;
		  

    	model[i].scale.set(0.5, 0.5, 0.5);　
    	let randColor = Math.random() * 0xffffff ;　　　
    	model[i].material.color = new THREE.Color(randColor);
    	scene.add(model[i]);　　　
		} 
    render();
  });　
}

function render () {
	console.log("coming");

  requestAnimationFrame(render);

/*
	for (let i=0; i < howManySpinners; i++ ) {
  	model[i].rotation.y += rotate_speed;
    model[i].position.y += (Math.sin(r_radian) - Math.sin(r_radian-0.01))*150 ;
		console.log("hoge");
	}
*/
  let cameraZ = 150 * (Math.sin(c_radian)) +150;
 // let cameraZ = 0; 
	camera.position.set(0, 600, cameraZ);

  controls.update();
  renderer.render(scene, camera);
}

function changeRotateSpeed () {
  //controls.autoRotateSpeed = vm.count*10;
 	rotate_speed += vm.count*0.01;
  for (let i=0 ; i < howManySpinners; i++) {
		model[i].rotation.y = 1.8*vm.count;
  }
}

renderBrain();

