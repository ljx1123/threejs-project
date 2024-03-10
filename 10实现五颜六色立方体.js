import './style.css'
import * as THREE from 'three';
//引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//创建场景、摄像机、渲染器(画布)的全部变量
let scene, camera, renderer
//创建物体的全局变量
let cube;
//创建轨道控制器的全局变量
let controls;

//初始化加载场景与摄像机
function init() {
    //创建场景
    scene = new THREE.Scene();
    //创建摄像机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 5;
    //创建渲染器(画布)
    renderer = new THREE.WebGLRenderer({
        //开启抗锯齿
        antialias: true
    });
    //设置画布大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    //将画布添加到DOM中
    document.body.append(renderer.domElement);
}
//创建立方体
function createCube() {

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //1.定义颜色数组(x 正负， y正负 z正负)
    let colorArr = ['red', 'green', 'blue', 'pink', 'orange', 'write']

    //创建材质
    const materialArr = colorArr.map(item => {
        return new THREE.MeshBasicMaterial({ color: item })
    })
    console.log(materialArr);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, materialArr);
    scene.add(cube);
}

//创建轨道控制器
function createControl() {
    controls = new OrbitControls(camera, renderer.domElement);

    //开启阻尼效果
    controls.enableDamping = true;
}

//创建循环渲染方法
function renderLoop() {
    //循环渲染
    requestAnimationFrame(renderLoop);
    //手动更新场景
    controls.update();
    //将场景与摄像机放到渲染器里面
    renderer.render(scene, camera);
}


//创建坐标轴
function createHelper() {
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

//创建适配方法
function renderResize() {
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    })
}
init()

createCube()

createControl()

createHelper()

renderLoop()

renderResize()