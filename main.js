import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector(".webgl");

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();

const brickColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const brickNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const brickAmbientOcclustion = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const brickRoughness = textureLoader.load("/textures/bricks/roughness.jpg");

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclustionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclustionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclustionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclustionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const scene = new THREE.Scene();

const fog = new THREE.Fog("#262837", 1, 50);

scene.fog = fog;

const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
scene.add(moonLight);

const doorLight = new THREE.PointLight("#ff7d46", 3, 7);
doorLight.position.set(0, 2.2, 2.7);
scene.add(doorLight);

const ghost1 = new THREE.PointLight("#ff00ff", 4, 3);
ghost1.position.x = 5;
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff", 4, 3);
ghost2.position.x = -5;
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 4, 3);
ghost3.position.z = 5;
scene.add(ghost3);

const house = new THREE.Group();
scene.add(house);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    color: "#a9c388",
    map: grassColorTexture,
    aoMap: grassAmbientOcclustionTexture,
    roughnessMap: grassRoughnessTexture,
    normalMap: grassNormalTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    color: "#ac8e82",
    map: brickColorTexture,
    normalMap: brickNormalTexture,
    aoMap: brickAmbientOcclustion,
    roughnessMap: brickRoughness,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 2.5 / 2;

house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * 0.25;

house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    metalnessMap: doorMetalnessTexture,
    alphaMap: doorAlphaTexture,
    normalMap: doorNormalTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.z = 2 + 0.01;
door.position.y = 1;

house.add(door);

const bushGeomatery = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeomatery, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeomatery, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeomatery, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeomatery, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

const graves = new THREE.Group();
scene.add(graves);

const graveGeomatery = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

function getArbitaray(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < 50; i++) {
  const grave = new THREE.Mesh(graveGeomatery, graveMaterial);

  const angle = getArbitaray(0, Math.PI * 2);
  const radius = getArbitaray(3, 10);
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  grave.position.set(x, 0.3, z);

  grave.rotation.y = getArbitaray(0, 0.5);
  grave.rotation.z = getArbitaray(-0.2, 0.2);

  graves.add(grave);
}

const camera = new THREE.PerspectiveCamera(
  45,
  size.width / size.height,
  0.1,
  100
);
camera.position.x = 20;
camera.position.y = 13;
camera.position.z = 20;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");
renderer.render(scene, camera);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  ghost1.position.x = Math.cos(elapsedTime * 0.3) * 5;
  ghost1.position.z = Math.sin(elapsedTime * 0.3) * 5;
  ghost1.position.y = Math.abs(Math.sin(elapsedTime * 0.3 * 3));

  ghost2.position.x = -Math.cos(elapsedTime * 0.5) * 6;
  ghost2.position.z = -Math.sin(elapsedTime * 0.5) * 6;
  ghost2.position.y = Math.abs(Math.sin(elapsedTime * 0.5 * 3));

  ghost3.position.x = Math.cos(elapsedTime - 1) * 7;
  ghost3.position.z = Math.sin(elapsedTime - 1) * 7;
  ghost3.position.y = Math.abs(Math.sin((elapsedTime - 1) * 3));

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});
