// //引入three
// import * as THREE from 'three';
// let scene, camera, renderer
// //创建场景
// function createScene() {
//   scene = new THREE.Scene();
// }

// //创建摄像机
// function createCamera() {
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
// }

// //创建渲染器(画布)
// function render() { 
//   renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight );
// }

// //创建添加到DOM
// function addDOM(){
//   document.body.append(renderer.domElement);
//   renderer.render(scene,camera)
// }

// //初始化加载
// function init() {
//   createScene();
//   createCamera();
//   render()
//   addDOM()
// }
// init()