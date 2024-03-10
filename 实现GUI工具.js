import './style.css'
//目标:借助 GUI 工具辅助调试 3D 物体
//使用图形界面调整物体参数等
// 步骤:
//  1.下载并引入 data.gui
//  2.创建 GUI 对象
//  3.添加具体控制器
import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as dat from 'dat.gui';

const gui = new dat.GUI()
let scene, camera, renderer
let controls
let cube
function init() {
    //创建场景
    scene = new THREE.Scene();
    //创建相机()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // 把摄像机向后移动五个单位
    camera.position.z = 5;
    //创建渲染器(画布)
    renderer = new THREE.WebGLRenderer({
        //开启抗锯齿
        antialias: true
    });
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
    cube = new THREE.Mesh(geometry, material);

    //4.物体添加到场景当中
    scene.add(cube)
}
//创建轨道控制器
function createControls() {
    controls = new OrbitControls(camera, renderer.domElement);

    //开启阻尼效果
    controls.enabled = true

    //开启轨道控制器自动旋转
    // controls.autoRotate = true

    //控制轨道控制器旋转的速度
    // controls.autoRotateSpeed = 10.0

    //设置垂直旋转角度的上限
    // controls.maxPolarAngle = Math.PI

    //设置垂直旋转角度的下限
    // controls.minPolarAngle = 1.5

    //设置水平旋转角度的上限
    // controls.maxAzimuthAngle = 1.5 * Math.PI
    //设置水平旋转角度的下限
    // controls.minAzimuthAngle = 0.5 * Math.PI

    //设置摄像机向外移动的距离
    controls.maxDistance = 20
    //设置摄像机向内移动的距离
    controls.minDistance = 3
}


//循环渲染中更新场景
function renderLoop() {
    //循环渲染
    requestAnimationFrame(renderLoop);


    cube.rotation.x += 0.1
    //更新
    controls.update();

    //将相机和场景渲染到画布
    renderer.render(scene, camera)
}
//1.创建坐标轴
function createHelper() {
    //创建坐标轴
    const axesHelper = new THREE.AxesHelper(10);
    //将坐标轴添加到场景中
    scene.add(axesHelper)
}

//创建适配方法  //作用:浏览器发生变化，画布大小随着浏览器的变化而变化
function renderResize() {
    window.addEventListener("resize", () => {
        //重新设置画布大小
        renderer.setSize(window.innerWidth, window.innerHeight)
        //重新设置摄像机宽高比
        camera.aspect = window.innerWidth / window.innerHeight

        //重新更新堆体空间
        camera.updateProjectionMatrix()
    })
}

//1.移动物体
function moveCude() {
    //在x轴进行移动
    cube.position.x = 10
    //在x轴进行旋转
    // cube.rotation.x = Math.PI / 4

    cube.scale.z = 0.5
}

//1.创建GUI工具
function createGUI() {
    //2.创建GUI对象’
    const gui = new dat.GUI();
    //3.添加具体控制器
    //添加标题控制器
    gui.add(document, 'title')
    //控制物体显示或者隐藏
    gui.add(cube, 'visible')
    //重置轨道控制器
    gui.add(controls, 'reset')
    //添加颜色
    const colorObj = {
        "col": `#${cube.material.color.getHexString()}`
    }

    gui.addColor(colorObj, 'col').onChange((val) => {
        cube.material.color = new THREE.Color(val)
    })

    //添加分组
    const group = gui.addFolder("位移")
    group.add(cube.position, 'x', 0, 10, 1)
    group.add(cube.position, 'y', 0, 10, 1)
    group.add(cube.position, 'z', 0, 10, 1)

    gui.add({ type: "1" }, "type", { '方案1': '1', '方案2': '2' }).onChange((val) => {
        console.log("val=>", val);
        switch (val) {
            case '1':
                cube.position.x = 10
                break;
            case '2':
                cube.position.x = 5
                break;
        }
    })

}
//初始化加载场景和摄像机方法
init()
//调用创建立方体方法
createCube()

//调用轨道控制器方法
createControls()

//调用坐标轴方法
createHelper()

//调用移动物体方法
moveCude()

//调用循环渲染中更新场景
renderLoop()

//调用createGUI方法
createGUI()

//调用适配方法
renderResize()