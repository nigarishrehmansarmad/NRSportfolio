import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORKSPACE_OFFSET_X = 2.9;
const GIRL_BASE_Y = 1.52;

// =====================================================
// SCENE SETUP
// =====================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9d6d3);
scene.fog = new THREE.Fog(0xd9d6d3, 20, 60);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5.0, 7.2, 12.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
const root = document.getElementById('root') ?? document.body;
root.appendChild(renderer.domElement);

// Camera look-at target (will be tweened by GSAP)
const cameraTarget = new THREE.Vector3(2.5, 2.5, -3.0);

// =====================================================
// LIGHTING
// =====================================================
const ambientLight = new THREE.AmbientLight(0xdec5c9, 0.9);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xf8e8f2, 1.3);
dirLight.position.set(8, 14, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;
dirLight.shadow.camera.left = -12;
dirLight.shadow.camera.right = 12;
dirLight.shadow.camera.top = 12;
dirLight.shadow.camera.bottom = -12;
dirLight.shadow.bias = -0.001;
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xbc9fc4, 0.35);
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

const rimLight = new THREE.PointLight(0xdc52de, 0.45, 20);
rimLight.position.set(-3, 6, -3);
scene.add(rimLight);

// =====================================================
// MATERIALS
// =====================================================
const deskMat = new THREE.MeshStandardMaterial({ color: 0xdec5c9, roughness: 0.32, metalness: 0.05 });
const deskLegMat = new THREE.MeshStandardMaterial({ color: 0xd7ccd8, roughness: 0.45, metalness: 0.1 });
const monitorMat = new THREE.MeshStandardMaterial({ color: 0xd7ccd8, roughness: 0.25, metalness: 0.15 });
const screenMat = new THREE.MeshStandardMaterial({ color: 0xbc9fc4, roughness: 0.1, metalness: 0.0, emissive: 0xdc52de, emissiveIntensity: 0.2 });
const keyboardMat = new THREE.MeshStandardMaterial({ color: 0xd9d6d3, roughness: 0.5, metalness: 0.05 });
const chairMat = new THREE.MeshStandardMaterial({ color: 0xd893df, roughness: 0.62, metalness: 0.0 });
const chairFrameMat = new THREE.MeshStandardMaterial({ color: 0xbc9fc4, roughness: 0.45, metalness: 0.2 });
const floorMat = new THREE.MeshStandardMaterial({ color: 0xd9d6d3, roughness: 0.92, metalness: 0.0 });
const skinMat = new THREE.MeshStandardMaterial({ color: 0xf5c9a8, roughness: 0.7, metalness: 0.0 });
const hairMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.8, metalness: 0.0 });
const shirtMat = new THREE.MeshStandardMaterial({ color: 0xd090c8, roughness: 0.7, metalness: 0.0 });
const sneakerMat = new THREE.MeshStandardMaterial({ color: 0xf7f5f8, roughness: 0.45, metalness: 0.0 });

const skirtPatternCanvas = document.createElement('canvas');
skirtPatternCanvas.width = 64;
skirtPatternCanvas.height = 64;
const skirtCtx = skirtPatternCanvas.getContext('2d');
if (skirtCtx) {
  const h = 32, q = 16;
  skirtCtx.fillStyle = '#12081e';
  skirtCtx.fillRect(0, 0, 64, 64);
  skirtCtx.fillStyle = '#5c2278';
  skirtCtx.beginPath();
  skirtCtx.moveTo(0, 0); skirtCtx.lineTo(h, 0);
  skirtCtx.lineTo(h, q); skirtCtx.lineTo(q, h);
  skirtCtx.lineTo(0, h); skirtCtx.closePath(); skirtCtx.fill();
  skirtCtx.beginPath();
  skirtCtx.moveTo(h, h); skirtCtx.lineTo(64, h);
  skirtCtx.lineTo(64, 64); skirtCtx.lineTo(h, 64);
  skirtCtx.lineTo(h, h + q); skirtCtx.lineTo(h + q, h);
  skirtCtx.closePath(); skirtCtx.fill();
  skirtCtx.beginPath();
  skirtCtx.moveTo(h + q, 0); skirtCtx.lineTo(64, 0);
  skirtCtx.lineTo(64, q); skirtCtx.closePath(); skirtCtx.fill();
  skirtCtx.beginPath();
  skirtCtx.moveTo(0, h + q); skirtCtx.lineTo(0, 64);
  skirtCtx.lineTo(q, 64); skirtCtx.closePath(); skirtCtx.fill();
}
const skirtPatternTex = new THREE.CanvasTexture(skirtPatternCanvas);
skirtPatternTex.wrapS = THREE.RepeatWrapping;
skirtPatternTex.wrapT = THREE.RepeatWrapping;
skirtPatternTex.repeat.set(3, 3);
const skirtPatternMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: skirtPatternTex, roughness: 0.75, metalness: 0.0 });

const plantPotMat = new THREE.MeshStandardMaterial({ color: 0xf0c8b8, roughness: 0.7, metalness: 0.0 });
const plantMat = new THREE.MeshStandardMaterial({ color: 0x8dc898, roughness: 0.8, metalness: 0.0 });
const mugMat = new THREE.MeshStandardMaterial({ color: 0xf0607a, roughness: 0.4, metalness: 0.05 });
const bookMat1 = new THREE.MeshStandardMaterial({ color: 0xea7098, roughness: 0.8, metalness: 0.0 });
const bookMat2 = new THREE.MeshStandardMaterial({ color: 0xe19cb3, roughness: 0.8, metalness: 0.0 });
const bookMat3 = new THREE.MeshStandardMaterial({ color: 0xd893df, roughness: 0.8, metalness: 0.0 });
const speakerMat = new THREE.MeshStandardMaterial({ color: 0xd7ccd8, roughness: 0.4, metalness: 0.1 });
const lightStringMat = new THREE.MeshStandardMaterial({ color: 0xe19cb3, emissive: 0xdc52de, emissiveIntensity: 0.65, roughness: 0.5 });
const wallMat = new THREE.MeshStandardMaterial({ color: 0xdec5c9, roughness: 0.95, metalness: 0.0 });
const shelfMat = new THREE.MeshStandardMaterial({ color: 0xd7ccd8, roughness: 0.4, metalness: 0.05 });
const figureMat = new THREE.MeshStandardMaterial({ color: 0xe19cb3, roughness: 0.5, metalness: 0.1 });
const mouseMat = new THREE.MeshStandardMaterial({ color: 0xd7ccd8, roughness: 0.4, metalness: 0.1 });
const mousepadMat = new THREE.MeshStandardMaterial({ color: 0xbc9fc4, roughness: 0.8, metalness: 0.0 });

// =====================================================
// ROOM (floor, walls)
// =====================================================
const floor = new THREE.Mesh(new THREE.BoxGeometry(18, 0.2, 18), floorMat);
floor.position.y = -0.1; floor.receiveShadow = true; scene.add(floor);

const wall = new THREE.Mesh(new THREE.BoxGeometry(14, 10, 0.2), wallMat);
wall.position.set(0, 5, -5.5); wall.receiveShadow = true; scene.add(wall);

const wallSide = new THREE.Mesh(new THREE.BoxGeometry(0.2, 10, 12), wallMat);
wallSide.position.set(-7, 5, 0.5); wallSide.receiveShadow = true; scene.add(wallSide);

const baseboard = new THREE.Mesh(new THREE.BoxGeometry(14, 0.15, 0.12), new THREE.MeshStandardMaterial({ color: 0xf8f0f5, roughness: 0.4 }));
baseboard.position.set(0, 0.075, -5.44); scene.add(baseboard);

// =====================================================
// DESK
// =====================================================
const deskGroup = new THREE.Group();
const deskTop = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.12, 2.2), deskMat);
deskTop.position.y = 1.82; deskTop.castShadow = true; deskTop.receiveShadow = true;
deskGroup.add(deskTop);

const edgeMat = new THREE.MeshStandardMaterial({ color: 0xf0c8d8, roughness: 0.4, metalness: 0.05 });
const edgeFront = new THREE.Mesh(new THREE.BoxGeometry(5.22, 0.06, 0.04), edgeMat);
edgeFront.position.set(0, 1.79, 1.1); deskGroup.add(edgeFront);

const deskSideGeo = new THREE.BoxGeometry(0.1, 1.7, 2.1);
const deskSideL = new THREE.Mesh(deskSideGeo, deskMat); deskSideL.position.set(-2.55, 0.95, 0); deskSideL.castShadow = true; deskGroup.add(deskSideL);
const deskSideR = new THREE.Mesh(deskSideGeo, deskMat); deskSideR.position.set(2.55, 0.95, 0); deskSideR.castShadow = true; deskGroup.add(deskSideR);

const deskBack = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.7, 0.08), deskMat);
deskBack.position.set(0, 0.95, -1.05); deskBack.castShadow = true; deskGroup.add(deskBack);

[[-2.3, -1.05], [2.3, -1.05], [-2.3, 0.95], [2.3, 0.95]].forEach((pos) => {
  const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.1, 8), deskLegMat);
  leg.position.set(pos[0], 0.05, pos[1]); deskGroup.add(leg);
  const legVert = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.06), deskLegMat);
  legVert.position.set(pos[0], 0.1, pos[1]); deskGroup.add(legVert);
});
deskGroup.position.set(0, 0, -3.5);
scene.add(deskGroup);

// =====================================================
// MONITOR
// =====================================================
const monitorGroup = new THREE.Group();
const monFrame = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 0.1), monitorMat);
monFrame.castShadow = true; monitorGroup.add(monFrame);

const screen = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.42, 0.05), screenMat);
screen.name = 'screen'; screen.position.z = 0.03; monitorGroup.add(screen);

const screenLineGeo = new THREE.BoxGeometry(2.2, 0.06, 0.01);
for (let i = 0; i < 8; i++) {
  const lineMesh = new THREE.Mesh(screenLineGeo, new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.6 + i * 0.02, 0.4, 0.75 - i * 0.02),
    emissive: new THREE.Color().setHSL(0.6 + i * 0.02, 0.5, 0.3),
    emissiveIntensity: 0.3
  }));
  lineMesh.position.set(0, 0.55 - i * 0.14, 0.06);
  monitorGroup.add(lineMesh);
}

const neck = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), monitorMat);
neck.position.y = -0.95; monitorGroup.add(neck);
const monBase = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 0.4), monitorMat);
monBase.position.y = -1.22; monitorGroup.add(monBase);
monitorGroup.position.set(-0.5, 3.125, -4.35);
scene.add(monitorGroup);

// =====================================================
// KEYBOARD
// =====================================================
const kbGroup = new THREE.Group();
const kb = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.5), keyboardMat);
kb.castShadow = true; kbGroup.add(kb);
for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 12; col++) {
    const key = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.025, 0.08), new THREE.MeshStandardMaterial({ color: 0xf0eaf4, roughness: 0.6 }));
    key.position.set(-0.62 + col * 0.11, 0.038, -0.15 + row * 0.1);
    kbGroup.add(key);
  }
}
kbGroup.position.set(-0.2, 1.895, -2.9); scene.add(kbGroup);

// =====================================================
// MOUSE & MOUSEPAD
// =====================================================
const mousepad = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.65), mousepadMat);
mousepad.position.set(1.5, 1.892, -3.0); mousepad.castShadow = true; scene.add(mousepad);
const mouse = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.28), mouseMat);
mouse.position.set(1.5, 1.95, -3.0); mouse.castShadow = true; scene.add(mouse);

// =====================================================
// SPEAKERS
// =====================================================
function makeSpeaker(x, side) {
  const spkGroup = new THREE.Group();
  spkGroup.name = `speakerGroup_${side}`;
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.42, 0.22), speakerMat);
  body.castShadow = true; spkGroup.add(body);
  const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 16), new THREE.MeshStandardMaterial({ color: 0xd8d0e0, roughness: 0.7 }));
  cone.rotation.x = Math.PI / 2; cone.position.z = 0.11; spkGroup.add(cone);
  spkGroup.position.set(x, 2.09, -4.45);
  return spkGroup;
}
scene.add(makeSpeaker(-1.85, 'L'));
scene.add(makeSpeaker(0.85, 'R'));

// =====================================================
// MUG + STEAM
// =====================================================
const mugGroup = new THREE.Group();
const mugBody = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.3, 16), mugMat);
mugBody.castShadow = true; mugGroup.add(mugBody);
const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 8, 12, Math.PI), mugMat);
mugHandle.rotation.z = -Math.PI / 2; mugHandle.position.set(0.12, 0, 0); mugGroup.add(mugHandle);
mugGroup.position.set(1.9, 2.04, -4.3); scene.add(mugGroup);

for (let i = 0; i < 3; i++) {
  const steamMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.04 + i * 0.01, 6, 6),
    new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, roughness: 1.0 })
  );
  steamMesh.name = `steam${i}`;
  steamMesh.position.set(1.9 + (i - 1) * 0.05, 2.28 + i * 0.1, -4.3);
  scene.add(steamMesh);
}

// =====================================================
// PLANT
// =====================================================
const plantGroup = new THREE.Group();
const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.2, 10), plantPotMat);
pot.castShadow = true; plantGroup.add(pot);
const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.02, 10), new THREE.MeshStandardMaterial({ color: 0x8b6650, roughness: 1.0 }));
soil.position.y = 0.1; plantGroup.add(soil);
for (let i = 0; i < 6; i++) {
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), plantMat);
  const angle = (i / 6) * Math.PI * 2;
  leaf.position.set(Math.cos(angle) * 0.08, 0.2 + Math.abs(Math.sin(i)) * 0.1, Math.sin(angle) * 0.08);
  leaf.scale.set(1, 0.7, 1);
  plantGroup.add(leaf);
}
plantGroup.position.set(-2.15, 1.98, -4.45); scene.add(plantGroup);

// =====================================================
// BOOKS
// =====================================================
function makeBook(x, z, mat, title) {
  const book = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.18), mat);
  book.name = title;
  book.position.set(x, 1.97, z); book.castShadow = true;
  book.rotation.y = (Math.random() - 0.5) * 0.1;
  return book;
}
scene.add(makeBook(-1.7, -4.7, bookMat1, 'book1'));
scene.add(makeBook(-1.55, -4.7, bookMat2, 'book2'));
scene.add(makeBook(-1.4, -4.7, bookMat3, 'book3'));

// =====================================================
// SHELF
// =====================================================
const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.08, 0.3), shelfMat);
shelf.position.set(0, 4.2, -5.35); shelf.castShadow = true; shelf.receiveShadow = true;
scene.add(shelf);

[-1.5, 1.5].forEach((x) => {
  const brkt = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.25, 0.28), shelfMat);
  brkt.position.set(x, 4.07, -5.37); scene.add(brkt);
});

for (let i = 0; i < 5; i++) {
  const figGroup = new THREE.Group();
  const figBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.06, 0.18, 10),
    new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(i * 0.12, 0.4, 0.8), roughness: 0.5 })
  );
  figGroup.add(figBody);
  const figHead = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), figureMat);
  figHead.position.y = 0.15; figGroup.add(figHead);
  figGroup.position.set(-1.3 + i * 0.65, 4.34, -5.3);
  scene.add(figGroup);
}

// =====================================================
// FAIRY LIGHTS
// =====================================================
for (let i = 0; i < 15; i++) {
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), lightStringMat.clone());
  bulb.name = `fairyLight${i}`;
  bulb.position.set(-1.6 + i * 0.22, 4.16 + Math.sin(i * 0.8) * 0.05, -5.32);
  scene.add(bulb);
}

// =====================================================
// CHAIR
// =====================================================
const chairGroup = new THREE.Group();
const seat = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.12, 1.0), chairMat);
seat.position.y = 1.0; seat.castShadow = true; chairGroup.add(seat);

const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.08, 0.95), new THREE.MeshStandardMaterial({ color: 0xe8d8f5, roughness: 0.8 }));
cushion.position.y = 1.1; chairGroup.add(cushion);

const back = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.9, 0.1), chairMat);
back.position.set(0, 1.55, -0.45); back.castShadow = true; chairGroup.add(back);

const backCush = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.82, 0.06), new THREE.MeshStandardMaterial({ color: 0xe8d8f5, roughness: 0.8 }));
backCush.position.set(0, 1.55, -0.4); chairGroup.add(backCush);

[[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]].forEach((pos) => {
  const cLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.96, 8), chairFrameMat);
  cLeg.position.set(pos[0], 0.52, pos[1]); chairGroup.add(cLeg);
  const foot = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), chairFrameMat);
  foot.position.set(pos[0], 0.04, pos[1]); chairGroup.add(foot);
});

[-0.58, 0.58].forEach((x) => {
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.55), chairFrameMat);
  arm.position.set(x, 1.35, -0.05); chairGroup.add(arm);
  const armSupport = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.32, 8), chairFrameMat);
  armSupport.position.set(x, 1.2, -0.05); chairGroup.add(armSupport);
});

chairGroup.position.set(0, 0, -1.8);
chairGroup.scale.set(1.18, 1.18, 1.18);
chairGroup.rotation.y = Math.PI;
scene.add(chairGroup);

// =====================================================
// GIRL
// =====================================================
const girlGroup = new THREE.Group();
girlGroup.name = 'girlGroup';

const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.3), shirtMat);
torso.castShadow = true; torso.position.set(0.02, 0.1, 0.03); torso.rotation.x = -0.08;
girlGroup.add(torso);

const neckGirl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 10), skinMat);
neckGirl.position.set(0.08, 0.41, 0.12); girlGroup.add(neckGirl);

const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), skinMat);
head.position.set(0.12, 0.67, 0.13); head.scale.set(0.95, 1.02, 1); head.castShadow = true;
girlGroup.add(head);

const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.205, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7), hairMat);
hairTop.position.set(0.1, 0.7, 0.11); hairTop.scale.set(1, 1.08, 1); girlGroup.add(hairTop);

const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.36, 0.2), hairMat);
hairBack.position.set(-0.02, 0.43, 0.01); hairBack.castShadow = true; girlGroup.add(hairBack);

for (let i = 0; i < 9; i++) {
  const braid = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), hairMat);
  braid.position.set(-0.06 + i * 0.04, 0.83 - i * 0.006, 0.14 - i * 0.022);
  girlGroup.add(braid);
}

for (let i = 0; i < 11; i++) {
  const curl = new THREE.Mesh(new THREE.SphereGeometry(0.10 - i * 0.004, 12, 12), hairMat);
  curl.position.set(-0.14 - Math.sin(i * 0.5) * 0.04, 0.42 - i * 0.075, -0.04 + Math.sin(i * 1.1) * 0.05);
  girlGroup.add(curl);
}

const armTilt = Math.PI / 2 + 0.08;
const rightSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.07, 0.18, 10), shirtMat);
rightSleeve.position.set(0.27, 0.42, 0.16); rightSleeve.rotation.x = armTilt; rightSleeve.castShadow = true;
girlGroup.add(rightSleeve);
const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.70, 10), skinMat);
rightArm.position.set(0.27, 0.395, 0.60); rightArm.rotation.x = armTilt; rightArm.castShadow = true;
girlGroup.add(rightArm);
const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.06, 0.13), skinMat);
rightHand.position.set(0.27, 0.36, 1.00); rightHand.castShadow = true; girlGroup.add(rightHand);

const leftSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.07, 0.18, 10), shirtMat);
leftSleeve.position.set(-0.24, 0.42, 0.16); leftSleeve.rotation.x = armTilt; leftSleeve.castShadow = true;
girlGroup.add(leftSleeve);
const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.70, 10), skinMat);
leftArm.position.set(-0.24, 0.395, 0.60); leftArm.rotation.x = armTilt; leftArm.castShadow = true;
girlGroup.add(leftArm);
const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.06, 0.13), skinMat);
leftHand.position.set(-0.24, 0.36, 1.00); leftHand.castShadow = true; girlGroup.add(leftHand);

const pants = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.22, 0.54), skirtPatternMat);
pants.position.set(0.02, -0.25, 0.20); pants.castShadow = true; girlGroup.add(pants);

const rightThigh = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.15, 0.42), skirtPatternMat);
rightThigh.position.set(0.13, -0.36, 0.42); rightThigh.castShadow = true; girlGroup.add(rightThigh);
const leftThigh = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.15, 0.42), skirtPatternMat);
leftThigh.position.set(-0.11, -0.36, 0.38); leftThigh.castShadow = true; girlGroup.add(leftThigh);

const rightUpperShin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.30, 0.14), skirtPatternMat);
rightUpperShin.position.set(0.18, -0.45, 0.44); rightUpperShin.castShadow = true; girlGroup.add(rightUpperShin);
const rightLowerShin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.55, 0.12), skinMat);
rightLowerShin.position.set(0.18, -0.875, 0.44); rightLowerShin.castShadow = true; girlGroup.add(rightLowerShin);
const leftUpperShin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.30, 0.14), skirtPatternMat);
leftUpperShin.position.set(-0.10, -0.45, 0.40); leftUpperShin.castShadow = true; girlGroup.add(leftUpperShin);
const leftLowerShin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.55, 0.12), skinMat);
leftLowerShin.position.set(-0.10, -0.875, 0.40); leftLowerShin.castShadow = true; girlGroup.add(leftLowerShin);

const shoeMain = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.13, 0.36), sneakerMat);
shoeMain.position.set(0.20, -1.22, 0.38); shoeMain.castShadow = true; girlGroup.add(shoeMain);
const shoeMainSole = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.38), new THREE.MeshStandardMaterial({ color: 0xe5e1e8, roughness: 0.5 }));
shoeMainSole.position.set(0.20, -1.305, 0.38); girlGroup.add(shoeMainSole);

girlGroup.position.set(0, GIRL_BASE_Y, -1.8);
girlGroup.scale.set(1.12, 1.16, 1.12);
girlGroup.rotation.y = Math.PI;
scene.add(girlGroup);

// =====================================================
// POSTERS
// =====================================================
const posterColors = [0xffd0e8, 0xd0e8ff, 0xd8ffd0];
const posterPositions = [[-3, 3.2, -5.42], [0.5, 3.5, -5.42], [2.8, 3.2, -5.42]];
posterPositions.forEach((pos, i) => {
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.0, 0.02), new THREE.MeshStandardMaterial({ color: posterColors[i], roughness: 0.8 }));
  post.position.set(...pos); scene.add(post);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.06, 0.025), new THREE.MeshStandardMaterial({ color: 0xf0e8f4, roughness: 0.4, metalness: 0.1 }));
  frame.position.set(pos[0], pos[1], pos[2] - 0.015); scene.add(frame);
});

// =====================================================
// LAMP
// =====================================================
const lampGroup = new THREE.Group();
const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.06, 12), new THREE.MeshStandardMaterial({ color: 0xfafaf8, roughness: 0.4, metalness: 0.1 }));
lampGroup.add(lampBase);
const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8), new THREE.MeshStandardMaterial({ color: 0xfafaf8, roughness: 0.3, metalness: 0.15 }));
lampPole.position.y = 0.33; lampGroup.add(lampPole);
const lampHead = new THREE.Mesh(
  new THREE.SphereGeometry(0.22, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
  new THREE.MeshStandardMaterial({ color: 0xfefcf5, roughness: 0.3, metalness: 0.0, side: THREE.DoubleSide })
);
lampHead.position.set(0, 0.63, 0); lampGroup.add(lampHead);

const lampLight = new THREE.PointLight(0xfff0d8, 1.0, 4);
lampLight.name = 'lampLight';
lampLight.position.set(0, 0.5, 0); lampGroup.add(lampLight);

lampGroup.position.set(2.2, 1.88, -4.6); scene.add(lampGroup);

// =====================================================
// RUG
// =====================================================
const rug = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.02, 2.0), new THREE.MeshStandardMaterial({ color: 0xf0d8e8, roughness: 1.0 }));
rug.position.set(0.3, 0.01, -2.0); scene.add(rug);
const rugBorder = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.018, 2.1), new THREE.MeshStandardMaterial({ color: 0xd8b8d0, roughness: 1.0 }));
rugBorder.position.set(0.3, 0.009, -2.0); scene.add(rugBorder);

// =====================================================
// CABLE
// =====================================================
const cable = new THREE.Mesh(
  new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3.0, -4.9),
      new THREE.Vector3(0.2, 2.5, -4.85),
      new THREE.Vector3(-0.1, 2.0, -4.8),
      new THREE.Vector3(0, 1.88, -4.75),
    ]), 20, 0.008, 6, false
  ),
  new THREE.MeshStandardMaterial({ color: 0xc8c0d4, roughness: 0.8 })
);
scene.add(cable);

// =====================================================
// WORKSPACE OFFSET
// =====================================================
function offsetObjectX(o) { if (o) o.position.x += WORKSPACE_OFFSET_X; }

[deskGroup, monitorGroup, kbGroup, mousepad, mouse, mugGroup, plantGroup,
 chairGroup, girlGroup, lampGroup, rug, rugBorder, cable].forEach(offsetObjectX);

['speakerGroup_L', 'speakerGroup_R', 'book1', 'book2', 'book3',
 'steam0', 'steam1', 'steam2'].forEach((name) => offsetObjectX(scene.getObjectByName(name)));

// =====================================================
// DUST PARTICLES
// =====================================================
const particleCount = 60;
const particleGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] = Math.random() * 5 + 0.5;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0xffd8e8, size: 0.015, transparent: true, opacity: 0.5 }));
scene.add(particles);

// =====================================================
// SCROLL-DRIVEN CAMERA — keyframes per section
// Workspace center after offset: x ≈ 2.9
// =====================================================
const sectionViews = [
  // 0 — HERO: wide establishing shot
  { pos: { x: 5.0,  y: 7.2, z: 12.5 }, target: { x: 2.5, y: 2.5, z: -3.0 } },
  // 1 — ABOUT: closer side angle on the girl
  { pos: { x: 8.5,  y: 4.3, z: 4.8  }, target: { x: 3.0, y: 1.9, z: -2.0 } },
  // 2 — EXPERTISE: dynamic angle focusing on workspace
  { pos: { x: 7.2,  y: 5.0, z: 3.2  }, target: { x: 2.8, y: 2.5, z: -2.5 } },
  // 3 — PROJECTS: close on the monitor screen
  { pos: { x: 4.4,  y: 3.6, z: 0.6  }, target: { x: 2.4, y: 3.1, z: -4.35 } },
  // 4 — JOURNEY: pan up to shelf with figures + fairy lights
  { pos: { x: 3.4,  y: 6.0, z: 4.5  }, target: { x: 2.9, y: 4.1, z: -5.3 } },
  // 5 — CONTACT: low intimate angle near mug + lamp
  { pos: { x: 6.6,  y: 2.9, z: 6.0  }, target: { x: 4.5, y: 2.3, z: -3.5 } },
];

// Apply initial view immediately
camera.position.set(sectionViews[0].pos.x, sectionViews[0].pos.y, sectionViews[0].pos.z);
cameraTarget.set(sectionViews[0].target.x, sectionViews[0].target.y, sectionViews[0].target.z);
camera.lookAt(cameraTarget);

// Scene mood (driven by scroll)
const sceneMood = {
  screenEmissive: 0.2,
  lampIntensity: 1.0,
  rimIntensity: 0.45,
  exposure: 1.2,
};

const totalSections = sectionViews.length;

// Build a scroll-driven master timeline that interpolates camera + target
// through each section's view.
const masterTL = gsap.timeline({
  scrollTrigger: {
    trigger: 'main',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.6,
    snap: {
      snapTo: (value) => Math.round(value * (totalSections - 1)) / (totalSections - 1),
      duration: { min: 0.25, max: 0.7 },
      delay: 0.04,
      ease: 'power2.inOut',
    },
  },
});

// Each step lasts 1 unit on the timeline; total = (totalSections - 1)
for (let i = 1; i < totalSections; i++) {
  const view = sectionViews[i];
  masterTL.to(camera.position, {
    x: view.pos.x, y: view.pos.y, z: view.pos.z,
    ease: 'power2.inOut', duration: 1,
  }, i - 1);
  masterTL.to(cameraTarget, {
    x: view.target.x, y: view.target.y, z: view.target.z,
    ease: 'power2.inOut', duration: 1,
  }, i - 1);
}

// Section-by-section mood lighting (boost what's most relevant per scene)
ScrollTrigger.create({
  trigger: '#expertise', start: 'top center', end: 'bottom center',
  onEnter: () => gsap.to(sceneMood, { screenEmissive: 0.4, duration: 0.6 }),
  onEnterBack: () => gsap.to(sceneMood, { screenEmissive: 0.4, duration: 0.6 }),
  onLeave: () => gsap.to(sceneMood, { screenEmissive: 0.2, duration: 0.6 }),
  onLeaveBack: () => gsap.to(sceneMood, { screenEmissive: 0.2, duration: 0.6 }),
});

ScrollTrigger.create({
  trigger: '#projects', start: 'top center', end: 'bottom center',
  onEnter: () => gsap.to(sceneMood, { screenEmissive: 0.6, duration: 0.6 }),
  onEnterBack: () => gsap.to(sceneMood, { screenEmissive: 0.6, duration: 0.6 }),
  onLeave: () => gsap.to(sceneMood, { screenEmissive: 0.2, duration: 0.6 }),
  onLeaveBack: () => gsap.to(sceneMood, { screenEmissive: 0.2, duration: 0.6 }),
});

ScrollTrigger.create({
  trigger: '#journey', start: 'top center', end: 'bottom center',
  onEnter: () => gsap.to(sceneMood, { rimIntensity: 0.95, duration: 0.6 }),
  onEnterBack: () => gsap.to(sceneMood, { rimIntensity: 0.95, duration: 0.6 }),
  onLeave: () => gsap.to(sceneMood, { rimIntensity: 0.45, duration: 0.6 }),
  onLeaveBack: () => gsap.to(sceneMood, { rimIntensity: 0.45, duration: 0.6 }),
});

ScrollTrigger.create({
  trigger: '#contact', start: 'top center', end: 'bottom center',
  onEnter: () => gsap.to(sceneMood, { lampIntensity: 1.9, exposure: 1.35, duration: 0.6 }),
  onEnterBack: () => gsap.to(sceneMood, { lampIntensity: 1.9, exposure: 1.35, duration: 0.6 }),
  onLeave: () => gsap.to(sceneMood, { lampIntensity: 1.0, exposure: 1.2, duration: 0.6 }),
  onLeaveBack: () => gsap.to(sceneMood, { lampIntensity: 1.0, exposure: 1.2, duration: 0.6 }),
});

// =====================================================
// SECTION CONTENT REVEAL ANIMATIONS
// =====================================================
document.querySelectorAll('.scene-content').forEach((el) => {
  gsap.fromTo(el,
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: el.closest('.scene'),
        start: 'top 70%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    }
  );
});

// =====================================================
// NAV / DOTS WIRING
// =====================================================
function scrollToSection(idx) {
  const target = document.querySelector(`[data-section="${idx}"]`);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-target]').forEach((el) => {
  el.addEventListener('click', () => {
    const targetEl = document.getElementById(el.dataset.target);
    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('#dots .dot').forEach((el) => {
  el.addEventListener('click', () => scrollToSection(parseInt(el.dataset.index, 10)));
});

const dots = document.querySelectorAll('#dots .dot');
const navLinks = document.querySelectorAll('#nav .nav-links a');
const scrollHint = document.getElementById('scroll-hint');

function setActive(idx) {
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
}

// Watch each section to update indicator state
document.querySelectorAll('.scene').forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top center',
    end: 'bottom center',
    onToggle: (self) => {
      if (self.isActive) setActive(parseInt(sec.dataset.section, 10));
    },
  });
});

// Hide scroll hint after first scroll
let hintHidden = false;
window.addEventListener('scroll', () => {
  if (!hintHidden && window.scrollY > 60) {
    scrollHint.classList.add('hidden');
    hintHidden = true;
  }
}, { passive: true });

// =====================================================
// RESIZE
// =====================================================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  ScrollTrigger.refresh();
});

// =====================================================
// RENDER LOOP
// =====================================================
let time = 0;
const screenObj = scene.getObjectByName('screen');

function animate() {
  time += 0.01;

  // Camera always looks at the (animated) target
  camera.lookAt(cameraTarget);

  // Gentle breathing animation
  girlGroup.position.y = GIRL_BASE_Y + Math.sin(time * 0.8) * 0.008;

  // Steam animation
  for (let i = 0; i < 3; i++) {
    const steamObj = scene.getObjectByName(`steam${i}`);
    if (steamObj) {
      steamObj.position.y = 2.28 + i * 0.1 + Math.sin(time * 1.5 + i) * 0.05;
      steamObj.material.opacity = 0.2 + Math.sin(time + i) * 0.1;
    }
  }

  // Fairy lights twinkle
  for (let i = 0; i < 15; i++) {
    const light = scene.getObjectByName(`fairyLight${i}`);
    if (light) {
      light.material.emissiveIntensity = 0.5 + Math.sin(time * 2 + i * 0.7) * 0.4;
    }
  }

  // Floating particles
  const pos = particles.geometry.attributes.position;
  for (let i = 0; i < particleCount; i++) {
    pos.array[i * 3 + 1] += 0.002;
    if (pos.array[i * 3 + 1] > 6) pos.array[i * 3 + 1] = 0.5;
  }
  pos.needsUpdate = true;

  // Apply scroll-driven mood
  if (screenObj) {
    screenObj.material.emissiveIntensity = sceneMood.screenEmissive + Math.sin(time * 0.3) * 0.05;
  }
  lampLight.intensity = sceneMood.lampIntensity;
  rimLight.intensity = sceneMood.rimIntensity;
  renderer.toneMappingExposure = sceneMood.exposure;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// =====================================================
// HIDE LOADER (next frame so first render lands first)
// =====================================================
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('gone');
      setTimeout(() => loader.remove(), 700);
    }
    ScrollTrigger.refresh();
  });
});
