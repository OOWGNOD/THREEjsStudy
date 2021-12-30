import * as THREE from '../build/three.module.js';
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"
import { FontLoader } from "../examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "../examples/jsm/geometries/TextGeometry.js"

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
// ==================================================
// ==================   geometry   ==================

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


// _setupModel() {
//         const geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 3, 4);
//         const fillmaterial = new THREE.MeshLambertMaterial({color: 0x515151});
//         const cube = new THREE.Mesh(geometry, fillmaterial);

//         const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
//         const line = new THREE.LineSegments(
//             new THREE.WireframeGeometry(geometry), lineMaterial);
//         const group = new THREE.Group()
//         group.add(line);
//         group.add(cube);
//         this._scene.add(group);
//         this._cube = group;
//     }

// ==================================================
// ================     Shape    ====================

    // _setupModel(){
    //     const shape = new THREE.Shape();
    //     shape.moveTo(1, 1);
    //     shape.lineTo(1, -1);
    //     shape.lineTo(-1, -1);
    //     shape.lineTo(-1, 1);
    //     shape.closePath();

    //     const geometry = new THREE.BufferGeometry();
    //     const points = shape.getPoints();
    //     geometry.setFromPoints(points);

    //     const material = new THREE.LineBasicMaterial({color: 0xffff00});
    //     const line = new THREE.Line(geometry, material);

    //     this._scene.add(line);
    // }

// ==================================================
// ==================================================

    // _setupModel(){
    //     const shape = new THREE.Shape();
    //     const x = -2.5, y = -5;
    //     shape.moveTo(x + 2.5, y + 2.5);
    //     shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y,x,y);
    //     shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    //     shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x - 2.5, y + 9.5);
    //     shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5,x + 8,y + 3.5);
    //     shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    //     shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    //     const geometry = new THREE.BufferGeometry();
    //     const points = shape.getPoints();
    //     geometry.setFromPoints(points);

    //     const material = new THREE.LineBasicMaterial({color: 0xffff00});
    //     const line = new THREE.Line(geometry, material);

    //     this._scene.add(line);
    // }

// ==================================================
// ================     heart Shape         =========

// _setupModel() {
//         const shape = new THREE.Shape();
//         const x = -2.5, y = -5;
//         shape.moveTo(x + 2.5, y + 2.5);
//         shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y,x,y);
//         shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
//         shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
//         shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5,x + 8,y + 3.5);
//         shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
//         shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

//         const geometry = new THREE.ShapeGeometry(shape);

//         const fillmaterial = new THREE.MeshLambertMaterial({color: 0x515151});
//         const cube = new THREE.Mesh(geometry, fillmaterial);

//         const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
//         const line = new THREE.LineSegments(
//             new THREE.WireframeGeometry(geometry), lineMaterial);
//         const group = new THREE.Group()
//         group.add(line);
//         group.add(cube);
//         this._scene.add(group);
//         this._cube = group;
//     }

// ==================================================
// ==================================================

//  Curve getPoints 커브를 구성하는 좌표의 개수

//     _setupModel()   {
//         class CustomSinCurve extends THREE.Curve {
//             constructor(scale){
//                 super();
//                 this.scale = scale;
//             }
//         getPoint(t) {
//             const tx = t * 3 - 1.5;
//             const ty = Math.sin(2 * Math.PI * t);
//             const tz = 0;
//             return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
//         }
//     }
//     const path = new CustomSinCurve(4);
    
//     const geometry = new THREE.BufferGeometry();
//     const points = path.getPoints(30);
//     geometry.setFromPoints(points);

//     const material = new THREE.LineBasicMaterial({color: 0xfff00});
//     const line = new THREE.Line(geometry, material);

//     this._scene.add(line);
// }

// ==================================================
// ==================================================

// tube 인자4개 (튜브가 이어지는 형태를 결정하는 개체 path, 튜브의 진행방향 분할수
// 원통의 반지름 크기, 원통에 대한 분할수 , 곡선을 열지 닫을지) 

    //     _setupModel()   {
    //         class CustomSinCurve extends THREE.Curve {
    //             constructor(scale){
    //                 super();
    //                 this.scale = scale;
    //             }
    //         getPoint(t) {
    //             const tx = t * 3 - 1.5;
    //             const ty = Math.sin(2 * Math.PI * t);
    //             const tz = 0;
    //             return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    //         }
    //     }
    //     const path = new CustomSinCurve(4);
    //     const geometry = new THREE.TubeGeometry(path, 40, 0.8, 5, true);

    //     const fillmaterial = new THREE.MeshPhongMaterial({color: 0x515151});
    //     const cube = new THREE.Mesh(geometry, fillmaterial);

    //     const linematerial = new THREE.LineBasicMaterial({color: 0xffff00});
    //     const line = new THREE.LineSegments(
    //         new THREE.WireframeGeometry(geometry), linematerial);

    //     const group = new THREE.Group()
    //     group.add(cube);
    //     group.add(line);

    //     this._scene.add(group);
    //     this._cube = group;
    // }

// ==================================================
// ==================================================

// Lathe (points, 분할수 , 시작각도, 연장각도)

    // _setupModel() {
    //     const points = [];
    //     for (let i = 0; i < 10; ++i){
    //         points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i -5) * .8));
    //     }

    //     const geometry = new THREE.LatheGeometry(points, 65, 0, Math.PI);

    //     const fillmaterial = new THREE.MeshPhongMaterial({color: 0x515151});
    //     const cube = new THREE.Mesh(geometry, fillmaterial);

    //     const linematerial = new THREE.LineBasicMaterial({color: 0xffff00});
    //     const line = new THREE.LineSegments(
    //         new THREE.WireframeGeometry(geometry), linematerial);

    //     const group = new THREE.Group()
    //     group.add(cube);
    //     group.add(line);

    //     this._scene.add(group);
    //     this._cube = group;
    // }

// ==================================================
// ==================================================

// ExtrudeGeometry
// _setupModel() {
//     const shape = new THREE.Shape();
//     const x = -2.5, y = -5;
//     shape.moveTo(x + 2.5, y + 2.5);
//     shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y,x,y);
//     shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
//     shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
//     shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5,x + 8,y + 3.5);
//     shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
//     shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

//     const settings = {
//         steps: 1, // 깊이 방향으로의 분할수
//         depth: 4, // 깊이 값
//         bevelEnabled: true, //beveling 처리를 할것인지의 대한 여부
//         bevelThickness: 1.8, // bevel의 두께 [테두리 깎기라고 생각하면 쉬움]
//         bevelSize: 1.5, // shape 의 외각선으로 부터 얼마나 beveling 할것인지 [기본값6]
//         bevelSegments: 5, // beveling 단계수 [기본값3]
//     }

//     const geometry = new THREE.ExtrudeGeometry(shape, settings);

//     const fillmaterial = new THREE.MeshPhongMaterial({color: 0x515151});
//     const cube = new THREE.Mesh(geometry, fillmaterial);

//     const linematerial = new THREE.LineBasicMaterial({color: 0xffff00});
//     const line = new THREE.LineSegments(
//         new THREE.WireframeGeometry(geometry), linematerial);

//     const group = new THREE.Group()
//     group.add(cube);
//     group.add(line);

//     this._scene.add(group);
//     this._cube = group;
// }
// ==================================================
// ==================================================

_setupModel() {
    const fontLoader = new FontLoader();
    async function loadFont(that) {
        const url = "../examples/fonts/helvetiker_regular.typeface.json";
        const font = await new Promise((resolve, reject) => {
            fontLoader.load(url, resolve, undefined, reject);
        });

    const geometry = new TextGeometry("DONGWOO", {
        font: font, // Fontloader에서 얻어온 폰트 객체
        size: 5, // 크기
        height: 1.5, // 깊이값 [기본값 50]
        curveSegments: 4, // 하나의 커브를 구성하는 정점의 개수 [기본값 12]
        //  setting for ExtrudeGeometry
        bevelEnabled: true,
        bevelThickness: 0.7,
        bevelSize: .7, // 얼마나 멀리까지 bevel값을 줄것인지 [기본값2]
        bevelSegments: 2 
    });

    const fillmaterial = new THREE.MeshPhongMaterial({color: 0x515151});
    const cube = new THREE.Mesh(geometry, fillmaterial);

    const linematerial = new THREE.LineBasicMaterial({color: 0xffff00});
    const line = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry), linematerial);

    const group = new THREE.Group()
    group.add(cube);
    group.add(line);

    that._scene.add(group);
    that._cube = group;

};

loadFont(this);
    

}

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            100
        );

        camera.position.z = 15;
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