import * as THREE from '../build/three.module.js';
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"
import { VertexNormalsHelper } from "../examples/jsm/helpers/VertexNormalsHelper.js"

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

//  Material 정육면체 안에 랜덤위치에 생성되는 구의 집합체 생성
// _setupModel() {
//     const vertices = [];
//     for(let i =0; i <10000; i++) {
//         const x = THREE.Math.randFloatSpread(5);
//         const y = THREE.Math.randFloatSpread(5);
//         const z = THREE.Math.randFloatSpread(5);
        
//         vertices.push(x,y,z);
//     }

//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute(
//         "position",
//         new THREE.Float32BufferAttribute(vertices, 3)
//     );


//     const sprite = new THREE.TextureLoader().load(
//         "../examples/textures/sprites/disc.png"
//     );
//     const material = new THREE.PointsMaterial({
//         map: sprite,
//         color: "#00ffff",
//         size: 0.1,
//         sizeAttenuation: true
//     });

//     const points = new THREE.Points(geometry, material);
//     this._scene.add(points);
// };
// =============================================================

// vertices의 구성 좌표대로 라인으로 연결돼 생성
//  Line, Linesegments , LineLoop 등이 있음
    // _setupModel() {
    //     const vertices = [
    //         -1, 1, 0,
    //         1, 1, 0,
    //         -1 ,-1 ,0,
    //         1, -1, 0
    //     ];

    //     const geometry = new THREE.BufferGeometry();
    //     geometry.setAttribute("position",
    //     new THREE.Float32BufferAttribute(vertices, 3));

    //     const material = new THREE.LineDashedMaterial({
    //         color: 0xffff00,
    //         dashSize: 0.2,
    //         gapSize: 0.1,
    //         scale: 2
    //     });

    //     const line = new THREE.LineLoop(geometry, material);
    //     this._scene.add(line);
    // }
// =================================================================

    // MeshLambertMaterial 매쉬를 구성하는 정점에서 광원의 영향을 계산하는 물질

    // _setupModel() {
    //     const material = new THREE.MeshLambertMaterial({
    //         visible : true, // 랜더링시 매쉬가 보일지 안 보일지 지정
    //         transparent: true, // 재질의 불투명도 사용여부
    //         opacity: 0.9, // 재질의 불투명도 값 0투명 1불투명
    //         depthTest: true, // depthBuffer는 깊이 버퍼이고 z버퍼 , z버퍼는 3차원 객체를 카메라를 통한 좌표를 변환시켜 화면상에
    //         // 랜더링 될때 3차원 객체를 구성하는 각 픽셀에 대한 z값 좌표값을 0~1로 정규화, 이 정규화된 z값이 저장된 버퍼가 z버퍼
    //         // 이 값이 작을수록 카메라에서 가까운 3차원 객체의 픽셀임 , 카메라로부터 거리에 z 버퍼값이 비례 , z버퍼값이 작을수록 어두운 색상
    //         depthWrite: true,
    //         side: THREE.DoubleSide, // 매시를 구성하는 면에 대해서 앞,뒤 렌더링 여부 Front,Back,Double(Side)
            
    //         color: '#d25383', // 재질의 색상
    //         emissive: 0x555500, // 다른광원의 영향을 받지않는 재질 자체에서 방출하는 색상 기본값 검정
    //         wireframe: true // 매시를 선으로 표현할것인지
    //     });

// =================================================================

// MeshPhongMaterial
//      매쉬가 랜더링되는 픽셀단위를 광원의 영향을 계산하는 재질
// _setupModel() {
//     const material = new THREE.MeshPhongMaterial({
//         color: 0xff0000,
//         emissive: 0x00000,
//         specular: 0xffff00, // 광원에 의해서 반사되는 색상 기본값 연한 회색
//         shininess: 10,
//         flatShading: true, // PBR재질(Physically Based Rendering) MeshStandardMaterial, MeshPhysicalMaterial
//         wireframe: false
//     });

// =================================================================

    // _setupModel() {
    //     const material = new THREE.MeshStandardMaterial({
    //         color: 0xff0000,
    //         emissive: 0x00000,
    //         roughness: 0.25, // 표면의 거칠기
    //         metalness: 0.7, // 0~1 금속성

    //         flatShading: false, // PBR재질(Physically Based Rendering) MeshStandardMaterial, MeshPhysicalMaterial
    //         wireframe: false
    //     });

// ======== Texture map  =========================================================

// _setupModel() {
//         const textureLoader = new THREE.TextureLoader();
//         const map = textureLoader.load(
//             "../examples/textures/uv_grid_opengl.jpg",
//             texture => {
//                 texture.repeat.x = 1; // 기본값 1
//                 texture.repeat.y = 1; // 기본값 1

//                 texture.wrapS = THREE.ClampToEdgeWrapping;
//                 texture.wrapT = THREE.ClampToEdgeWrapping;
                
//                 texture.offset.x = 0; // 기본값 0
//                 texture.offset.y = 0; // 기본값 0

//                 texture.rotation = THREE.MathUtils.degToRad(45);

//                 texture.center.x = 0.5;
//                 texture.center.y = 0.5;

//                 texture.magFilter = THREE.LinearFilter;
//                 texture.minFilter = THREE.NearestMipMapLinearFilter;
//             }
//         )

// =================================================================


        _setupModel() {
            const textureLoader = new THREE.TextureLoader();
            
            const map = textureLoader.load("image/glass/Glass_Window_002_ambientOcclusion.jpg");
            const mapAO = textureLoader.load("image/glass/Glass_Window_002_basecolor.jpg");
            const mapHeight = textureLoader.load("image/glass/Glass_Window_002_height.png");
            const mapNormal = textureLoader.load("image/glass/Glass_Window_002_normal.jpg");
            const mapRoughness = textureLoader.load("image/glass/Glass_Window_002_roughness.jpg");
            const mapMetalic = textureLoader.load("image/glass/Glass_Window_002_metallic.jpg");
            const mapAlpha = textureLoader.load("image/glass/Glass_Window_002_opacity.jpg");
        
    

    const material = new THREE.MeshStandardMaterial({
        // map: map,
        normalMap: mapNormal, // 법선 벡터를 이미지화해서 저장 법선벡터(광원에 대한 에너지양 계산)
        
        displacementMap: mapHeight, // 구성좌표
        displacementScale: 0.2, // 변이 정도
        displacementBias: -0.15,
    });

        const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 256, 256, 256), material);
        box.position.set(-1, 0, 0);
        this._scene.add(box);

        // const boxHelper = new VertexNormalsHelper(box, 0.1, 0xffff00);
        // this._scene.add(boxHelper);

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 512, 512), material);
        sphere.position.set(1, 0, 0);
        this._scene.add(sphere);

        // const sphereHelper = new VertexNormalsHelper(sphere, 0.1, 0xffff00);
        // this._scene.add(sphereHelper);

    }
    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            100
        );

        camera.position.z = 3;
        this._camera = camera;
        this._scene.add(camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        // this._scene.add(light);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}

window.onload = function () {
    new App();
}