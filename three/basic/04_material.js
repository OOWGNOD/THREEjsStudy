import * as THREE from '../build/three.module.js';
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"

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
    _setupModel() {
        const material = new THREE.MeshBasicMaterial({
            visible : true,
            transparent: false,
            opcity: 1,
            depthTest: true,
            depthWrite: true,
            side: THREE.FrontSide,
            
            color: 0xffff00,
            wireframe: false
        });

        const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        box.position.set(-1, 0, 0);
        this._scene.add(box);

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), material);
        sphere.position.set(1, 0, 0);
        this._scene.add(sphere);
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
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.HemisphereLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
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