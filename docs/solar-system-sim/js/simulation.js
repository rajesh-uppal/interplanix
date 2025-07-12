
console.log("✅ simulation.js v4 loading...");

const container = document.getElementById('container');
container.style.display = 'flex';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';
container.style.height = '100vh';
container.style.overflow = 'hidden';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// 🌍 Clock
let timeDays = 0;
const clockDisplay = document.createElement('div');
clockDisplay.style.position = 'fixed';
clockDisplay.style.bottom = '20px';
clockDisplay.style.right = '20px';
clockDisplay.style.color = 'white';
clockDisplay.style.fontSize = '16px';
clockDisplay.style.background = 'rgba(255,255,255,0.1)';
clockDisplay.style.padding = '8px';
clockDisplay.style.borderRadius = '8px';
clockDisplay.style.zIndex = 9999;
clockDisplay.innerText = "🕒 Sim Time: 0 Earth days";
document.body.appendChild(clockDisplay);

// 🪐 Info Box
const infoBox = document.createElement('div');
infoBox.style.position = 'fixed';
infoBox.style.bottom = '70px';
infoBox.style.left = '20px';
infoBox.style.background = 'rgba(0,0,0,0.8)';
infoBox.style.color = 'white';
infoBox.style.padding = '10px';
infoBox.style.borderRadius = '8px';
infoBox.style.fontSize = '14px';
infoBox.style.maxWidth = '220px';
infoBox.style.display = 'none';
infoBox.style.zIndex = 9999;
document.body.appendChild(infoBox);

// 🔁 Reset View
const resetBtn = document.createElement('button');
resetBtn.textContent = "🔄 Reset View";
resetBtn.style.position = 'fixed';
resetBtn.style.bottom = '20px';
resetBtn.style.left = '20px';
resetBtn.style.padding = '10px 16px';
resetBtn.style.background = '#444';
resetBtn.style.color = 'white';
resetBtn.style.border = 'none';
resetBtn.style.borderRadius = '6px';
resetBtn.style.cursor = 'pointer';
resetBtn.style.zIndex = 9999;
resetBtn.onclick = () => camera.position.set(0, 0, 35);
document.body.appendChild(resetBtn);

// 🌞 Sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(sun);

// 🪐 Planets
const planetData = [
  { name: 'Mercury', color: 0xaaaaaa, dist: 4, size: 0.2, speed: 0.04, orbit: 88, moons: 0 },
  { name: 'Venus', color: 0xffaa00, dist: 6, size: 0.3, speed: 0.015, orbit: 225, moons: 0 },
  { name: 'Earth', color: 0x00aaff, dist: 8, size: 0.35, speed: 0.01, orbit: 365, moons: 1 },
  { name: 'Mars', color: 0xff3300, dist: 10, size: 0.25, speed: 0.008, orbit: 687, moons: 2 },
  { name: 'Jupiter', color: 0xffcc99, dist: 14, size: 0.9, speed: 0.002, orbit: 4333, moons: 95 },
  { name: 'Saturn', color: 0xffffcc, dist: 18, size: 0.7, speed: 0.0015, orbit: 10759, moons: 145 },
  { name: 'Uranus', color: 0x99ccff, dist: 22, size: 0.5, speed: 0.001, orbit: 30687, moons: 27 },
  { name: 'Neptune', color: 0x3366ff, dist: 26, size: 0.5, speed: 0.0009, orbit: 60190, moons: 14 }
];

const planets = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function createLabel(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(text, 20, 80);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(4, 1.2, 1);
  return sprite;
}

planetData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = data.dist;

  const label = createLabel(data.name);
  label.position.set(data.dist, data.size + 0.8, 0);

  mesh.userData = data;
  label.userData = data;

  scene.add(mesh);
  scene.add(label);

  planets.push({ mesh, label, angle: Math.random() * Math.PI * 2, speed: data.speed, dist: data.dist, size: data.size });
});

camera.position.z = 35;

function animate() {
  requestAnimationFrame(animate);
  timeDays += 1;
  clockDisplay.innerText = `🕒 Sim Time: ${timeDays} Earth days`;

  planets.forEach(p => {
    p.angle += p.speed;
    const x = Math.cos(p.angle) * p.dist;
    const z = Math.sin(p.angle) * p.dist;
    p.mesh.position.set(x, 0, z);
    p.label.position.set(x, p.size + 0.8, z);
    p.label.lookAt(camera.position);
  });

  renderer.render(scene, camera);
}
animate();

window.addEventListener('click', event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const targets = planets.map(p => p.mesh).concat(planets.map(p => p.label));
  const intersects = raycaster.intersectObjects(targets);
  if (intersects.length > 0) {
    const data = intersects[0].object.userData;
    if (data) {
      infoBox.innerHTML = `<strong>${data.name}</strong><br>Distance: ${data.dist} AU<br>Orbit: ${data.orbit} days<br>Moons: ${data.moons}`;
      infoBox.style.display = 'block';
    }
  } else {
    infoBox.style.display = 'none';
  }
});
