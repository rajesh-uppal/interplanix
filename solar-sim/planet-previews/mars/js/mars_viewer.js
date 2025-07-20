// 🚀 Interplanix Mars Viewer
console.log("🚀 Mars Viewer Initialized");

// Create scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("marsContainer").appendChild(renderer.domElement);

// Add orbit controls for zoom/rotate
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add ambient lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// 🔴 Mars Sphere
const marsGeometry = new THREE.SphereGeometry(3, 64, 64);
const marsTexture = new THREE.TextureLoader().load("mars_texture.jpg");
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

// 🌕 Phobos (inner moon)
const phobos = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xbbbbbb })
);
phobos.position.x = 6;
scene.add(phobos);

// 🌑 Deimos (outer moon)
const deimos = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x888888 })
);
deimos.position.x = 10;
scene.add(deimos);

// Set camera starting position
camera.position.z = 15;

// Moon orbit angles
let phobosAngle = 0;
let deimosAngle = 0;

// ♻️ Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate Mars slowly
  mars.rotation.y += 0.001;

  // Update moon positions in circular orbits
  phobosAngle += 0.02;
  phobos.position.set(Math.cos(phobosAngle) * 6, 0, Math.sin(phobosAngle) * 6);

  deimosAngle += 0.01;
  deimos.position.set(Math.cos(deimosAngle) * 10, 0, Math.sin(deimosAngle) * 10);

  // Render
  controls.update();
  renderer.render(scene, camera);
}
animate();
