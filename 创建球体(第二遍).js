import './style.css'
import * as THREE from 'three'
let scene, camera, renderer
function init() {
    //创建场景
    scene = new THREE.Scene();
    //创建相机()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // 把摄像机向后移动五个单位
    camera.position.z = 5;
    //创建渲染器(画布)
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //将画布添加到DOM
    document.body.append(renderer.domElement)
}
// init()

// 创建球体
function createCube() {
    const geometry = new THREE.SphereGeometry(1, 32, 16);

    //创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    //创建网络物体对象
    const sphere = new THREE.Mesh(geometry, material);

    //把物体传入到场景中
    scene.add(sphere)
}
//初始化加载场景和摄像机方法
init()
//调用创建立方体方法
createCube()

//将相机和场景渲染到画布
renderer.render(scene, camera)