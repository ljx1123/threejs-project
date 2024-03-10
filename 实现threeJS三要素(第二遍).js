//第二遍
// 1.引入three。js
import * as THREE from 'three';

//定义全局变量，保存摄像机实例、场景实例、渲染器(画布)的实例
let scenc, camera, renderer;

//初始化加载场景与相机
function init() {
    //2.创建场景对象
    scenc = new THREE.Scene();

    //3.创建相机对象(透视摄像机)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    //4.创建渲染器(画布)
    renderer = new THREE.WebGLRenderer();
    //  画布大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    //  5.将相机与场景渲染到画布上面
    renderer.render(scenc, camera);

    //6.添加到DOM
    document.body.append(renderer.domElement)
}
init();