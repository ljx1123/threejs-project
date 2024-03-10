//目标:了解如何与 three.js 的3D物体进行交互
//做法:
import './style.css'
import * as THREE from 'three';
//引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入性能监视器的组件
import Stats from 'three/examples/jsm/libs/stats.module.js';

//引入3D转换器和渲染器
import {
  CSS3DRenderer,
  CSS3DObject,
} from "./node_modules/three/examples/jsm/renderers/CSS3DRenderer.js";


//创建场景、摄像机、渲染器(画布)css3D渲染器的全部变量
let scene, camera, renderer, labelRenderer
//创建物体的全局变量
let cube;
//创建轨道控制器的全局变量
let controls;
//创建性能监视器的全局变量
let stats;
//创建分组的全局变量
let group;

//初始化加载场景与摄像机
function init() {
  //创建场景
  scene = new THREE.Scene();
  //创建摄像机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //调整摄像机位置到盒子中间
  //不能给0的原因:轨道控制器内部会取出摄像机初始位置的变化
  // camera.position.z = 0.1;
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

//创建分组
function createGroup() {
  //创建分组
  group = new THREE.Group();
}

//创建立方体
function createCube() {

  //创建一个数组，保存多个立方体的数据0-255的数字
  const cubeInfoArr = []


  for (let i = 0; i < 1; i++) {
    const obj = {
      //问题:生成一个随机到0-255
      color: `rgb(${Math.floor(Math.random() * (255 - 0 + 1) + 0)},${Math.floor(Math.random() * (255 - 0 + 1) + 1)},${Math.floor(Math.random() * (255 - 0 + 1) + 1)},${Math.floor(Math.random() * (255 - 0 + 1) + 2)})`,
      w: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      h: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      d: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      x: Math.floor(Math.random() * (5 - -5 + 1) + -5),
      y: Math.floor(Math.random() * (5 - -5 + 1) + -5),
      z: Math.floor(Math.random() * (5 - -5 + 1) + -5),
    }
    cubeInfoArr.push(obj)
  }
  console.log('cubeInfoArr', cubeInfoArr);

  cubeInfoArr.map(item => {
    //创建图形
    const geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
    //创建材质
    const material = new THREE.PointsMaterial({ color: item.color, size: 0.1 });
    //创建网格对象
    cube = new THREE.Points(geometry, material);
    //设置立方体的坐标
    cube.position.set(item.x, item.y, item.z);
    //给创建的立方体定义名称
    cube.name = 'cn'

    //将立方体添加到分组当中
    group.add(cube);

  })
  //将分组添加到场景当中
  scene.add(group);
  // const geometry = new THREE.BoxGeometry(1, 1, 1);



  // //创建材质
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
}

//创建圆形缓冲几何体
function createCircle() {
  //创建图形
  const geometry = new THREE.CircleGeometry(5, 32);
  //创建材质
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
  //创建物体网格对象,并将图形与材质渲染到物体网格对象
  const circle = new THREE.Mesh(geometry, material);

  circle.position.set(10, 10, 10);
  circle.name = 'circle1'
  //将物体添加到场景
  scene.add(circle);
}

//创建球形缓冲几何体(点材质)
function createSphere() {
  //创建图形
  const geometry = new THREE.SphereGeometry(2, 32, 16);
  //创建材质(点材质)
  const material = new THREE.PointsMaterial({ color: 0xff1100, size: 0.05 });
  //创建点对象
  const sphere = new THREE.Points(geometry, material);
  //设置球体坐标
  sphere.position.set(-5, -5, -5);
  //添加到场景
  scene.add(sphere);

}

//创建球形缓冲几何体(线段材质)
function createSphereCopy() {
  //创建图形
  const geometry = new THREE.SphereGeometry(2, 32, 16);
  //创建材质(点材质)
  const material = new THREE.LineBasicMaterial({ color: 0x6600ff, linewidth: 1, });
  //创建点对象
  const sphere = new THREE.Line(geometry, material);
  //设置球体坐标
  sphere.position.set(7, 9, 3);
  //添加到场景
  scene.add(sphere);

}


//创建球形缓冲几何体,并且进行全景的贴图（地图）
function createMap() {
  //创建图形
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // new THREE.TextureLoader().setPath() //公共的baseurl路径
  //创建纹理加载器
  const texture = new THREE.TextureLoader().load("img/earth/earth.jpg");
  //创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    // side: THREE.DoubleSide,
  });
  //创建物体
  const sphere = new THREE.Mesh(geometry, material);
  //添加到场景
  scene.add(sphere);
}

//创建立方缓冲体并进行贴图
function createCubeAndImage() {
  //图片路径数组(加载不同纹理图片并创建材质对象6个)
  const imgUrlArr = ["1.JPG", 'IMG_2627.JPG', "IMG_3460.JPG", "IMG_4142.JPG", "IMG_E4045.JPG", "OASB4914.JPG"]
  //创建图形
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //使用纹理加载器
  const textureLoader = new THREE.TextureLoader() //初始化纹理加载器
  textureLoader.setPath("img/park/") //设置公共的资源路径
  // texture.load()
  const materialArr = imgUrlArr.map(item => {
    //加载图片
    const texture = textureLoader.load(item)

    //three.js颜色通道为rgb颜色(为了防止图片太浅)
    texture.colorSpace = THREE.SRGBColorSpace

    //创建材质 
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
  })
  //创建物体
  const cube = new THREE.Mesh(geometry, materialArr);

  //2.调整立方体沿着z轴做-1缩小(镜像翻转)
  cube.scale.set(1, 1, -1)
  //添加到场景
  scene.add(cube);
}


//创建平面网格物体 并将视频进行加载
function createPlaneMap() {
  //创建图形
  const geometry = new THREE.PlaneGeometry(1, 0.5);
  //创建视频标题
  const video = document.createElement('video')
  //设置视频资源路径
  video.src = "video/musis_cat.mp4"
  //设置视频静音
  video.muted = true
  //监听资源加载完毕进行播放
  video.addEventListener("loadedmetadata", () => {
    video.play()
  })

  //创建视频的纹理加载器
  const texture = new THREE.VideoTexture(video)


  //创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture
  });
  //创建物体
  const plane = new THREE.Mesh(geometry, material);
  //添加到场景
  scene.add(plane);


  //创建button按钮
  const button = document.createElement("button")
  //创建button元素的文本
  button.innerHTML = '播放'
  //设置button按钮样式为固定定位
  button.style.position = 'fixed'
  button.style.left = '0'
  button.style.buttom = '0'
  //添加到body中
  document.body.appendChild(button)
  //监听按钮点击事件
  button.addEventListener('click', () => {
    video.muted = !video.muted
  })
}

//把原生 DOM 标签转换后加入到 3D 场景空间中显示
function domTo3D() {
  //1.准备原生DOM标签和内容样式
  const tag = document.createElement("span");
  tag.innerHTML = "我是文字";
  tag.style.color = "white";

  //2.将2D转换为3D
  const tag3d = new CSS3DObject(tag)
  tag3d.scale.set(1 / 16, 1 / 16, 1 / 16)
  scene.add(tag3d)

  //通过3d渲染器渲染到浏览器
  labelRenderer = new CSS3DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.pointerEvents = 'none'
  labelRenderer.domElement.style.position = 'fixed'
  labelRenderer.domElement.style.left = '0'
  labelRenderer.domElement.style.top = '0'
  document.body.appendChild(labelRenderer.domElement)
}

//将原生DOM转化并渲染到3d场景,并且给原生DOM添加点击事件
function domTo3DCopy() {
  // 1.创建原生DOM标签
  const tag = document.createElement('div')
  tag.innerHTML = '前进'
  tag.className = 'custom-text'
  tag.style.color = 'white'
  tag.style.cursor = 'pointer'
  tag.addEventListener('click', () => {
    alert()
  })
  //2.将2D转换为3D
  const tag3d = new CSS3DObject(tag)
  tag3d.scale.set(1 / 40, 1 / 40, 1 / 40)
  scene.add(tag3d)

  //3.将3d文本场景场景渲染到
  labelRenderer = new CSS3DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.pointerEvents = 'none'
  labelRenderer.domElement.style.position = 'fixed'
  labelRenderer.domElement.style.left = '0'
  labelRenderer.domElement.style.top = '0'
  document.body.appendChild(labelRenderer.domElement)
}

//实现3d物体添加点击事件
function bindClick() {
  //1.先给DOM绑定点击事件
  window.addEventListener('click', () => {
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(pointer, camera)

    const list = raycaster.intersectObjects(scene.children)
    console.log("list", list);
    const e = list.find(item => item.object.name === 'circle1')
    console.log("e", e);
    if (e) return alert('666')
  })
}







//创建一条连续的线
function createLine() {
  const points = []
  points.push(new THREE.Vector3(-1, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 1));
  points.push(new THREE.Vector3(2, 2, 2));
  //创建图形
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  //创建材质
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  //创建线物体
  // const line = new THREE.Line(geometry, material);
  // const line = new THREE.LineLoop(geometry, material);
  const line = new THREE.LineSegments(geometry, material);
  //修改坐标
  // line.position.set(5, 5, 5);
  //添加到场景
  scene.add(line);
}



//创建轨道控制器
function createControl() {
  controls = new OrbitControls(camera, renderer.domElement);

  //开启阻尼效果
  controls.enableDamping = true;

  //设置摄像机向外移动的距离
  // controls.maxDistance = 0.1;
  // //设置摄像机向内移动的距离
  // controls.maxDistance = 0.1
}

//创建循环渲染方法
function renderLoop() {
  //循环渲染
  requestAnimationFrame(renderLoop);
  //手动更新场景
  controls.update();
  //手动更新性能监视器
  stats.update();
  //将场景与摄像机放到渲染器里面
  renderer.render(scene, camera);
  //将场景与摄像机渲染浏览器上面
  labelRenderer.render(scene, camera);
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

//创建性能监视器方法
function createStats() {
  //实例化性能监视器方法
  stats = new Stats();
  //设置监视器面板类型 (0:fps-每秒传输帧数, 1:ms-每帧刷新用时,2:mb-内存占用)
  stats.setMode(0)
  stats.domElement.position = 'fixed';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';
  document.body.appendChild(stats.domElement);
}

//创建删除立方体的方法
function romoveCube() {
  window.addEventListener('dblclick', () => {
    group.children.map(item => {
      //从内存中删除图形
      item.geometry.dispose()
      //从内存中删除材质
      item.material.dispose()
    })
    //从场景中移除分组
    scene.remove(group)
    // const arr = scene.children.filter(item => item.name === 'cn')

    // const c = arr[0]

    // if (c) {
    //     if (arr.length == 1) return
    //     //移除图形
    //     c.geometry.dispose()
    //     //移除材质
    //     c.material.dispose()
    //     //再从场景中移除
    //     // scene.remove(c)
    // }
    // console.log('arr', arr);
  })
}
init()

//调用创建分组方法
createGroup()
// //调用创建物体方法
// createCube()
// //调用圆形集合体
createCircle()

// //调用球形几何体
// createSphere()

// //调用线材质的集合体
// createSphereCopy()

// //调用创建一条线
// createLine()
// //调用全景图贴图
// createMap()

// createCubeAndImage()

// createPlaneMap()
// domTo3D()

domTo3DCopy()
//调用给3D物体添加点击事件
bindClick()


createControl()

createHelper()
//调用性能监视器方法
createStats()

renderLoop()

//调用删除立方体方法
romoveCube()

renderResize()