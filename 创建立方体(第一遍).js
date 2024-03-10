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

// 创建立方体
function createCube() {
    //1.创建图形 宽高深为 1 单位(创建立法缓冲几何体)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //2.创建材质 颜色为绿色
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //3.创建网格物体对象,传入图形和材质
    const cube = new THREE.Mesh(geometry, material);

    //4.物体添加到场景当中
    scene.add(cube)

}
//初始化加载场景和摄像机方法
init()
//调用创建立方体方法
createCube()

//将相机和场景渲染到画布
renderer.render(scene, camera)