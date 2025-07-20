// ✅ Interplanix Solar System Simulation v24
console.log("✅ SIMULATION v24 LOADED");

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

let timeDays = 0;

// UI Elements: Clock, InfoBox, Reset Buttons
const clockDisplay = document.createElement('div');
clockDisplay.id = "clockDisplay";
clockDisplay.innerText = "🕒 0d";
document.body.appendChild(clockDisplay);

const infoBox = document.createElement('div');
infoBox.id = "infoBox";
document.body.appendChild(infoBox);

const resetViewBtn = document.createElement('button');
resetViewBtn.id = "resetViewBtn";
resetViewBtn.className = "ui-button";
resetViewBtn.textContent = "🔄 Reset View";
resetViewBtn.onclick = () => camera.position.set(0, 0, 60);
document.body.appendChild(resetViewBtn);

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

if (window.innerWidth < 600) {
  resetViewBtn.style.display = "none";
  resetSimBtn.style.display = "none";
  infoBox.style.display = "none";
}

// 🌞 Sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffe066 })
);
scene.add(sun);

// 📱 Device check
const isMobile = window.innerWidth <= 600;

// 🪐 Planet data
const planetData = [
  // 🌑 Mercury – size and contrast adjusted, distance slightly increased
  { name: 'Mercury', color: 0xeeeeff, dist: 28, size: 3.0, speed: 0.04, orbit: 88, moons: 0 },

  // 🌕 Venus
  { name: 'Venus', color: 0xffaa00, dist: 36, size: 3.6, speed: 0.015, orbit: 225, moons: 0 },

  // 🌍 Earth
  { name: 'Earth', color: 0x00aaff, dist: 48, size: 4.2, speed: 0.01, orbit: 365, moons: 1 },

  // 🔴 Mars
  { name: 'Mars', color: 0xff3300, dist: 60, size: 3.6, speed: 0.008, orbit: 687, moons: 2 },

  // 🟠 Jupiter – reduced distance slightly to fit frame
  { name: 'Jupiter', color: 0xffcc99, dist: 74, size: 3.2, speed: 0.002, orbit: 4333, moons: 95 },

  // 🟡 Saturn
  { name: 'Saturn', color: 0xffffcc, dist: 88, size: 2.6, speed: 0.0015, orbit: 10759, moons: 145 },

  // 🔵 Uranus
  { name: 'Uranus', color: 0x99ccff, dist: 102, size: 2.2, speed: 0.001, orbit: 30687, moons: 27 },

  // 🔵 Neptune
  { name: 'Neptune', color: 0x3366ff, dist: 116, size: 2.2, speed: 0.0009, orbit: 60190, moons: 14 }
];




let planets = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function createLabel(text, size = 1) {
  const fontSize = isMobile ? 32 : 48;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(size * 8, size * 2.5, 1);  // ⬆️ Bigger labels

  return sprite;
}

planetData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData = { ...data };

  const label = createLabel(data.name, data.size);
  scene.add(mesh);
  scene.add(label);

  planets.push({
    mesh,
    label,
    size: data.size,
    dist: data.dist,
    speed: data.speed,
    angle: Math.random() * Math.PI * 2
  });
});

camera.position.z = 180;


// 🌍 Animate the scene
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
    p.label.lookAt(camera.position);
  });

  renderer.render(scene, camera);
}
animate();

// 🖱️ Click handler
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