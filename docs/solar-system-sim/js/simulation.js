console.log("✅ simulation.js FINAL loaded");

const container = document.getElementById("container");
container.style.display = "flex";
container.style.justifyContent = "center";
container.style.alignItems = "center";
container.style.height = "100vh";
container.style.overflow = "hidden";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

let timeDays = 0;
const clockDisplay = document.createElement("div");
Object.assign(clockDisplay.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "rgba(255,255,255,0.12)",
  color: "white",
  padding: "8px 12px",
  borderRadius: "8px",
  fontSize: "16px",
  zIndex: 9999
});
document.body.appendChild(clockDisplay);

const infoBox = document.createElement("div");
Object.assign(infoBox.style, {
  position: "fixed",
  bottom: "70px",
  left: "20px",
  background: "rgba(0,0,0,0.85)",
  color: "white",
  padding: "10px",
  borderRadius: "8px",
  maxWidth: "240px",
  fontSize: "14px",
  display: "none",
  zIndex: 9999
});
document.body.appendChild(infoBox);

const resetBtn = document.createElement("button");
resetBtn.textContent = "🔄 Reset View";
Object.assign(resetBtn.style, {
  position: "fixed",
  bottom: "20px",
  left: "20px",
  background: "#444",
  color: "white",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  zIndex: 9999
});
resetBtn.onclick = () => {
  camera.position.set(0, 0, 35);
  camera.lookAt(0, 0, 0);
  console.log("🔄 Reset view triggered");
};
document.body.appendChild(resetBtn);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(sun);

const planetData = [
  { name: "Mercury", color: 0xaaaaaa, dist: 4, size: 0.40, speed: 0.040, orbit: 88, moons: 0 },
  { name: "Venus",   color: 0xffaa00, dist: 6, size: 0.60, speed: 0.015, orbit: 225, moons: 0 },
  { name: "Earth",   color: 0x00aaff, dist: 8, size: 0.70, speed: 0.010, orbit: 365, moons: 1 },
  { name: "Mars",    color: 0xff3300, dist: 10, size: 0.50, speed: 0.008, orbit: 687, moons: 2 },
  { name: "Jupiter", color: 0xffcc99, dist: 14, size: 1.80, speed: 0.002, orbit: 4333, moons: 95 },
  { name: "Saturn",  color: 0xffffcc, dist: 18, size: 1.40, speed: 0.0015, orbit: 10759, moons: 145 },
  { name: "Uranus",  color: 0x99ccff, dist: 22, size: 1.00, speed: 0.001, orbit: 30687, moons: 27 },
  { name: "Neptune", color: 0x3366ff, dist: 26, size: 1.00, speed: 0.0009, orbit: 60190, moons: 14 }
];

const planets = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function createLabel(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 48px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(text, 20, 80);
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
  sprite.scale.set(4, 1.2, 1);
  return sprite;
}

planetData.forEach(d => {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(d.size, 32, 32),
    new THREE.MeshBasicMaterial({ color: d.color })
  );
  mesh.position.x = d.dist;
  mesh.userData = d;

  const label = createLabel(d.name);
  label.position.set(d.dist, d.size + 0.8, 0);
  label.userData = d;

  scene.add(mesh);
  scene.add(label);
  planets.push({ mesh, label, angle: Math.random() * Math.PI * 2, speed: d.speed, dist: d.dist, size: d.size });
});

camera.position.z = 35;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  timeDays += 1;
  clockDisplay.textContent = `🕒 Sim Time: ${timeDays} Earth days`;

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

window.addEventListener("click", event => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(planets.flatMap(p => [p.mesh, p.label]));
  if (hits.length > 0) {
    const d = hits[0].object.userData;
    infoBox.innerHTML = `<strong>${d.name}</strong><br>
                         Distance from Sun: ${d.dist} AU<br>
                         Orbital Period: ${d.orbit} days<br>
                         Moons: ${d.moons}`;
    infoBox.style.display = "block";
    console.log("🪐 Clicked:", d.name);
  } else {
    infoBox.style.display = "none";
  }
});
