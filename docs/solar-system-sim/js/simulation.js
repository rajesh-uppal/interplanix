// ✅ Interplanix Solar System Simulation v26
console.log("✅ SIMULATION v26 LOADED");

// 🌍 Initial camera position – zoomed out to view the whole system
const initialCameraPosition = new THREE.Vector3(0, 0, 180);

// 🎬 Create the 3D scene
const scene = new THREE.Scene();

// 🌌 Starfield cube background using 6 images
const loader = new THREE.CubeTextureLoader();
const starfield = loader.setPath('https://rajesh-uppal.github.io/interplanix/solar-system-sim/assets/starfield/')
  .load([
    'space_px.png', 'space_nx.png',
    'space_py.png', 'space_ny.png',
    'space_pz.png', 'space_nz.png'
  ]);
scene.background = starfield;

// 🎥 Set up the camera with a perspective view
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.copy(initialCameraPosition);

// 🖥️ WebGL Renderer – attaches to container div
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// 🌀 OrbitControls – allows rotating, panning, and zooming with mouse/touch
const controls = new OrbitControls(camera, renderer.domElement);


controls.target.set(0, 0, 0);      // Look at the Sun
controls.enableDamping = true;     // Smooth motion
controls.dampingFactor = 0.05;
controls.zoomSpeed = 0.5;
controls.rotateSpeed = 0.5;
controls.update();

// ☀️ Sun in the center of the solar system
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffe066 })
);
scene.add(sun);

// 📱 Check for mobile device to adjust UI scale
const isMobile = window.innerWidth < 600;

// 🪐 Planet data – distance, size, speed, etc.
const planetData = [
  { name: 'Mercury', color: 0xeeeeff, dist: 28, size: 3.0, speed: 0.04, orbit: 88, moons: 0 },
  { name: 'Venus',   color: 0xffaa00, dist: 36, size: 3.6, speed: 0.015, orbit: 225, moons: 0 },
  { name: 'Earth',   color: 0x00aaff, dist: 48, size: 4.2, speed: 0.01, orbit: 365, moons: 1 },
  { name: 'Mars',    color: 0xff3300, dist: 60, size: 3.6, speed: 0.008, orbit: 687, moons: 2 },
  { name: 'Jupiter', color: 0xffcc99, dist: 74, size: 3.2, speed: 0.002, orbit: 4333, moons: 95 },
  { name: 'Saturn',  color: 0xffffcc, dist: 88, size: 2.6, speed: 0.0015, orbit: 10759, moons: 145 },
  { name: 'Uranus',  color: 0x99ccff, dist: 102, size: 2.2, speed: 0.001, orbit: 30687, moons: 27 },
  { name: 'Neptune', color: 0x3366ff, dist: 116, size: 2.2, speed: 0.0009, orbit: 60190, moons: 14 }
];

const planets = [];  // Will store planet meshes and their labels
let timeDays = 0;    // Simulation day counter

// 🏷️ Create canvas-based label for each planet
function createLabel(text, size = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${isMobile ? 28 : 42}px Arial`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(size * 8, size * 2.5, 1);

  return sprite;
}

// 🪐 Add each planet and label to scene
planetData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData = { ...data };  // Save data for interaction

  const label = createLabel(data.name, data.size);

  scene.add(mesh);
  scene.add(label);

  planets.push({
    mesh,
    label,
    size: data.size,
    dist: data.dist,
    speed: data.speed,
    angle: Math.random() * Math.PI * 2 // Random starting position
  });
});

// 🕒 Clock display in top left
const clockDisplay = document.createElement('div');
clockDisplay.id = "clockDisplay";
clockDisplay.innerText = "🕒 0d";
document.body.appendChild(clockDisplay);

// ℹ️ Info box for displaying planet data
const infoBox = document.createElement('div');
infoBox.id = "infoBox";
document.body.appendChild(infoBox);

// 🔄 Reset View button
const resetViewBtn = document.createElement('button');
resetViewBtn.id = "resetViewBtn";
resetViewBtn.className = "ui-button";
resetViewBtn.textContent = "🔄 Reset View";
resetViewBtn.onclick = () => {
  camera.position.copy(initialCameraPosition);
  controls.target.set(0, 0, 0);
  controls.update();
};
document.body.appendChild(resetViewBtn);

// ♻️ Reset Simulation button
const resetSimBtn = document.createElement('button');
resetSimBtn.id = "resetSimBtn";
resetSimBtn.className = "ui-button";
resetSimBtn.textContent = "♻️ Reset Simulation";
resetSimBtn.onclick = () => {
  timeDays = 0;
  planets.forEach(p => p.angle = Math.random() * Math.PI * 2);
  infoBox.style.display = "none";
};
document.body.appendChild(resetSimBtn);

// 📱 Hide UI on small screens
if (isMobile) {
  resetViewBtn.style.display = "none";
  resetSimBtn.style.display = "none";
  infoBox.style.display = "none";
}

// 🖱️ Raycasting for clicking on planets
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));

  if (intersects.length > 0) {
    const data = intersects[0].object.userData;
    infoBox.innerHTML = `<strong>${data.name}</strong><br>
                         Distance from Sun: ${data.dist} AU<br>
                         Orbital Period: ${data.orbit} days<br>
                         Moons: ${data.moons}`;
    infoBox.style.display = "block";
  } else {
    infoBox.style.display = "none";
  }
});

// 🎞️ Animation loop – updates planet positions and renders scene
function animate() {
  requestAnimationFrame(animate);
  timeDays += 1;
  clockDisplay.innerText = `🕒 ${timeDays}d`;

  planets.forEach(p => {
    p.angle += p.speed;
    const x = Math.cos(p.angle) * p.dist;
    const z = Math.sin(p.angle) * p.dist;

    p.mesh.position.set(x, 0, z);
    p.label.position.set(x, p.size + 1, z);
    p.label.lookAt(camera.position);  // Face label toward camera
  });

  controls.update();  // Needed for smooth OrbitControls
  renderer.render(scene, camera);
}

animate();  // Start the simulation
