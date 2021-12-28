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
// CircleGeometry 평면원 (인자4개)
// (원판의 반지름 , 원판의 분할갯수, 시작각도, 연장각도)
// const geometry = new THREE.CircleGeometry(0.9, 32, Math.PI/2, Math.PI);
// ==================================================

// ConeGeometry 원뿔 (인자5개)
// (원뿔의 밑면원의 반지름, 원뿔의 높이, 
//  원뿔의 둘레방향 분할갯수, 원뿔의 높이방향 분할갯수, 원뿔 밑면의 개방여부)
// const geometry = new THREE.ConeGeometry(0.5, 1.5, 12, 8, true);
// ==================================================

// CylinderGeometry 원통 (인자8개)
// (윗면의 반지름 , 밑면의 반지름 , 원통의 높이, 원통의 둘레방향 분할갯수
//  원통의 높이방향 분할갯수, 원통 밑면과 윗면 개방여부, 원뿔의 시작각, 원뿔의 연장각 )
// const geometry = new THREE.CylinderGeometry(0.3, 0.7, 1.2, 32, 12, true, 0, Math.PI);
// =================================================

// SphereGeometry 원통 (인자7개)
// ( 구의 크기, 수평방향의 대한 분할수, 수직방향에 대한 분할수 ,
// 수평 방향에 대한 구의 시작각, 수평 방향에 대한 구의 연장각 
// 수직 방향에 대한 구의 시작각, 수직 방향에 대한 구의 연장각)
// const geometry = new THREE.SphereGeometry(0.9, 32, 12, 0, Math.PI, 0, Math.PI/2);
// =================================================

// RingGeometry 2차원형태 반지 (인자6개)
// (내부 반지름, 외부 반지름, 가장자리 방향의로의 분할수, 내부방향 분할수
// 시작각, 연장각)
// const geometry = new THREE.RingGeometry(0.5, 0.7, 16, 5, 0, Math.PI);
// =================================================

// PlaneGeometry 평면사갹형 (인자4개) 3차원 지형 표현에 Good
// (넓이 , 높이, 넓이방향 분할수, 높이방향 분할수)
// const geometry = new THREE.PlaneGeometry(0.8, 1.5, 4, 3);
// =================================================

// TorusGeometry 3차원형태 반지 (인자5개)
// (반지름, 원통의 반지름, 방사방향 분할수, 원통 분할수, 연장각 길이)
// const geometry = new THREE.TorusGeometry(1, 0.2, 8, 32, Math.PI);
// =================================================

// TorusKnotGeometry 3차원형태 반지들이 꼬인형태 (인자5개)
// (반지름, 원통의 반지름, 분할수, 분할수, 반복횟수, 반복횟수)
// const geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 3, 4);
// =================================================

_setupModel() {
        const geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 3, 4);
        const fillmaterial = new THREE.MeshLambertMaterial({color: 0x515151});
        const cube = new THREE.Mesh(geometry, fillmaterial);

        const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial);
        const group = new THREE.Group()
        group.add(line);
        group.add(cube);
        this._scene.add(group);
        this._cube = group;
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            100
        );

        camera.position.z = 2;
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