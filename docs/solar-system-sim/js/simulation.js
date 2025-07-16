
// Interplanix Solar System Simulation v24 - Bold labels with outline
console.log("✅ SIMULATION v24 LOADED");

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

let timeDays = 0;

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
resetViewBtn.onclick = () => camera.position.set(0, 0, 35);
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

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffe066 })
);
scene.add(sun);

const isMobile = window.innerWidth <= 600;

const planetData = [
  { name: 'Mercury', color: 0xaaaaaa, dist: 4, size: 0.4, speed: 0.04, orbit: 88, moons: 0 },
  { name: 'Venus', color: 0xffaa00, dist: 6, size: 0.6, speed: 0.015, orbit: 225, moons: 0 },
  { name: 'Earth', color: 0x00aaff, dist: 8, size: 0.7, speed: 0.01, orbit: 365, moons: 1 },
  { name: 'Mars', color: 0xff3300, dist: 10, size: 0.5, speed: 0.008, orbit: 687, moons: 2 },
  { name: 'Jupiter', color: 0xffcc99, dist: 14, size: 1.8, speed: 0.002, orbit: 4333, moons: 95 },
  { name: 'Saturn', color: 0xffffcc, dist: 18, size: 1.4, speed: 0.0015, orbit: 10759, moons: 145 },
  { name: 'Uranus', color: 0x99ccff, dist: 22, size: 1.0, speed: 0.001, orbit: 30687, moons: 27 },
  { name: 'Neptune', color: 0x3366ff, dist: 26, size: 1.0, speed: 0.0009, orbit: 60190, moons: 14 }
];

let planets = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function createLabel(text, size = 1) {
  const isMobile = window.innerWidth <= 600;
  const baseFontSize = isMobile ? 32 : 48;

  const minScale = isMobile ? 2.5 : 3.0;
  const maxScale = isMobile ? 4.5 : 6.5;
  const scale = Math.min(maxScale, Math.max(minScale, size * (isMobile ? 6 : 8)));

  const canvasWidth = text.length * baseFontSize * 0.6 + 40;
  const canvasHeight = baseFontSize + 40;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth * 2;
  canvas.height = canvasHeight * 2;

  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = `bold ${baseFontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'black';
  ctx.strokeText(text, canvasWidth / 2, canvasHeight / 2);

  ctx.fillStyle = 'white';
  ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale, scale * 0.4, 1);
  return sprite;
}

const sunLabel = createLabel("Sun", 4);
sunLabel.position.set(0, 5, 0);
sunLabel.userData = {
  name: "Sun",
  dist: 0,
  orbit: "N/A",
  moons: "N/A"
};
scene.add(sunLabel);

planetData.forEach(data => {
  const planetSize = isMobile ? data.size * 2 : data.size;
  const geometry = new THREE.SphereGeometry(planetSize, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = data.dist;
  mesh.userData = { ...data, size: planetSize };

  const label = createLabel(data.name, planetSize);
  label.position.set(data.dist, data.size + 0.8, 0);

  mesh.userData = data;
  label.userData = data;

  scene.add(mesh);
  scene.add(label);

  planets.push({
    mesh,
    size: planetSize,
    label,
    angle: Math.random() * Math.PI * 2,
    speed: data.speed,
    dist: data.dist,
    size: data.size
  });
});

camera.position.z = 40;

function animate() {
  requestAnimationFrame(animate);
  timeDays += 1;
  clockDisplay.innerText = `🕒 ${timeDays}d`;

  planets.forEach(p => {
    p.angle += p.speed;
    const x = Math.cos(p.angle) * p.dist;
    const z = Math.sin(p.angle) * p.dist;
    p.mesh.position.set(x, 0, z);
    p.label.position.set(x, p.size + 0.8, z);
    p.label.lookAt(camera.position);
  });

  sunLabel.lookAt(camera.position);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("click", event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(
    planets.map(p => p.mesh).concat(planets.map(p => p.label)).concat([sunLabel])
  );
  if (intersects.length > 0) {
    const data = intersects[0].object.userData;
    if (window.innerWidth > 600 && data && data.name) {
      infoBox.innerHTML = `<strong>${data.name}</strong><br>
                           Distance from Sun: ${data.dist} AU<br>
                           Orbital Period: ${data.orbit} days<br>
                           Moons: ${data.moons}`;
      infoBox.style.display = "block";
    }
  } else {
    infoBox.style.display = "none";
  }
});
