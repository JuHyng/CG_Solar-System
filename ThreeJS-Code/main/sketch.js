// import * as Planet from './src/constants/planets.js';
// import { AU, SIDERAL_DAY, NM_TO_KM, DAY, HOUR,KM } from './src/constants/index.js';
//import {THREE} from './node_modules/three';
const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  scaleToView: true
};


//camera option(global object)
var camera;
var projector, mouse = { x: 0, y: 0 };
var renderer;
var scene;
var controls;
//value is object distance z(정면에서 보기위해서)
var value_z = 0;
//move flag(버튼을 연속으로 못누르게 lock)
var flag = 0;
//rendering ID
var moveID;
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

window.onload = function init() 
{ 
  //const p = SUN.radius;
  
	var canvas = document.getElementById( "gl-canvas" );
  // RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha : true,
  });

  renderer.setClearColor("#121212", 1);

  // CAMERA
  camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
  camera.position.set(30, 5, 35);

  // ORBIT CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(30, 0, 0);

  /*
   * TEXTURES
   */
  const loader = new THREE.TextureLoader();
  
  const sunTexture = loader.load("assets/sun.jpg");
  const mercuryTexture = loader.load("assets/mercury.jpg");
  const venusTexture = loader.load("assets/venus.jpg");
  const earthTexture = loader.load("assets/earth.jpg");
  const marsTexture = loader.load("assets/mars.jpg");
  const jupiterTexture = loader.load("assets/jupiter.jpg");
  const saturnTexture = loader.load("assets/saturn.jpg");
  const uranusTexture = loader.load("assets/uranus.jpg");
  const neptuneTexture = loader.load("assets/neptune.jpg");
  const plutoTexture = loader.load("assets/pluto.jpeg");

  /*
   * MATERIALS
   */
  const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
  const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
  const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
  const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture});
  const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
  const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
  const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
  const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
  const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
  const plutoMaterial = new THREE.MeshStandardMaterial({ map: plutoTexture });

  const labelContainerElem = document.querySelector('#labels');//-DongMin

  //scene
  scene = new THREE.Scene();
  /*
    * background
    */
  const loader2 = new THREE.CubeTextureLoader();//큐브형식으로 배경 
  const texture = loader2.load([
      './space_ship/ress/space2-1.jpg',
      './space_ship/ress/space2-2.jpg',
      './space_ship/ress/space2-3.jpg',
      './space_ship/ress/space2-4.jpg',
      './space_ship/ress/space2-5.jpg',
      './space_ship/ress/space2-6.jpg',
  ]);
  texture.encoding = THREE.sRGBEncoding;
  scene.background = texture;

  /*
   * MESH
   */
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  //plants number
  var plants_number = 10;//-DongMin
  var plants_Mesh = [];//-DongMin

  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  sunMesh.position.set(0, 0, 0);
  sunMesh.scale.setScalar(10);
  scene.add(sunMesh);
  plants_Mesh = plants_Mesh.concat(sunMesh);//-DongMin
  
  const mercuryGroup = new THREE.Group();
  const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
  createPlanet(scene, mercuryMesh, mercuryGroup, 25, 0.8,"MERCURY");//-DongMin
  plants_Mesh = plants_Mesh.concat(mercuryMesh);//-DongMin

  const venusGroup = new THREE.Group();
  const venusMesh = new THREE.Mesh(geometry, venusMaterial);
  createPlanet(scene, venusMesh, venusGroup, 28, 0.9,"VENUS");//-DongMin
  plants_Mesh = plants_Mesh.concat(venusMesh);//-DongMin

  const earthGroup = new THREE.Group();
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  createPlanet(scene, earthMesh, earthGroup, 31, 1,"EARTH");//-DongMin
  plants_Mesh = plants_Mesh.concat(earthMesh);//-DongMin

  const marsGroup = new THREE.Group();
  const marsMesh = new THREE.Mesh(geometry, marsMaterial);
  createPlanet(scene, marsMesh, marsGroup, 34, 0.8,"MARS");//-DongMin
  plants_Mesh = plants_Mesh.concat(marsMesh);//-DongMin

  const jupiterGroup = new THREE.Group();
  const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
  createPlanet(scene, jupiterMesh, jupiterGroup, 42, 3.5,"JUPITER");//-DongMin
  plants_Mesh = plants_Mesh.concat(jupiterMesh);//-DongMin

  const saturnGroup = new THREE.Group();
  const saturnMesh = new THREE.Mesh(geometry, saturnMaterial);
  createPlanet(scene, saturnMesh, saturnGroup, 50, 2.9,"SATURN");//-DongMin
  plants_Mesh = plants_Mesh.concat(saturnMesh);//-DongMin

  const uranusGroup = new THREE.Group();
  const uranusMesh = new THREE.Mesh(geometry, uranusMaterial);
  createPlanet(scene, uranusMesh, uranusGroup, 56, 1.7, "URANUS");//-DongMin
  plants_Mesh = plants_Mesh.concat(uranusMesh);//-DongMin

  const neptuneGroup = new THREE.Group();
  const neptuneMesh = new THREE.Mesh(geometry, neptuneMaterial);
  createPlanet(scene, neptuneMesh, neptuneGroup, 60, 1.65, "NEPTUNE");//-DongMin
  plants_Mesh = plants_Mesh.concat(neptuneMesh);//-DongMin

  const plutoGroup = new THREE.Group();
  const plutoMesh = new THREE.Mesh(geometry, plutoMaterial);
  createPlanet(scene, plutoMesh, plutoGroup, 64, 0.5,"PLUTO");//-DongMin
  plants_Mesh = plants_Mesh.concat(plutoMesh);//-DongMin

  /*
   * LIGHTING
   */
  const light = new THREE.PointLight("white", 1.25);
  light.position.set(0, 0, 0);
  scene.add(light);

  // illuminate the sun
  createSpotlights(scene);

  /*
   * HELPERS
   */
  scene.add(new THREE.PointLightHelper(light, 0.2));
  //scene.add( new THREE.SpotLightHelper( spotLightLeft ));
  scene.add(new THREE.GridHelper(75, 50));


  var clock = new THREE.Clock();
  var speed = 1;
  var delta = 0;
  var movement = 1;

  // draw each frame
  render();

  function render(){
    // var time = clock.getElapsedTime(); 

    // console.log(time);
    controls.update();
    movement +=0.1;
    sunMesh.rotation.y = movement * 0.05

    mercuryGroup.rotation.y = movement * 0.5;
    mercuryMesh.rotation.y = movement * 0.20;

    venusGroup.rotation.y = movement * 0.35;
    venusMesh.rotation.y = movement * 0.18;

    earthGroup.rotation.y = movement * 0.3;
    earthMesh.rotation.y = movement * 0.15;

    marsGroup.rotation.y = movement * 0.2;
    marsMesh.rotation.y = movement * 0.2;

    jupiterGroup.rotation.y = movement * 0.05;
    jupiterMesh.rotation.y = movement * 0.05;

    saturnGroup.rotation.y = movement * 0.03;
    saturnMesh.rotation.y = movement * 0.25;

    uranusGroup.rotation.y = movement * 0.02;
    uranusMesh.rotation.y = movement * 0.25;

    neptuneGroup.rotation.y = movement * 0.015;
    neptuneMesh.rotation.y = movement * 0.25;

    plutoGroup.rotation.y = movement * 0.005;
    plutoMesh.rotation.y = movement * 0.2;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

      //controls.dispose();
      //renderer.dispose();
  function createPlanet(scene, mesh, group, x, scale, name) {//-DongMin
    const elem = document.createElement('div');//-DongMin
    elem.textContent = name;//-DongMin
    labelContainerElem.appendChild(elem);//-DongMin
    mesh.position.set(x, 0, 0);
    mesh.scale.setScalar(scale);
    group.add(mesh);
    scene.add(group);
  }
  function createSpotlights(scene) {
    var color = 0xFFFFFF;
    var intensity = 5;
    var distance = 25;
    var angle = Math.PI/7;

    new Array(6).fill('').forEach((item, i) => {
      var spotlight = new THREE.SpotLight(color, intensity, distance, angle);
      var value = i % 2 === 0 ? 25 : -25;

      spotlight.position.set(
        i < 2 ? value : 0,
        i >= 2 && i < 4 ? value : 0,
        i >= 4 ? value : 0
      );
    scene.add( spotlight );
  });
}


  //camera button
  var button_list = [];
  var object_num =0;
  for(var i=0; i < plants_number; i++){
    button_list = button_list.concat("Button"+i);
  }

  //sun
  document.getElementById(button_list[0]).onclick = function(event){
    value_z = 15;//value_Z는 정면에서 보기 위한 z축의 값
    object_num = 0;
    sunMesh.updateWorldMatrix(true,false);
    var tempV = new THREE.Vector3();
    plants_Mesh[0].getWorldPosition(tempV);

    moveCam(tempV.x,tempV.y,tempV.z,tempV.x,tempV.y,tempV.z,plants_Mesh[0]);
    //moveCam(scene.children[object_num].position.x,scene.children[object_num].position.y,scene.children[object_num].position.z,scene.children[object_num].position.x,scene.children[object_num].position.y,scene.children[object_num].position.z);
  };

  //plant
  for(i=1;i<plants_number;i++){  
    var temp_button = document.getElementById(button_list[i])
    temp_button.button = i;
    temp_button.onclick = function(event){
      //scene.children[5].children[0].position.x
      value_z = 5;//value_Z는 정면에서 보기 위한 z축의 값
      object_num = event.path[0].button;//plant order
      // moveCam(scene.children[object_num].children[0].position.x,scene.children[object_num].children[0].position.y,scene.children[object_num].children[0].position.z,scene.children[object_num].children[0].position.x,scene.children[object_num].children[0].position.y,scene.children[object_num].children[0].position.z);

      var tempV = new THREE.Vector3();
      plants_Mesh[object_num].getWorldPosition(tempV);

      moveCam(tempV.x,tempV.y,tempV.z,tempV.x,tempV.y,tempV.z,plants_Mesh[object_num]);

    };
  }
  document.getElementById("Button_Init").onclick = function(){
    value_z = 0;
    moveCam(0, 30, 0,0,0,0,0);
  };

  /*
  * Space Ship
  */
  document.getElementById("Button_Space_ship").onclick = function(){
    space_ship_render();
  };


};


//camera moving -DongMin
function moveCam(eye_x, eye_y, eye_z, target_x, target_y, target_z, Mesh)
{   
  window.cancelAnimationFrame(moveID);
  if(flag == 1)
  return;
  //button lock
  flag = 1;

  var loading_num = 20;

  //move eye changeed value(변화량)
  var m_e_x = (eye_x - camera.position.x)/loading_num;
  var m_e_y = (eye_y - camera.position.y)/loading_num;
  var m_e_z = (eye_z - camera.position.z + value_z)/loading_num;
  //move target changeed value(변화량)
  var m_t_x = (target_x - controls.target.x)/loading_num;
  var m_t_y = (target_y - controls.target.y)/loading_num;
  var m_t_z = (target_z - controls.target.z)/loading_num;

  // console.log(m_e_x,m_e_y,m_e_z);
  // console.log(m_t_x,m_t_y,m_t_z);

  //camera position
  var c_x = camera.position.x;
  var c_y = camera.position.y;
  var c_z = camera.position.z;

  //target position
  var t_x = controls.target.x;
  var t_y = controls.target.y;
  var t_z = controls.target.z;
  var i = 0;

  function move_view(){
    i++;
    camera.position.set ( c_x + i*m_e_x, c_y + i*m_e_y, c_z + i*m_e_z  );
    controls.target.set( t_x + i*m_t_x, t_y + i*m_t_y, t_z + i*m_t_z);
    renderer.render(scene,camera);
    controls.update();
    if(i != loading_num)
      moveID=window.requestAnimationFrame(move_view);
    else{
      window.cancelAnimationFrame(moveID);
    function move_object(){
      var tempV = new THREE.Vector3();
      Mesh.getWorldPosition(tempV);
      camera.position.set(tempV.x,tempV.y,tempV.z + value_z);
      controls.target.set(tempV.x,tempV.y,tempV.z);
      renderer.render(scene,camera);
      controls.update();
      moveID=window.requestAnimationFrame(move_object);
    }
    if(Mesh != 0){
      move_object();
    }
      //button unlock
      flag = 0;
    }
  }
  move_view();
}
/*
* Spcae ship
*/
function space_ship_render(){
  window.cancelAnimationFrame(moveID);

  var goal,follow,mesh,keys;
  var coronaSafetyDistance = 0.3;
  var velocity = 0.0;
  var speed = 0.0;
  var temp = new THREE.Vector3;
  var dir = new THREE.Vector3;
  var temp = new THREE.Vector3;
  var dir = new THREE.Vector3;
  var a = new THREE.Vector3;
  var b = new THREE.Vector3;

  var geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );// 테스트용 큐브 object
  var material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh( geometry, material );
    
  goal = new THREE.Object3D;
  follow = new THREE.Object3D;
  follow.position.z = -coronaSafetyDistance;
  mesh.add( follow );
  
  goal.add( camera );
  scene.add( mesh );


  keys = {//방향키 초기화
    a: false,
    s: false,
    d: false,
    w: false
  };
  
  document.body.addEventListener( 'keydown', function(e) {
    
    const key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = true;
    
  });
  document.body.addEventListener( 'keyup', function(e) {
    
    const key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = false;
    
  });

  animate_spaceship();

function animate_spaceship() {

  // controls.update();

  requestAnimationFrame( animate_spaceship );
    
  speed = 0.0;
  
  if ( keys.w )//w면 앞으로
    speed = 0.01;
  else if ( keys.s )//s면 뒤로
    speed = -0.01;

  velocity += ( speed - velocity ) * .3;
  mesh.translateZ( velocity );

  if ( keys.a ){//a면 왼쪽 회전
    mesh.rotateY(0.05);
    
  }
  else if ( keys.d )//d면 오른쪽 회전
    mesh.rotateY(-0.05);
    
  //////////////////////////////////////////
  //이부분에서 물체 회전 할 때 카메라 회전하는게 조금 부자연스러워서 로직 수정해야함
  a.lerp(mesh.position, 0.4);
  b.copy(goal.position);//goal == camera
  
    dir.copy( a ).sub( b ).normalize();
    const dis = a.distanceTo( b ) - coronaSafetyDistance;
    goal.position.addScaledVector( dir, dis );
    goal.position.lerp(temp, 0.02);
    temp.setFromMatrixPosition(follow.matrixWorld);
    
    camera.lookAt( mesh.position );
    controls.target.set(mesh.position.x,mesh.position.y,mesh.position.z);
    
    renderer.render( scene, camera );
    controls.update();
    ///////////////////////

}
}